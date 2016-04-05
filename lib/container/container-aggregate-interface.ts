import ContainerInterface from './container-interface';

/**
 * This kind of container can "embed" other containers under namespaces.
 * Namespaces are separated with ".". You can aggregate as
 * many container you wan't inside just one and namespace them as you
 * wish.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface ContainerAggregateInterface extends ContainerInterface
{
    /**
     * Aggregate with an other container. You must give a prefix in order
     * to retrieve member of the embeded containers. Prefix resolution
     * in `get`, `has` ... can be easily resolved with dots:
     *
     * ```
     * container.embed('some_other_container', container2);
     * container.get('some_other_container.member'); // retrieve a member of the embeded container.
     * ```
     */
    embed(container: ContainerInterface, prefix: string): ContainerAggregateInterface;

    /**
     * Try to retrieve a container with the given prefix.
     */
    getContainer(prefix: string): ContainerInterface;

    /**
     * Test if a container with the given prefix has been embeded.
     */
    hasContainer(prefix: string): boolean;
}

export default ContainerAggregateInterface;
