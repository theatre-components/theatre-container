import Kernel from './../../lib/kernel/kernel';
import CompilationError from './../../lib/error/compilation-error';
import RegistrationError from './../../lib/error/registration-error';
import Container from './../../lib/container/container';
import FrozenContainer from './../../lib/container/frozen-container';
import Annotation from './../../lib/annotation/annotation';

describe('kernel/kernel', () => {
    let kernel, container;

    beforeEach(() => {
        container = new FrozenContainer(new Container());
        kernel = new Kernel(container);
    });

    it('can boot a container', () => {
        let boot = false;

        kernel.initialize((container2) => {
            expect(container2).toBe(container);

            boot = true;
        })

        kernel.boot();

        expect(boot).toBe(true);
    });

    it('can\'t boot a container twice', () => {
        kernel.boot();

        expect(() => {
            kernel.boot(container);
        }).toThrowError(CompilationError);
    });

    it('can froze a container', () => {
        kernel.boot();

        expect(() => {
            container.register({
                name: 'foo',
                type: 'scalar',
                subject: 'bar'
            });
        }).toThrowError(RegistrationError);
    });

    it('can embed an other kernel', () => {
        let container2 = new Container();
        container2.register({
            name: 'foo',
            type: 'scalar',
            subject: 'foo-new'
        });
        let kernel2 = new Kernel(container2);

        kernel.embed(kernel2);

        expect(kernel.container.get('foo')).toBe('foo-new');
    });

    it('can registers definitions as raw json object', () => {
        kernel.registers({
            "foo": {
                "type": "scalar",
                "subject": "foo2"
            },
            "bar": {
                "type": "factory",
                "subject": (foo: string): string => {
                    return `Hello ${foo}`;
                },
                "inject": ["@foo"]
            }
        });

        expect(kernel.container.get('foo')).toBe('foo2');
        expect(kernel.container.get('bar')).toBe('Hello foo2');
    });

    it('contains annotations', () => {
        expect(kernel.annotations instanceof Annotation).toBe(true);
    });
});
