import ParameterResolver from 'theatre/container/resolver/parameter-resolver';
import ContainerInterface from 'theatre/container/container/container-interface';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import Types from 'theatre/container/definition/types';

let resolver: ParameterResolver;
let container: ContainerInterface;
let definition1: DefinitionInterface;
let definition2: DefinitionInterface;
let definition3: DefinitionInterface;

describe('A theatre container resolver ParameterResolver', () => {
    beforeEach(() => {
        resolver = new ParameterResolver();
        container = {
            register: (name, def) => {
                return container;
            },
            get: (name) => {
                return 'foo';
            }
        };
        definition1 = {
            subject: 'Some value',
            type: Types.Parameter
        };
        definition2 = {
            subject: () => { return 'foo' },
            type: Types.Service
        };
        definition3 = {
            subject: {
                "foo": ["bar", "@param"],
                "@param": "baz"
            },
            type: Types.Parameter
        };
    });

    it('supports only parameter defintion', () => {
        expect(resolver.supports(definition1)).toBe(true);
        expect(resolver.supports(definition2)).toBe(false);
    });

    it('can resolve a parameter definition', () => {
        expect(resolver.resolve('foo', definition1, container)).toBe('Some value');
    });

    it('can resolve parameters recursivly', () => {
        spyOn(container, 'get').and.returnValue('resolved');

        let resolved = resolver.resolve('foo', definition3, container);

        expect(resolved.foo).toContain("bar");
        expect(resolved.foo).toContain("resolved");
        expect(resolved['resolved']).toBe('baz');
    });
});
