import DefinitionInterface from './../definition-interface';

export interface LoopOnDefinitionInterface<T>
{
    (definition: DefinitionInterface<T>): void;
}

/**
 * Collect container definitions and allow you to search and modify
 * definitions.
 */
interface DefinitionCollectorInterface<T>
{
    /**
     * Collect a new definition.
     */
    collect(definition: DefinitionInterface<T>): DefinitionCollectorInterface<T>;

    /**
     * Test if a definition exists.
     */
    exists(name: string): boolean;

    /**
     * Retriave a definition.
     */
    retrieve(name: string): DefinitionInterface<T>;

    /**
     * Replace an existing definition.
     */
    replace(definition: DefinitionInterface<T>): DefinitionCollectorInterface<T>;

    /**
     * Loop on each definitions.
     */
    forEach(callback: LoopOnDefinitionInterface<T>): DefinitionCollectorInterface<T>;

    /**
     * Find a definition by metadata.
     */
    find(...metas: Array<string>): Array<DefinitionInterface<T>>;
}

export default DefinitionCollectorInterface;
