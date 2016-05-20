import UnamedDefinitionInterface from './unamed-definition-interface';

/**
 * This definition is used by the container to register member.
 */
interface DefinitionInterface<T> extends UnamedDefinitionInterface<T>
{
    /**
     * Used as an identifier inside the container.
     *
     * @see "./../container/container-interface.ts#get"
     */
    name: string;
}

export default DefinitionInterface;
