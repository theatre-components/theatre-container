Theatre - Container
===================

[![Circle CI](https://circleci.com/gh/theatre-components/theatre-container/tree/master.svg?style=svg)](https://circleci.com/gh/theatre-components/theatre-container/tree/master)

A simple and extendable dependency injection component for the web.

## 1. Installation

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
    "exclude": {
        "node_modules",
        "jspm_packages"
    }
}
```

You can also install this component for nodejs:

```
npm install theatre-container-commonjs
```

## 2. Usage

This component is specialy designed for **[ECMA2015 Harmony Module](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import)**.
In this documentation we will use typescript
but **any ECMA2015 transpiler** should dwork like a charm!

### 2.1 The registration

In order to start using a Dependency Injection Container you need to register
stuffs inside. There is 3 types of registration:

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

// Declare a scalar in the container as `foo`
scalar('foo', NAME);
// The third arguments are dependencies. Use a `@` to reference a container member.
factory('hello', hello, ['@foo']);
// And finaly a service
service('test', Test, ['@hello']);
```

#### 2.1.1 - With decorators (services only)

```typescript
// lib/my-service.ts
import {service} from 'theatre-container/decorators';
import {Test} from './my-module';

@inject('@test')
@service('something')
export default class Something
{
    constructor(public test: Test) {}
}
```

### 2.2 - Using the kernel

Now we have some members inside the container we need to **`boot`** the application.

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

// Now we call the boot:
kernel.boot();
```
