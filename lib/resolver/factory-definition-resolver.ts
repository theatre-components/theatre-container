import SupportableDefinitionResolverInterface from './supportable-definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';

/**
 * Resolve a factory definition.
 */
export default class FactoryDefinitionResolver implements SupportableDefinitionResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve<T extends Function>(definition: DefinitionInterface<T>, container: ContainerInterface): T
    {
        if (!definition.inject) {
            return definition.value.apply({}, []);
        }

        let args = [];

        for (let injection of definition.inject) {
            if ('string' !== typeof injection || '@' !== injection.charAt(0)) {
                args.push(injection);

                continue;
            }

            args.push(container.get(injection.substr(1)));
        }

        return definition.value.apply({}, args);
    }

    /**
     * {@inheritdoc}
     */
    supports<T>(definition: DefinitionInterface<T>): boolean
    {
        return definition.type === 'factory';
    }
}
