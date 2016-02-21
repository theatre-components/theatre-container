import ServiceResolver from 'theatre/container/resolver/service-resolver';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import Types from 'theatre/container/definition/types';
import ContainerInterface from 'theatre/container/container/container-interface';

let resolver: ServiceResolver;
let container: ContainerInterface;
let definition1: DefinitionInterface;
let definition2: DefinitionInterface;

class MyService
{
    constructor(
        public p1,
        public p2,
        public p3
    ) {}

    sayHello(): string
    {
        return `Hello ${this.p1}`;
    }
}

describe('A theatre container resolver ServiceResolver', () => {
    beforeEach(() => {
        resolver = new ServiceResolver();

        definition1 = {
            subject: MyService,
            type: Types.Service,
            parameters: [
                '@name',
                'foo',
                'bar'
            ]
        };

        definition2 = {
            subject: 'Value',
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

    it('supports only service definition', () => {
        expect(resolver.supports(definition1)).toBe(true);
        expect(resolver.supports(definition2)).toBe(false);
    });

    it('resolve a service definition', () => {
        spyOn(container, 'get').and.returnValue('John Doe');

        let service = resolver.resolve('foo', definition1, container);

        expect(service.p1).toBe('John Doe');
        expect(service.p2).toBe('foo');
        expect(service.p3).toBe('bar');
        expect(service.sayHello()).toBe('Hello John Doe');
    });
});
