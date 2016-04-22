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
    resolve(definition: DefinitionInterface, container: ContainerInterface): any
    {
        return definition.subject;
    }

    /**
     * {@inheritdoc}
     */
    supports(definition: DefinitionInterface): boolean
    {
        return definition.type === TYPES.Scalar;
    }
}
