import SupportableDefinitionResolverInterface from './supportable-definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';

/**
 * Resolve a service definition.
 */
export default class ServiceDefinitionResolver implements SupportableDefinitionResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve<T extends Function>(definition: DefinitionInterface<T>, container: ContainerInterface): T
    {
        if (!definition.inject) {
            return new (Function.prototype.bind.apply(definition.subject, [null]));
        }

        let args = [];

        for (let injection of definition.inject) {
            if ('string' !== typeof injection || '@' !== injection.charAt(0)) {
                args.push(injection);

                continue;
            }

            args.push(container.get(injection.substr(1)));
        }

        return new (Function.prototype.bind.apply(definition.subject, [null].concat(args)));
    }

    /**
     * {@inheritdoc}
     */
    supports<T>(definition: DefinitionInterface<T>): boolean
    {
        return definition.type === 'service';
    }
}
