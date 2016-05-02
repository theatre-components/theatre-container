var fs = require('fs-extra');
var args = require('yargs')
    .demand(['path'])
    .argv
;

console.log('Remove ' + args.path);

fs.removeSync(args.path);
