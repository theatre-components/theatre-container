import ContainerInterface from './../../container/container-interface';
import TYPES from './../../definition/types';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a factory registration function with a given container.
 */
export default function createFactoryRegister(container: ContainerInterface) {
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
            type: TYPES.Factory,
            inject: inject || [],
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register(definition);
    };
};
