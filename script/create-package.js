var path            = require('path');
var fs              = require('fs');
var fsExtra         = require('fs-extra');
var originalPackage = require('./../package.json');
var template        = fs.readFileSync(path.join(__dirname, '.package.json'), 'utf-8');
var mustache        = require('mustache');
var argv            = require('yargs')
    .demand(['outDir', 'packageName'])
    .alias('o', 'outDir')
    .alias('p', 'packageName')
    .argv
;
var isDefault = argv.default ? true : false;

originalPackage.name = isDefault ?
    originalPackage.name.replace('-src', '') :
    originalPackage.name.replace('-src', '-' + argv.packageName)
;

for (var i in originalPackage) {
    if (typeof originalPackage[i] !== 'string') {
        originalPackage[i] = JSON.stringify(originalPackage[i], null, 2);
    }
}

var renderedTemplate = mustache.render(template, {"package": originalPackage});
var packageJson = JSON.parse(renderedTemplate);

fs.writeFileSync(path.join(argv.outDir, 'package.json'), JSON.stringify(packageJson, null, 2));

if (!originalPackage.files) {
    return;
}

var files = JSON.parse(originalPackage.files);
for (var i in files) {
    fsExtra.copySync(files[i], path.join(argv.outDir, files[i]));
}

