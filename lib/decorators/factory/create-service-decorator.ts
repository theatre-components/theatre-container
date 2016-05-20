import ContainerInterface from './../../container/container-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a default service decorator function.
 */
export default function createServiceDecorator(container: ContainerInterface) {
    return (name: string) =>  {
        return (target: Function) => {
            container.register({
                name: name,
                type: 'service',
                subject: target
            });

            target['__theatreDefinition'] = name;
        };
    };
};
