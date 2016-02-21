import ContainerInterface from 'theatre/container/container/container-interface';

/**
 * Listener for an after resolver hook.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default interface AfterListenerInterface
{
    (name: string, value: any, container: ContainerInterface): any;
}
