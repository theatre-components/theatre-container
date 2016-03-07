import DefinitionInterface from 'theatre/container/definition/definition-interface';
import ContainerInterface from 'theatre/container/container/container-interface';

/**
 * A resolver is used to resolve a given DefinitionInterface.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface ResolverInterface
{
    /**
     * Resolve a given definition, must return the resolved value.
     */
    resolve(name: string, definition: DefinitionInterface, container: ContainerInterface): any;
}

export default ResolverInterface;
