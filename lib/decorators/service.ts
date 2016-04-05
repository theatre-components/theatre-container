import container from './../main';
import ContainerInterface from './../container/container-interface';
import Types from './../definition/types';

/**
 * Decorate a Class as a service.
 */
export default function service (name: string, otherContainer?: ContainerInterface) {
    let currentContainer = otherContainer || container;

    return (target: Function) => {
        target._theatre_service = {
            name: name,
            container: currentContainer
        };

        currentContainer.register(name, {
            subject: target,
            type: Types.Service,
            parameters: []
        });
    };
}
