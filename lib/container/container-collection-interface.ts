import ContainerInterface from './container-interface';

/**
 * Contains one a plural container under a name.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
interface ContainerCollectionInterface
{
    [index: string]: ContainerInterface;
}

export default ContainerCollectionInterface;
