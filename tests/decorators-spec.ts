import container from 'lib/main';
import {service, tag, parameter} from 'lib/decorators';

@service('_some_basic_service')
class SomeBasicServiceClass
{
    get name(): string {
        return 'bar';
    }
}

@tag('foo', ['metadata'])
@parameter('_some_basic_service')
@service('_some_test')
class SomeTestClass
{
    constructor(
        private dependency: SomeBasicServiceClass
    ) {}

    get name(): string {
        return 'foo';
    }

    get resolvedServiceName(): string {
        return this.dependency.name;
    }
}

describe('A theatre container decorators', () => {
    it('It can decorate a class as a Service', () => {
        expect(container.get('_some_test').name).toBe('foo');
    });

    it('can tags a service with decorators', () => {
        expect(container.getDefinition('_some_test').tags).toContain('foo');
        expect(container.getDefinition('_some_test').metadata['foo']).toContain('metadata');
    });

    it('can inject dependencies', () => {
        expect(container.get('_some_test').resolvedServiceName).toBe('bar');
    });
});
