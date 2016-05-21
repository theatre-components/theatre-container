import FactoryDefinitionResolver from './../../lib/resolver/factory-definition-resolver';

describe('resolver/factory-definition-resolver', () => {
    let container, definition, badDefinition, resolver;

    beforeEach(() => {
        container = {
            register: (definition) => { return this; },
            get: (name) => { return 'dependency'; }
        };
        definition = {
            name: 'foo',
            type: 'factory',
            value: (a, b, c) => { return `Resolved ${a} ${b} ${c}`; },
            inject: [12, 'bar', '@bar']
        };
        badDefinition = {
            name: 'baz',
            type: 'scalar',
            value: 'Doe'
        };

        resolver = new FactoryDefinitionResolver();
    });

    it('resolve factory definition', () => {
        expect(resolver.resolve(definition, container)).toBe('Resolved 12 bar dependency');
    });

    it('supports only factory definition', () => {
        expect(resolver.supports(definition)).toBe(true);
        expect(resolver.supports(badDefinition)).toBe(false);
    });
});
