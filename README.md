Theatre - Container
===================

[![Circle CI](https://circleci.com/gh/theatre-components/theatre-container/tree/master.svg?style=shield)](https://circleci.com/gh/theatre-components/theatre-container/tree/master)
[![npm version](https://badge.fury.io/js/theatre-container.svg)](https://badge.fury.io/js/theatre-container)
[![dependencies](https://david-dm.org/theatre-components/theatre-container.svg)](https://david-dm.org/theatre-components/theatre-container)
[![Gitter chat](https://badges.gitter.im/theatre-components/theatre.png)](https://gitter.im/theatre-components/theatre)

A simple and extendable dependency injection component for the web.

## 1 - Installation

```
npm install theatre-container --save
```

This will install theatre-container as a **commonjs** module. You can use it
directly with nodejs and browserify.

This library is also available for systemjs:

```
npm install theatre-container-systemjs --save
jspm install npm:theatre-container-systemjs
```

For typescript be sure to have a `tsconfig.json` like this:

```javascript
{
    "compilerOptions": {
        "module": "commonjs", // You can change it for system if you are using systemjs
        "target": "es5",
        "noImplicitAny": false,
        "outDir": "dist/dev",
        "rootDir": ".",
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "moduleResolution": "node"
    },
    "exclude": [
        "node_modules",
        "jspm_packages",
        "typings/browser",
        "typings/browser.d.ts"
    ]
}

```

## 2 - Quick start

This component is specialy designed for **[ECMA2015 Harmony Module](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import)**.
In this documentation we will use typescript
but **any ECMA2015 transpiler** should work like a charm!


Let's take an exemple:

```typescript
// lib/character.ts
export default class Character
{
    private level: number;

    private maxLife: number;

    private hp: number;

    private attack: number;

    constructor(private _name: string)
    {
        this.level = 1;
        this.maxLife = 5 * this.level;
        this.hp = this.maxLife;
        this.attack = 1 * this.level;
    }

    attack(character: Character): void
    {
        character.endure(this.damage);
    }

    endure(damage: number): void
    {
        this.hp -= number;
    }

    get lifePoint(): number {
        return this.pv;
    }

    get damage(): number {
        return this.attack;
    }

    get isDead(): boolean {
        return 0 <= this.hp;
    }

    get name(): string {
        return this._name;
    }

    get currentLevel(): number {
        return this.level;
    }
}
```

Now we have a standard character. Let's create some configuration in order
to register characters in the container.

```typescript
// lib/config/container.ts
import Character from './../character';

export {
    "hero_name": {
        // register a simple scalar in the container. This will return the value
        // has is.
        "type": "scalar",
        "value": "Gerald of Riv"
    },
    "gerald": {
        // Service are instance of classes (by using the `new` keyword).
        // The value here is the concerned class.
        "type": "service",
        "value": Character,
        // You can inject any values into a service constructor. But if you
        // want to call a previous registered value, use the `@` keyword:
        "inject": ['@hero_name']
    },
    "gerald_as_string": {
        // Factory are just values returned by a function witheout using the
        // `new` keyword.
        "type": "factory",
        "value": (hero: Character) => {
            return `${hero.name}: lvl ${hero.currentLevel}, ${hero.lifePoint}pv left, damage: ${hero.damage}.`
        },
        "inject": ["@gerald"]
    },
    // We have an hero, let's create a monster:
    "ghost": {
        "type": "service",
        "value": Character,
        "inject": ['Ghost']
    }
}
```

Finally we need to register and start our application:

```typescript
// lib/main.ts
import application from 'theatre-container';
import ContainerInterface from 'theatre-container/container/container-interface';
import Character from './character';
import * as definitions from './config/definitions';

application
    .register(definitions)
    .initialize((container: ContainerInterface) => {
        let gerald = container.get<Character>('gerald');
        let ghost = container.get<Character>('ghost');

        while (!ghost.isDead) {
            gerald.attack(ghost);

            console.log(`${gerald.name} has attacked ${ghost.name}!`);
        }

        console.log(`${ghost.name} is dead!`);
    })
    .boot()
;
```
