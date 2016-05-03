import FrozenContainerInterface from './frozen-container-interface';
import ContainerInterface from './container-interface';
import DefinitionInterface from './../definition/definition-interface';
import RegistrationError from './../error/registration-error';
import DefinitionCollectorInterface from './../definition/collector/definition-collector-interface';

/**
 * Wrap an existing container and allow it to be frozed.
 */
export default class FrozenContainer implements FrozenContainerInterface
{
    private frozen: boolean;

    constructor(private container: ContainerInterface)
    {
        this.frozen = false;
    }

    /**
     * {@inheritdoc}
     */
    register(definition: DefinitionInterface): ContainerInterface
    {
        if (true === this.frozen) {
            throw new RegistrationError('You can\'t register new definition in a frozen container');
        }

        this.container.register(definition);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    get<T>(name: string): T
    {
        if (true === this.frozen) {
            throw new RegistrationError('You can\'t retrieve a member in a frozen container');
        }

        return this.container.get<T>(name);
    }

    /**
     * {@inheritdoc}
     */
    has(name: string): boolean
    {
        return this.container.has(name);
    }

    /**
     * {@inheritdoc}
     */
    froze(): void
    {
        this.frozen = true;
    }

    get definitions(): DefinitionCollectorInterface
    {
        return this.container.definitions;
    }
}
