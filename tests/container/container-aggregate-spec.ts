import ContainerAggregate from 'theatre/container/container/container-aggregate';
import SimpleContainer from 'theatre/container/container/simple-container';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import Types from 'theatre/container/definition/types';

let container: ContainerAggregate;
let container2: SimpleContainer;
let otherContainer: ContainerAggregate;
let otherContainer2: SimpleContainer;
let definition1: DefinitionInterface;
let definition2: DefinitionInterface;

describe('A theatre container container ContainerAggregate', () => {
    beforeEach(() => {
        container  = new ContainerAggregate();
        container2 = new SimpleContainer();
        otherContainer = new ContainerAggregate();
        otherContainer2 = new SimpleContainer();

        definition1 = {
            subject: 'foo',
            type: Types.Parameter,
            tags: ['foo']
        };

        definition2 = {
            subject: 'bar',
            type: Types.Parameter,
            tags: ['foo']
        };

        container.register('foo', definition1);
        container2.register('bar', definition2);

        container.embed(container2, 'sub');

        otherContainer.register('foo', definition1);
        otherContainer2.register('bar', definition2);

        otherContainer.embed(otherContainer2, 'baz');

        container.embed(otherContainer, 'sub2');
    });

    it('can retrieve dependencies from him-self or embeded containers', () => {
        expect(container.get('foo')).toBe('foo');
        expect(container.get('sub.bar')).toBe('bar');
    });

    it('can detect members of himself or sub containers', () => {
        expect(container.has('foo')).toBe(true);
        expect(container.has('sub.bar')).toBe(true);
    });

    it('can find definition for him-self or sub constainers', () => {
        let collection = container.find('foo');

        expect(collection['foo']).toBeDefined();
        expect(collection['sub.bar']).toBeDefined();
        expect(collection['sub2.baz.bar']).toBeDefined();
    });
});

