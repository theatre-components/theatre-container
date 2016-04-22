import DefinitionInterface from './../definition/definition-interface';

/**
 * A container behavior wich register definitions, retrieve implemntations and
 * finally can « Fuzzy Find » definitions.
 */
interface ContainerInterface
{
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

    /**
     * Fuzzy find a definition by a list of metadata key.
     */
    findDefinitions(...metadataKeys: string[]): Array<DefinitionInterface>;
}

export default ContainerInterface;
