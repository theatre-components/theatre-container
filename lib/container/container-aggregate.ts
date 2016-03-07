import SimpleContainer from 'theatre/container/container/simple-container';
import ContainerInterface from 'theatre/container/container/container-interface';
import ContainerAggregateInterface from 'theatre/container/container/container-aggregate-interface';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import ContainerCollectionInterface from 'theatre/container/container/container-collection-interface';
import ContainerError from 'theatre/container/error/container-error';
import DefinitionCollectionInterface from 'theatre/container/definition/definition-collection-interface';

/**
 * A standard implementation for a container aggregation.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class ContainerAggregate implements ContainerAggregateInterface
{
    private wrappedContainer: ContainerInterface;

    private subContainers: ContainerCollectionInterface;

    constructor(container?: ContainerInterface)
    {
        this.wrappedContainer = container || new SimpleContainer();
        this.subContainers    = <ContainerCollectionInterface>{};
    }

    /**
     * {@inheritdoc}
     */
    register(name: string, definition: DefinitionInterface): ContainerAggregate
    {
        this.wrappedContainer.register(name, definition);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    get(name: string): any
    {
        if (-1 === name.indexOf('.')) {
            return this.wrappedContainer.get(name);
        }

        let splittedName = name.split('.');
        let prefix = splittedName.shift();

        return this.getContainer(prefix).get(splittedName.join('.'));
    }

    /**
     * {@inheritdoc}
     */
    has(name: string): boolean
    {
        if (-1 === name.indexOf('.')) {
            return this.wrappedContainer.has(name);
        }

        let splittedName = name.split('.');
        let prefix = splittedName.shift();

        return this.getContainer(prefix).has(splittedName.join('.'));
    }

    /**
     * {@inheritdoc}
     */
    find(tag: string): DefinitionCollectionInterface
    {
        let collection = this.wrappedContainer.find(tag);

        for (let name in this.subContainers) {
            collection = this.recursivlyFind(tag, name, this.subContainers[name], collection);
        }

        return collection;
    }

    /**
     * {@inheritdoc}
     */
    embed(container: ContainerInterface, prefix: string): ContainerAggregate
    {
        if (undefined !== this.subContainers[prefix]) {
            throw new ContainerError(`An other container is already embeded under the name "${prefix}". Make sure that you are not embeded it twice.`);
        }

        this.subContainers[prefix] = container;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    getContainer(prefix: string): ContainerInterface
    {
        if (undefined === this.subContainers[prefix]) {
            throw new ContainerError(`No container has been embed under the "${name}". Are you sure to have embeded it before ?`);
        }

        return this.subContainers[prefix];
    }

    /**
     * {@inheritdoc}
     */
    getDefinition(name: string): DefinitionInterface
    {
        return this.wrappedContainer.getDefinition(name);
    }

    /**
     * @{inheritdoc}
     */
    hasDefinition(name: string): DefinitionInterface
    {
        return this.wrappedContainer.hasDefinition(name);
    }

    private recursivlyFind(
        tag: string,
        base: string,
        container: ContainerInterface,
        collection: DefinitionCollectionInterface
    ): DefinitionCollectionInterface
    {
        let collection2 = container.find(tag);

        for (let name in collection2) {
            collection[`${base}.${name}`] = collection2[name];
        }

        return collection;
    }
}
