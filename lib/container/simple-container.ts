import ContainerInterface from 'theatre/container/container/container-interface';
import DefinitionInterface from 'theatre/container/definition/definition-interface';
import DefinitionCollectionInterface from 'theatre/container/definition/definition-collection-interface';
import ContainerError from 'theatre/container/error/container-error';
import Resolver from 'theatre/container/resolver/resolver';

/**
 * This is the simplest implementation of a ContainerInterface.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class SimpleContainer implements ContainerInterface
{
    private definitions: DefinitionCollectionInterface;

    private resolved: Object;

    private _resolver: Resolver;

    constructor(resolver?: Resolver)
    {
        this.definitions = <DefinitionCollectionInterface>{};
        this.resolved    = {};
        this._resolver   = resolver || Resolver.create();
    }

    /**
     * {@inheritdoc}
     */
    register(name: string, definition: DefinitionInterface): SimpleContainer
    {
        if (-1 !== name.indexOf('.')) {
            throw new ContainerError('"${name}" contains a "." character. The "." is a reserved character for embeded container. Use ContainerAggregator instead of register a service with ".".');
        }

        if (this.definitions[name]) {
            throw new ContainerError(`A definition is already registered under the name "${name}". You can't register the same definition twice.`);
        }

        this.definitions[name] = definition;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    get(name: string): any
    {
        if (undefined !== this.resolved[name]) {
            return this.resolved[name];
        }

        if (undefined === this.definitions[name]) {
            throw new ContainerError(`Unable to find a member named "${name}" into the container. Maybe a typo in the name ? You forget to register it ?`);
        }

        this.resolved[name] = this.resolver.resolve(name, this.definitions[name], this);

        return this.resolved[name];
    }

    /**
     * {@inheritdoc}
     */
    has(name: string): boolean
    {
        return undefined !== this.definitions[name];
    }

    /**
     * {@inheritdoc}
     */
    find(tag: string): DefinitionCollectionInterface
    {
        let collection = <DefinitionCollectionInterface>{};

        for (let name in this.definitions) {
            if (!this.definitions[name].tags) {
                continue;
            }

            if (-1 === this.definitions[name].tags.indexOf(tag)) {
                continue;
            }

            collection[name] = this.definitions[name];
        }

        return collection;
    }

    /**
     * {@inheritdoc}
     */
    getDefinition(name: string): DefinitionInterface
    {
        if (undefined === this.definitions[name]) {
            throw new ContainerError(`The definition ${name} is not registered in the container. Maybe a typo ?`);
        }

        return this.definitions[name];
    }

    /**
     * {@inheritDoc}
     */
    hasDefinition(name: string): boolean
    {
        return undefined !== this.definitions[name];
    }

    get resolver(): Resolver
    {
        return this._resolver;
    }
}
