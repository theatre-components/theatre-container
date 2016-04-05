System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "ts",
  typescriptOptions: {
    "module": "system",
    "noImplicitAny": true,
    "typeCheck": "strict",
    "tsconfig": true
  },
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*",
    "systemjs": "jspm_packahes/system.js",
    "ts": "github:frankwallis/plugin-typescript@3.0.2",
    "typescript": "npm:typescript@1.8.0"
  },

  packages: {
    "tests": {
      "defaultExtension": "ts"
    },
    "lib": {
      "defaultExtension": "ts"
    }
  },

  map: {
    "ts": "github:frankwallis/plugin-typescript@3.0.3",
    "ts-runtime": "npm:babel-runtime@5.8.35",
    "typescript": "npm:typescript@1.8.0",
    "github:frankwallis/plugin-typescript@3.0.3": {
      "typescript": "npm:typescript@1.9.0-dev.20160214"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
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
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:typescript@1.8.0": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
