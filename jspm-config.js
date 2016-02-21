System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "ts",
  typescriptOptions: {
    "module": "system",
    "noImplicitAny": true,
    "typeCheck": "strict"
  },
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*",
    "systemjs": "jspm_packahes/system.js",
    "ts": "github:frankwallis/plugin-typescript@3.0.2",
    "typescript": "npm:typescript@1.8.0"
  },

  packages: {
    "theatre/container/tests": {
      "defaultExtension": "ts"
    },
    "theatre/container": {
      "defaultExtension": "ts",
      "main": "main.ts"
    }
  },

  map: {
    "theatre/container": "lib",
    "theatre/container/tests": "tests",
    "karma-systemjs": "npm:karma-systemjs@0.11.0",
    "ts": "github:frankwallis/plugin-typescript@3.0.3",
    "ts-runtime": "npm:babel-runtime@5.8.35",
    "typescript": "npm:typescript@1.8.0",
    "github:frankwallis/plugin-typescript@3.0.3": {
      "typescript": "npm:typescript@1.9.0-dev.20160214"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:brace-expansion@1.1.3": {
      "balanced-match": "npm:balanced-match@0.3.0",
      "concat-map": "npm:concat-map@0.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:karma-systemjs@0.11.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "lodash": "npm:lodash@3.10.1",
      "minimatch": "npm:minimatch@3.0.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:minimatch@3.0.0": {
      "brace-expansion": "npm:brace-expansion@1.1.3",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
