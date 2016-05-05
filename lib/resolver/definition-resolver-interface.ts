import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';

/**
 * Define how a specific resolver should behave.
 */
interface DefinitionResolverInterface
{
    /**
     * Resolve a given definition.
     */
    resolve<T>(definition: DefinitionInterface<T>, container: ContainerInterface): T;
}

export default DefinitionResolverInterface;
