import DefinitionInterface from './../definition/definition-interface';
import DefinitionCollectorInterface from './../definition/collector/definition-collector-interface';

/**
 * A container behavior wich register definitions, retrieve implemntations and
 * finally can « Fuzzy Find » definitions.
 */
interface ContainerInterface
{
    definitions: DefinitionCollectorInterface;

    /**
     * Register a definition in the container. Once a definition registered
     * you can easily retrieve it by using the `get` method.
     */
    register(definition: DefinitionInterface): ContainerInterface;

    /**
     * Retrieve a implementation of something defined before.
     */
    get(name: string): any;

    /**
     * Test if this member is present in the container.
     */
    has(name: string): boolean;
}

export default ContainerInterface;
