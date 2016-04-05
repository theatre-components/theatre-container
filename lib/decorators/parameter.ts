import ContainerError from './../error/container-error';

/**
 * Inject a dependency into a service definition. Decorates function parameters.
 */
export default function parameter (name: string) {
    return (target: any, propertyKey: string) => {
        if (!target._theatre_service) {
            throw new ContainerError(`You can't inject something in a non service class. Maybe you miss the Service decorator ?`);
        }

        let container  = target._theatre_service.container;
        let definition = container.getDefinition(target._theatre_service.name);

        if (!definition.parameters) {
            definition.parameters = [];
        }

        definition.parameters.push(`@${name}`);
    }
}
