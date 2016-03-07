import Types from 'theatre/container/definition/types';
import MetadataInterface from 'theatre/container/definition/metadata-interface';

/**
 * This is how to define a container member.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface DefinitionInterface
{
    /**
     * A subject can be a simple scalar or a service constructor.
     */
    subject: any;

    /**
     * Determine wich kind of member this definition should be.
     */
    type: Types;

    /**
     * Determine what to inject to the constructor. Available only for services
     * definition.
     *
     * **NOTE**: If you want to inject a reference to a container member
     * you have to use the '@' character before the name.
     *
     * ```
     * // The first and second parameters will be injected as is.
     * // The third will be resolved before inject.
     * let parameters = ['A raw string', 12, '@an_other_service'];
     * ```
     */
    parameters?: string[];

    /**
     * Allow the definition to contains some fuzzy tags. Usefull for
     * compilation pass and more.
     */
    tags?: string[];

    /**
     * You can add as many things you want inside this field. Can be usefull
     * for configuring tags.
     */
    metadata?: MetadataInterface<T>;
}

export default DefinitionInterface;
