import ContainerInterface from './../container/container-interface';
import BootInterface from './boot-interface';
import ChainedDefinitionInterface from './../definition/chained-definition-interface';

/**
 * A kernel is a simple container boot. It allows you to launch initial
 * container member as you wish.
 */
interface KernelInterface
{
    container: ContainerInterface;

    /**
     * Register a new boot.
     */
    initialize(boot: BootInterface): KernelInterface;

    /**
     * Boot a container
     */
    boot(): void;

    /**
     * Embed an other kernel inside.
     */
    embed(kernel: KernelInterface): KernelInterface;

    /**
     * Register definitions as a simple JSON object.
     */
    registers<T>(definitions: ChainedDefinitionInterface<T>): KernelInterface;
}

export default KernelInterface;
