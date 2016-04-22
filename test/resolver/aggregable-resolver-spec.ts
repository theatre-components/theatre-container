import AggregableResolver from './../../lib/resolver/aggregable-resolver';
import TYPES from './../../lib/definition/types';

describe('resolver/aggregable-resolver', () => {
    let container, definition;

    beforeEach(() => {
        container = {
            register: (definition) => { return this; },
            get: (name) => { return this; }
        };

        definition =  {
            name: 'foo',
            type: TYPES.Scalar,
            subject: 'foo'
        };
    });

    it('aggregate resolvers and launch the first supported', () => {
        let resolver = new AggregableResolver();

        let notSupportedResolver = {
            resolve: () => {},
            supports: () => false
        };
        let supportedResolver = {
            resolve: (definition, container) => { return 'resolved'; },
            supports: () => true
        };

        resolver.addResolver(notSupportedResolver);
        resolver.addResolver(supportedResolver);

        expect(resolver.resolve(definition, container)).toBe('resolved');
    });
});
