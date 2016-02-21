import SimpleContainer from 'theatre/container/container/simple-container';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import Types from 'theatre/container/definition/types';
import ContainerError from 'theatre/container/error/container-error';
import Resolver from 'theatre/container/resolver/resolver';

let container: SimpleContainer;
let definition: DefinitionInterface;
let definition2: DefinitionInterface;
let definition3: DefinitionInterface;

describe('A theatre container container SimpleContainer', () => {
    beforeEach(() => {
        container = new SimpleContainer();

        definition = {
            subject: 'foo',
            type: Types.Parameter,
            tags: ['foo']
        };

        definition2 = {
            subject: 'bar',
            type: Types.Parameter,
            tags: ['bar', 'foo']
        };

        definition3 = {
            subject: 'baz',
            type: Types.Parameter
        };
    });

    it('can register and retrieve definitions', () => {
        container.register('some_parameter', definition);

        expect(container.get('some_parameter')).toBe('foo');
    });

    it('can\'t register the same definition twice', () => {
        container.register('some_parameter', definition);

        expect(() => {
            container.register('some_parameter', definition);
        }).toThrowError(ContainerError, '[theatre/container] A definition is already registered under the name "some_parameter". You can\'t register the same definition twice.');
    });

    it('can\'t resolved an undefined member', () => {
        expect(() => {
            container.get('undefined');
        }).toThrowError(ContainerError, '[theatre/container] Unable to find a member named "undefined" into the container. Maybe a typo in the name ? You forget to register it ?')
    });

    it('contains a resolver', () => {
        expect(container.resolver instanceof Resolver).toBe(true);
    });

    it('can detect existing member or not', () => {
        container.register('some_parameter', definition);
        expect(container.has('undefined')).toBe(false);
        expect(container.has('some_parameter')).toBe(true);
    });

    it('can find definitions by tags', () => {
        container.register('a', definition);
        container.register('b', definition2);
        container.register('c', definition3);

        let collection = container.find('foo');

        expect(collection['a']).toBe(definition);
        expect(collection['b']).toBe(definition2);
        expect(collection['c']).not.toBeDefined();

        let c2 = container.find('bar');

        expect(c2['b']).toBe(definition2);
        expect(c2['a']).not.toBeDefined();
        expect(c2['c']).not.toBeDefined();
    });
});
