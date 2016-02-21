import Resolver from 'theatre/container/resolver/resolver';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import ContainerInterface from 'theatre/container/container/container-interface';
import ContainerError from 'theatre/container/error/container-error';
import Types from 'theatre/container/definition/types';

let resolver: Resolver;
let emptyResolver: Resolver;
let sDefinition: DefinitionInterface;
let pDefinition: DefinitionInterface;
let container: ContainerInterface;

class CharacterService
{
    constructor(
        public name: string
    ) {}
}

describe('A theatre container resolver Resolver', () => {
    beforeEach(() => {
        resolver = Resolver.create();
        emptyResolver = new Resolver();

        sDefinition = {
            subject: CharacterService,
            type: Types.Service,
            parameters: ['@name']
        };

        pDefinition = {
            subject: 'John Doe',
            type: Types.Parameter
        };

        container = {
            register: (name, def) => {
                return this;
            },
            get: (name) => {
                return 'foo';
            }
        };
    });

    it('throw exception if nothing can be resolved', () => {
        expect(() => {
            emptyResolver.resolve('foo', sDefinition, container);
        }).toThrowError(ContainerError, '[theatre/container] The definition "foo" can not be resolved. Maybe a typos in the definition Object ?');
    });

    it('can resolve parameter and services definitions', () => {
        spyOn(container, 'get').and.returnValue('John Doe');

        let service = resolver.resolve('foo', sDefinition, container);

        expect(service.name).toBe('John Doe');

        let p = resolver.resolve('bar', pDefinition, container);

        expect(p).toBe('John Doe');
    });

    it('can hook after and before', () => {
        let resolved = {};
        let after = (name, subject, container) => {
            resolved['after'] = true;

            return subject;
        };

        let before = (name, subject, container) => {
            resolved['before'] = true;

            return subject;
        };

        resolver.before(before);
        resolver.after(after);

        let p = resolver.resolve('foo', pDefinition, container);

        expect(resolved['after']).toBe(true);
        expect(resolved['before']).toBe(true);
    });
});
