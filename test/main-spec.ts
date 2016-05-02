import * as main from './../lib/main';
import container from './../lib/container';
import kernel from './../lib/kernel';

describe('main', () => {
    it('contains the default container', () => {
        expect(main.container).toBe(container);
    });

    it('contains the default kernel', () => {
        expect(main.kernel).toBe(kernel);
    });
});
