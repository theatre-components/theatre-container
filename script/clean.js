var fs = require('fs-extra');
var fs2 = require('fs');
var args = require('yargs')
    .demand(['path'])
    .argv
;

if (!fs2.existsSync(args.path)) {
    return;
}

console.log('Remove ' + args.path);

fs.removeSync(args.path);
