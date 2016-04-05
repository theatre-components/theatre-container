import ContainerInterface from './../../container/container-interface';

/**
 * Listener for an after resolver hook.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface AfterListenerInterface
{
    (name: string, value: any, container: ContainerInterface): any;
}

export default AfterListenerInterface;
