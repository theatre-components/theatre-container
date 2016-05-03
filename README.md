Theatre - Container
===================

[![Circle CI](https://circleci.com/gh/theatre-components/theatre-container/tree/master.svg?style=shield)](https://circleci.com/gh/theatre-components/theatre-container/tree/master)
[![npm version](https://badge.fury.io/js/theatre-container.svg)](https://badge.fury.io/js/theatre-container)
[![dependencies](https://david-dm.org/theatre-components/theatre-container.svg)](https://david-dm.org/theatre-components/theatre-container)
[![Gitter chat](https://badges.gitter.im/theatre-components/theatre.png)](https://gitter.im/theatre-components/theatre)

A simple and extendable dependency injection component for the web.

## 1 - Installation

With npm & systemjs:

```
npm install theatre-container
jspm install npm:theatre-container
```

You must have the following config for typescript:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    },
    "exclude": [
        "node_modules",
        "jspm_packages"
    ]
}
```

You can also install this component for nodejs:

```
npm install theatre-container-commonjs
```

## 2 - Usage

This component is specialy designed for **[ECMA2015 Harmony Module](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import)**.
In this documentation we will use typescript
but **any ECMA2015 transpiler** should work like a charm!

### 2.1 - The registration

In order to start using a Dependency Injection Container you need to register
members inside. There is 3 types of member:

- `scalar` it's just raw variables that you can inject later.
- `factory` a function that will be resolved by the container. The result of the function will be injected.
- `service` a valid constructor. The container will inject the resolved instance.

#### 2.1.1 - With functions

```typescript
// lib/my-module.ts
import {scalar, factory, service} from 'theatre-container/register';

export const NAME: string = 'djeg';

export function hello(name: string): string {
    return `Hello ${name}!`;
};

export class Test
{
    constructor(public sentence: string) {}
}

// Now you can declare those members in the container:
scalar('foo', NAME); // Declare a scalar in the container as `foo`
factory('hello', hello, ['@foo']); // The third arguments are dependencies. Use a `@` to reference a container member.
service('test', Test, ['@hello']); // And finaly a service
```

#### 2.1.1 - With decorators (services only)

```typescript
// lib/my-service.ts
import {service, inject} from 'theatre-container/decorators';
import {Test} from './my-module';

@inject('@test')
@service('something')
export default class Something
{
    constructor(public test: Test) {}
}
```

### 2.2 - Using the kernel

Now we have some members inside the container we need to **`boot`** the application in order to start
using those members.

```typescript
// lib/main.ts
import {kernel} from 'theatre-container';
import Something from './my-service';

// Add a new boot function to the kernel:
kernel.register((container) => {
    let something = container.get<Something>('something');

    // this will print "Hello djeg!"
    console.log(something.test.sentence);
});

// Launch all the registered boot function in the kernel.
kernel.boot();
```

## 3 - Go further

This component expose some advanced practice for your container members:

- [Metadata and compiler pass](doc/metadata-compiler-pass.md)
- [Good practices about container and naming](doc/good-practice.md)
- [Some examples](examples)
- [Contributions](doc/contributions.md)
