import UnamedDefinitionInterface from './unamed-definition-interface';

/**
 * Defined a simple array wich will contains a raw json to load in a Kernel.
 */
interface ChainedDefinitionInterface<T>
{
    [key: string]: UnamedDefinitionInterface<T>;
}

export default ChainedDefinitionInterface;
