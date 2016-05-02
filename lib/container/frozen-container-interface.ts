import ContainerInterface from './container-interface';

/**
 * Allow a container to froze and disalow service retrievement and registration.
 */
interface FrozenContainerInterface extends ContainerInterface
{
    /**
     * Froze a container.
     */
    froze(): void;
}

export default FrozenContainerInterface;
