import kernel from './../lib/kernel';
import Kernel from './../lib/kernel/kernel';

describe('kernel', () => {
    it('contains a default kernel implementation', () => {
        expect(kernel instanceof Kernel).toBe(true);
    });
});
