import DefinitionInterface from 'theatre/container/definition/definition-interface';

/**
 * Group a DefinitionInterface under a name.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default interface DefinitionCollectionInterface
{
    [index: string]: DefinitionInterface;
}
