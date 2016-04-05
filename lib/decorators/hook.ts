import ContainerInterface from './../container/container-interface';
import ContainerError from './../error/container-error';

interface HookCallback
{
    (service: any, container: ContainerInterface): void;
}

/**
 * Allow to **hook** a given **service** with a decorator.
 */
export default function hook (callback: HookCallback) {
    return (target: Function) => {
        if (!target['_theatre_service']) {
            throw new ContainerError(`The hook annotation can only be applied with a previous service annotation. Maybe you missed the service annotation or a bad annotation order.`);
        }

        let container   = target['_theatre_service']['container'];
        let serviceName = target['_theatre_service']['name'];

        container.resolver.after((name, value, container) => {
            if (name !== serviceName || !value instanceof target) {
                return;
            }

            callback(value, container);
        });
    }
}
