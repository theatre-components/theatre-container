import ResolverInterface from 'theatre/container/resolver/resolver-interface';

/**
 * Allow a resolver to support only some definition kind.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface SupportableResolverInterface extends ResolverInterface
{
    /**
     * Notify if this resolver can resolve a given definition.
     */
    supports(definition: DefinitionInterface): boolean;
}

export default SupportableResolverInterface;
