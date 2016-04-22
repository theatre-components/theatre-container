import createDefaultResolver from './../../lib/resolver/factory';
import AggregableResolver from './../../lib/resolver/aggregable-resolver';

describe('resolver/factory', () => {
    it('creates a complete aggregable resolver', () => {
        let resolver = createDefaultResolver();

        expect(resolver instanceof AggregableResolver).toBe(true);
    });
});
