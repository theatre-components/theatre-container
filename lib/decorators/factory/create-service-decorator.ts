import ContainerInterface from './../../container/container-interface';
import DefinitionInterface from './../../definition/definition-interface';
import TYPES from './../../definition/types';

/**
 * Create a default service decorator function.
 */
export default function createServiceDecorator(container: ContainerInterface) {
    return (name: string) =>  {
        return (target: Function) => {
            container.register({
                name: name,
                type: TYPES.Service,
                subject: target
            });

            target['__theatreDefinition'] = name;
        };
    };
};
