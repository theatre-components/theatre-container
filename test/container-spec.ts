import container from './../lib/container';
import FrozenContainer from './../lib/container/frozen-container';

describe('container', () => {
    it('contains a default container', () => {
        expect(container instanceof FrozenContainer).toBe(true);
    });
});
