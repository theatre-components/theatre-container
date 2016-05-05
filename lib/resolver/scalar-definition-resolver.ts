import SupportableDefinitionResolverInterface from './supportable-definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';
import TYPES from './../definition/types';

/**
 * Resolve scalar definition.
 */
export default class ScalarDefinitionResolver implements SupportableDefinitionResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve<T>(definition: DefinitionInterface<T>, container: ContainerInterface): T
    {
        return definition.subject;
    }

    /**
     * {@inheritdoc}
     */
    supports<T>(definition: DefinitionInterface<T>): boolean
    {
        return definition.type === TYPES.Scalar;
    }
}
