import container from './../lib/container';
import * as register from './../lib/register';

class TestService
{
    constructor(public sentence: string) {}
}

describe('register', () => {
    it('can register a scalar', () => {
        register.scalar<string>('test', 'foo ?');

        expect(container.get<string>('test')).toBe('foo ?');
    });

    it('can register a factory', () => {
        let f = (x) => { return `Hello ${x}`; };

        register.factory<Function>('bar', f, ['@test']);

        expect(container.get<string>('bar')).toBe('Hello foo ?');
    });

    it('can register a service', () => {
        register.service('baz', TestService, ['@bar']);

        expect(container.get<TestService>('baz').sentence).toBe('Hello foo ?');
    });
});
