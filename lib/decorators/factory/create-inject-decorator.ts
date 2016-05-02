import ContainerInterface from './../../container/container-interface';
import RegistrationError from './../../error/registration-error';

/**
 * Create an @inject decorator for services.
 */
export default function createInjectDecorator(container: ContainerInterface) {
    return (...inject: Array<string>) => {
        return (target: Function) => {
            if (!target['__theatreDefinition']) {
                throw new RegistrationError('Undefined service name. You must use the @service annotation before using the @inject.');
            }

            let definition = container.definitions.retrieve(target['__theatreDefinition']);

            if (definition.inject) {
                definition.inject.concat(inject);

                return;
            }

            definition.inject = inject;
        };
    };
};
