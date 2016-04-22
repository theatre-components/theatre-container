import Container from './../../lib/container/container';
import TYPES from './../../lib/definition/types';
import CompilationPassInterface from './../../lib/compilation/compilation-pass-interface';

class SimpleHello
{
    constructor(private sentence) {}

    sayHello(): string
    {
        return this.sentence;
    }
}

let beforeCompilation, afterCompilation = false;

class CustomCompilerPass implements CompilationPassInterface
{
    beforeCompilation(definition, container)
    {
        beforeCompilation = true;
    }

    afterCompilation(subject, container)
    {
        afterCompilation = true;
    }
}

describe('container/container', () => {
    let container, definition1, definition2, definition3;

    beforeEach(() => {
        container = new Container();
        definition1 = {
            name: 'hello',
            type: TYPES.Factory,
            subject: (foo) => { return `Hello ${foo}`; },
            inject: ['@foo'],
            metadata: {
                "a": true
            }
        };
        definition2 = {
            name: 'foo',
            type: TYPES.Scalar,
            subject: 'foo',
            metadata: {
                "b": true
            }
        };
        definition3 = {
            name: 'bar',
            type: TYPES.Service,
            subject: SimpleHello,
            inject: ['@hello'],
            metadata: {
                "a": true,
                "b": true
            },
            compilationPass: [new CustomCompilerPass()]
        };

        container
            .register(definition1)
            .register(definition2)
            .register(definition3)
        ;
    });

    it('can retrieve any registered services', () => {
        expect(container.get('foo')).toBe('foo');
        expect(container.get('hello')).toBe('Hello foo');
        expect(container.get('bar').sayHello()).toBe('Hello foo');
    });

    it('can test for a service definition existence', () => {
        expect(container.has('hello')).toBe(true);
        expect(container.has('baz')).toBe(false);
    });

    it('can retrieve definitions by metadata', () => {
        let definitions = container.findDefinitions('a');

        expect(definitions[0]).toBe(definition1);
        expect(definitions[1]).toBe(definition3);

        definitions = container.findDefinitions('b');

        expect(definitions[0]).toBe(definition2);
        expect(definitions[1]).toBe(definition3);

        definitions = container.findDefinitions('a', 'b');

        expect(definitions.length).toBe(3);
    });

    it('executes compiler pass', () => {
        let service = container.get('bar');

        expect(beforeCompilation).toBe(true);
        expect(afterCompilation).toBe(true);
    });
});
