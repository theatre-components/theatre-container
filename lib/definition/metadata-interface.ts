/**
 * Collect metadatas for a given tag name.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface MetadataInterface<T>
{
    [index: string]: T;
}

export default MetadataInterface;
