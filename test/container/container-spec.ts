import Container from './../../lib/container/container';
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

class CustomCompilerPass<T> implements CompilationPassInterface<T>
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
            type: 'factory',
            subject: (foo) => { return `Hello ${foo}`; },
            inject: ['@foo'],
            metadata: {
                "a": true
            }
        };
        definition2 = {
            name: 'foo',
            type: 'scalar',
            subject: 'foo',
            metadata: {
                "b": true
            }
        };
        definition3 = {
            name: 'bar',
            type: 'service',
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

    it('executes compiler pass', () => {
        let service = container.get('bar');

        expect(beforeCompilation).toBe(true);
        expect(afterCompilation).toBe(true);
    });

    it('can embed a second container', () => {
        let container2 = new Container();
        container2.register({
            name: 'baz',
            type: 'scalar',
            subject: 'baz'
        });
        container2.register({
            name: 'foo',
            type: 'scalar',
            subject: 'foo2'
        });

        container.embed(container2);

        expect(container.get('baz')).toBe('baz');
        expect(container.get('foo')).toBe('foo2');
    });
});
