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
    resolve(definition: DefinitionInterface, container: ContainerInterface): any;
}

export default DefinitionResolverInterface;
