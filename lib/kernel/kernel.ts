import KernelInterface from './kernel-interface';
import ContainerInterface from './../container/container-interface';
import CompilationError from './../error/compilation-error';
import BootInterface from './boot-interface';
import ChainedDefinitionInterface from './../definition/chained-definition-interface';
import DefinitionInterface from './../definition/definition-interface';

/**
 * A default kernel implementation.
 */
export default class Kernel implements KernelInterface
{
    private boots: Array<BootInterface>;

    private booted: boolean;

    constructor(private storedContainer: ContainerInterface)
    {
        this.boots = [];
        this.booted = false;
    }

    /**
     * {@inheritdoc}
     */
    initialize(boot: BootInterface): KernelInterface
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
            boot(this.storedContainer);
        }

        if (undefined !== this.storedContainer['froze']) {
            this.storedContainer['froze']();
        }

        this.booted = true;
    }

    /**
     * {@inheritdoc}
     */
    embed(kernel: KernelInterface): KernelInterface
    {
        this.storedContainer.embed(kernel.container);

        return this;
    }

    /**
     * {@inheritDoc}
     */
    registers<T>(definitions: ChainedDefinitionInterface<T>): KernelInterface
    {
        for (let name in definitions) {
            let definition: DefinitionInterface<T> = {
                'name': name,
                'type': definitions[name].type,
                'subject': definitions[name].subject,
                'inject': definitions[name].inject,
                'metadata': definitions[name].metadata,
                'compilationPass': definitions[name].compilationPass
            };

            this.storedContainer.register<T>(definition);
        }

        return this;
    }

    get container(): ContainerInterface
    {
        return this.storedContainer;
    }
}
