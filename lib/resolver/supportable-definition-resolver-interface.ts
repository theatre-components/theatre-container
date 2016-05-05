import DefinitionResolverInterface from './definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';

/**
 * Allow a resolver to only support some «Kind» of definitions.
 */
interface SupportableDefinitionResolverInterface extends DefinitionResolverInterface
{
    /**
     * Supports a given definition.
     */
    supports<T>(definition: DefinitionInterface<T>): boolean;
}

export default SupportableDefinitionResolverInterface;
