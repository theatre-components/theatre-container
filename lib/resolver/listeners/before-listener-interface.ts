import DefinitionInterface from './../../definition/definition-interface';
import ContainerInterface from './../../container/container-interface';

/**
 * This is a before hook lisener function.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface BeforeListenerInterface
{
    (name: string, definition: DefinitionInterface, container: ContainerInterface): DefinitionInterface;
}

export default BeforeListenerInterface;
