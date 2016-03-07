import ContainerInterface from 'theatre/container/container/container-interface';
import ContainerError from 'theatre/container/error/container-error';
import MetadataInterface from 'theatre/container/definition/metadata-interface';

/**
 * Add to a class some tags for the container.
 */
export default function tag (name: string, meta?: any) {
    return (target: Function) => {
        if (!target._theatre_service) {
            throw new ContainerError(`Unable to tag an undefined service. Maybe you just need to register the service before using the Tag decorator.`);
        }

        let definition = target
            ._theatre_service
            .container
            .getDefinition(target._theatre_service.name)
        ;

        if (!definition.tags) {
            definition.tags = [];
        }

        definition.tags.push(name);

        if (!meta) {
            return;
        }

        if (!definition.metadata) {
            definition.metadata = <MetadataInterface>{};
        }

        definition.metadata[name] = meta;

        return;
    }
}
