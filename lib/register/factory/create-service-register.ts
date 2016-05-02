import ContainerInterface from './../../container/container-interface';
import TYPES from './../../definition/types';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a service registration function with a given container.
 */
export default function createServiceRegister(container: ContainerInterface) {
    return (
        name: string,
        subject: any,
        inject?: Array<string>,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface>
    ) => {
        let definition = <DefinitionInterface>{
            name: name,
            subject: subject,
            type: TYPES.Service,
            inject: inject || [],
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register(definition);
    };
};
