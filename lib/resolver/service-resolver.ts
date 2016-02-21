import DefinitionInterface from 'theatre/container/definition/definition-interface';
import SupportableResolverInterface from 'theatre/container/resolver/supportable-resolver-interface';
import Types from 'theatre/container/definition/types';
import ContainerInterface from 'theatre/container/container/container-interface';

/**
 * Resolve a service definition.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class ServiceResolver implements SupportableResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve(name: string, definition: DefinitionInterface, container: ContainerInterface): any
    {
        let construct          = definition.subject;
        let parameters         = definition.parameters;
        let resolvedParameters = [];

        for (let parameter of parameters) {
            if ('@' !== parameter.charAt(0)) {
                resolvedParameters.push(parameter);

                continue;
            }

            resolvedParameters.push(container.get(parameter.slice(1)));
        }

        return new (Function.prototype.bind.apply(construct, [null].concat(resolvedParameters)));
    }

    /**
     * {@inheritdoc}
     */
    supports(definition: DefinitionInterface): boolean
    {
        return definition.type === Types.Service;
    }
}
