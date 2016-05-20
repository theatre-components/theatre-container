import ServiceDefinitionResolver from './../../lib/resolver/service-definition-resolver';

class Test
{
    constructor(private a, private b, private c) {}

    getInjections(): string
    {
        return  `${this.a} ${this.b} ${this.c}`;
    }
}

describe('resolver/service-definition-resolver', () => {
    let container, definition, badDefinition, resolver;

    beforeEach(() => {
        container = {
            register: (definition) => { return this; },
            get: (name) => { return 'dependency'; }
        };
        definition = {
            name: 'good_service',
            type: 'service',
            subject: Test,
            inject: [12, 'test', '@foo']
        };
        badDefinition = {
            name: 'bad',
            type: 'scalar',
            subject: 'foo'
        };
        resolver = new ServiceDefinitionResolver();
    });

    it('only supports service definition', () => {
        expect(resolver.supports(badDefinition)).toBe(false);
        expect(resolver.supports(definition)).toBe(true);
    });

    it('resolve service definition into correct instance', () => {
        let instance = resolver.resolve(definition, container);

        expect(instance instanceof Test).toBe(true);
        expect(instance.getInjections()).toBe('12 test dependency');
    });
});
