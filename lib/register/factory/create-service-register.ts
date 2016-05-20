import ContainerInterface from './../../container/container-interface';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a service registration function with a given container.
 */
export default function createServiceRegister(container: ContainerInterface) {
    return <T>(
        name: string,
        subject: T,
        inject?: Array<string>,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface<T>>
    ) => {
        let definition = <DefinitionInterface<T>>{
            name: name,
            subject: subject,
            type: 'service',
            inject: inject || [],
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register<T>(definition);
    };
};
