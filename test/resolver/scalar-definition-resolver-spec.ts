import ScalarDefinitionResolver from './../../lib/resolver/scalar-definition-resolver';

describe('resolver/scalar-definition-resolver', () => {
    let definition, container, badDefinition, resolver;

    beforeEach(() => {
        definition = {
            name: 'foo',
            type: 'scalar',
            subject: 'foo'
        };
        container = {
            register: (definition) => { return this; },
            get: (name) => { return this; }
        };
        badDefinition = {
            name: 'foo',
            type: 'factory',
            subject: () => { return 2; }
        };
        resolver = new ScalarDefinitionResolver();
    });

    it('only supports scalar definition type', () => {
        expect(resolver.supports(definition)).toBe(true);
        expect(resolver.supports(badDefinition)).toBe(false);
    });

    it('resolve scalar definition', () => {
        expect(resolver.resolve(definition, container)).toBe('foo');
    });
});
