/**
 * Collect metadatas for a given tag name.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default interface MetadataInterface<T>
{
    [index: string]: T;
}
