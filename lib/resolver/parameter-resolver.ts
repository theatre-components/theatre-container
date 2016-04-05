import SupportableResolverInterface from './supportable-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import Types from './../definition/types';
import ContainerInterface from './../container/container-interface';

/**
 * Resolve parameter definitions. It also resolved recursivly parameters
 * references inside '%' characters:
 *
 * ```
 * let registeredParameters = {
 *    "embed1": 1,
 *    "embed2": 2,
 *    "example": "My %embed1% parameter with %embed2%"
 * }
 *
 * // resolved "example" => "My 1 parameter with 2"
 * ```
 *
 * **NOTE**: Array and JSON are also resolved recursivly.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class ParameterResolver implements SupportableResolverInterface
{
    /**
     * {@inheritdoc}
     */
    resolve(name: string, definition: DefinitionInterface, container: ContainerInterface): any
    {
        return this.resolveScalar(definition.subject, container);
    }

    /**
     * {@inheritdoc}
     */
    supports(definition: DefinitionInterface): boolean
    {
        return definition.type === Types.Parameter;
    }

    private resolveScalar(subject: any, container: ContainerInterface): any
    {
        if (subject instanceof Array) {
            for (let index in subject) {
                subject[index] = this.resolveScalar(subject[index], container);
            }

            return subject;
        }

        if (subject instanceof Object) {
            for (let key in subject) {
                let newKey = this.resolveRaw(key, container);
                let value = subject[key];

                delete subject[key];

                subject[newKey] = this.resolveScalar(value, container);
            }

            return subject;
        }

        return this.resolveRaw(subject, container);
    }

    private resolveRaw(value: any, container: ContainerInterface): string
    {
        if ('string' !== typeof value) {
            return value;
        }

        let matches = value.match(/@[^ ]+/g);

        if (!matches) {
            return value;
        }

        for (let match of matches) {
            let resolved = container.get(match.slice(1));

            value = value.replace(new RegExp(match, 'g'), resolved);
        }

        return value;
    }
}
