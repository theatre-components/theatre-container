import Kernel from './../../lib/kernel/kernel';
import CompilationError from './../../lib/error/compilation-error';
import RegistrationError from './../../lib/error/registration-error';
import Container from './../../lib/container/container';
import FrozenContainer from './../../lib/container/frozen-container';
import TYPES from './../../lib/definition/types';

describe('kernel/kernel', () => {
    let kernel, container;

    beforeEach(() => {
        container = new FrozenContainer(new Container());
        kernel = new Kernel(container);
    });

    it('can boot a container', () => {
        let boot = false;

        kernel.register((container2) => {
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
                type: TYPES.Scalar,
                subject: 'bar'
            });
        }).toThrowError(RegistrationError);
    });
});
