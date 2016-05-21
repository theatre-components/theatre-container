import application from './../lib/application';
import Kernel from './../lib/kernel/kernel';
import FrozenContainer from './../lib/container/frozen-container';

describe('application', () => {
    it('is a standard kernel', () => {
        expect(application instanceof Kernel).toBe(true);
        expect(application.container instanceof FrozenContainer).toBe(true);
    });
});
