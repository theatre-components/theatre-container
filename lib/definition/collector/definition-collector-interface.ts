import DefinitionInterface from './../definition-interface';

export interface LoopOnDefinitionInterface
{
    (definition: DefinitionInterface): void;
}

/**
 * Collect container definitions and allow you to search and modify
 * definitions.
 */
interface DefinitionCollectorInterface
{
    /**
     * Collect a new definition.
     */
    collect(definition: DefinitionInterface): DefinitionCollectorInterface;

    /**
     * Test if a definition exists.
     */
    exists(name: string): boolean;

    /**
     * Retriave a definition.
     */
    retrieve(name: string): DefinitionInterface;

    /**
     * Replace an existing definition.
     */
    replace(definition: DefinitionInterface): DefinitionCollectorInterface;

    /**
     * Loop on each definitions.
     */
    forEach(callback: LoopOnDefinitionInterface): DefinitionCollectorInterface;

    /**
     * Find a definition by metadata.
     */
    find(...metas: Array<string>): Array<DefinitionInterface>;
}

export default DefinitionCollectorInterface;
