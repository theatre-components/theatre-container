import container from 'theatre/container';

describe('A theatre container main', () => {
    it('contains a default container implementation', () => {
        expect(container.has('foo')).toBe(false);
    });
});
