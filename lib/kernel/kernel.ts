import KernelInterface from './kernel-interface';
import ContainerInterface from './../container/container-interface';
import CompilationError from './../error/compilation-error';
import BootInterface from './boot-interface';

/**
 * A default kernel implementation.
 */
export default class Kernel implements KernelInterface
{
    private boots: Array<BootInterface>;

    private booted: boolean;

    constructor(private container: ContainerInterface)
    {
        this.boots = [];
        this.booted = false;
    }

    /**
     * {@inheritdoc}
     */
    register(boot: BootInterface): KernelInterface
    {
        this.boots.push(boot);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    boot(): void
    {
        if (this.booted) {
            throw new CompilationError('You can\'t boot a kernel more than one.');
        }

        for (let boot of this.boots) {
            boot(this.container);
        }

        if (undefined !== this.container['froze']) {
            this.container['froze']();
        }

        this.booted = true;
    }
}
