var path            = require('path');
var fs              = require('fs');
var fsExtra         = require('fs-extra');
var originalPackage = require('./../package.json');
var template        = JSON.stringify(require('./package.json'));
var mustache        = require('mustache');
var argv             = require('yargs')
    .demand(['outDir', 'packageName'])
    .alias('o', 'outDir')
    .alias('p', 'packageName')
    .argv
;


originalPackage.name = originalPackage.name.replace('-src', '-' + argv.packageName);

var packageJson = JSON.parse(mustache.render(template, {"package": originalPackage}));

fs.writeFileSync(path.join(argv.outDir, 'package.json'), JSON.stringify(packageJson, null, 2));

if (!originalPackage.files) {
    return;
}

for (var i in originalPackage.files) {
    fsExtra.copySync(originalPackage.files[i], path.join(argv.outDir, originalPackage.files[i]));
}

