import ContainerInterface from 'theatre/container/container/container-interface';

/**
 * Contains one a plural container under a name.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default interface ContainerCollectionInterface
{
    [index: string]: ContainerInterface;
}
