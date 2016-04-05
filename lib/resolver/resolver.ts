import HookableResolverInterface from './hookable-resolver-interface';
import ContainerInterface from './../container/container-interface';
import DefinitionInterface from './../definition/definition-interface';
import BeforeListenerInterface from './listener/before-listener-interface';
import AfterListenerInterface from './listener/after-listener-interface';
import SupportableResolverInterface from './supportable-resolver-interface';
import ContainerError from './../error/container-error';
import ParameterResolver from './parameter-resolver';
import ServiceResolver from './service-resolver';

/**
 * Resolve any kind of definition. You can hook resolve process thanks to
 * the HookableResolverInterface.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class Resolver implements HookableResolverInterface
{
    private befores: BeforeListenerInterface[];

    private afters: AfterListenerInterface[];

    private resolvers: SupportableResolverInterface[];

    constructor()
    {
        this.befores   = <Array<BeforeListenerInterface>>[];
        this.afters    = <Array<AfterListenerInterface>>[];
        this.resolvers = <Array<SupportableResolverInterface>>[];
    }

    /**
     * Static constructor. Create a new pre-configured resolver.
     */
    static create(): Resolver
    {
        let instance = new Resolver();

        return instance
            .addResolver(new ParameterResolver())
            .addResolver(new ServiceResolver())
        ;
    }

    /**
     * {@inheritdoc}
     */
    resolve(name: string, definition: DefinitionInterface, container: ContainerInterface): any
    {
        let resolved = null;

        for (let before of this.befores) {
            definition = before(name, definition, container);
        }

        for (let resolver of this.resolvers) {
            if (!resolver.supports(definition)) {
                continue;
            }

            resolved = resolver.resolve(name, definition, container);
        }

        if (null === resolved) {
            throw new ContainerError(`The definition "${name}" can not be resolved. Maybe a typos in the definition Object ?`);
        }

        for (let after of this.afters) {
            resolved = after(name, definition, container);
        }

        return resolved;
    }

    /**
     * {@inheritdoc}
     */
    after(listener: AfterListenerInterface): Resolver
    {
        this.afters.push(listener);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    before(listener: BeforeListenerInterface): Resolver
    {
        this.befores.push(listener);

        return this;
    }

    /**
     * Add a given resolver
     */
    addResolver(resolver: SupportableResolverInterface): Resolver
    {
        this.resolvers.push(resolver);

        return this;
    }
}
