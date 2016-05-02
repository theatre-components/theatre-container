import ContainerInterface from './../../container/container-interface';
import RegistrationError from './../../error/registration-error';

/**
 * Create a @metadata annotation.
 */
export default function createMetadataDecorator(container: ContainerInterface) {
    return (name: string, value: any = true) => {
        return (target: Function) => {
            if (!target['__theatreDefinition']) {
                throw new RegistrationError('Undefined service name. Please use the @service tag before using the @metadata tag.');
            }

            let definition = container.definitions.retrieve(target['__theatreDefinition']);

            if (!definition.metadata) {
                definition.metadata = {};
            }

            definition.metadata[name] = value;
        };
    };
};
