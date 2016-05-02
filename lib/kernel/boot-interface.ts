import ContainerInterface from './../container/container-interface';

/**
 * Allow you to boot a kernel.
 */
interface BootInterface
{
    /**
     * Boot a container with a simple function.
     */
    (container: ContainerInterface): void;
}

export default BootInterface;
