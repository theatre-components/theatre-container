import ContainerInterface from './../../container/container-interface';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a scalar registration function with a given container.
 */
export default function createScalarRegister(container: ContainerInterface) {
    return <T>(
        name: string,
        subject: T,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface<T>>
    ) => {
        let definition = <DefinitionInterface<T>>{
            name: name,
            subject: subject,
            type: 'scalar',
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register<T>(definition);
    };
};
