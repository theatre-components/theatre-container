import ContainerInterface from './../container/container-interface';
import BootInterface from './boot-interface';

/**
 * A kernel is a simple container boot. It allows you to launch initial
 * container member as you wish.
 */
interface KernelInterface
{
    /**
     * Register a new boot.
     */
    register(boot: BootInterface): KernelInterface;

    /**
     * Boot a container
     */
    boot(): void;
}

export default KernelInterface;
