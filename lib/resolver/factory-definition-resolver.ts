import SupportableDefinitionResolverInterface from './supportable-definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';
import TYPES from './../definition/types';

/**
 * Resolve a factory definition.
 */
export default class FactoryDefinitionResolver implements SupportableDefinitionResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve(definition: DefinitionInterface, container: ContainerInterface): any
    {
        if (!definition.inject) {
            return definition.subject.apply({}, []);
        }

        let args = [];

        for (let injection of definition.inject) {
            if ('string' !== typeof injection || '@' !== injection.charAt(0)) {
                args.push(injection);

                continue;
            }

            args.push(container.get(injection.substr(1)));
        }

        return definition.subject.apply({}, args);
    }

    /**
     * {@inheritdoc}
     */
    supports(definition: DefinitionInterface): boolean
    {
        return definition.type === TYPES.Factory;
    }
}
