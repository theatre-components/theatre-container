import ContainerInterface from './../../container/container-interface';
import TYPES from './../../definition/types';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a factory registration function with a given container.
 */
export default function createFactoryRegister(container: ContainerInterface) {
    return <T extends Function>(
        name: string,
        subject: T,
        inject?: Array<string>,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface<T>>
    ) => {
        let definition = <DefinitionInterface<T>>{
            name: name,
            subject: subject,
            type: TYPES.Factory,
            inject: inject || [],
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register<T>(definition);
    };
};
