import ContainerInterface from './../../container/container-interface';
import TYPES from './../../definition/types';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';
import DefinitionInterface from './../../definition/definition-interface';

/**
 * Create a scalar registration function with a given container.
 */
export default function createScalarRegister(container: ContainerInterface) {
    return (
        name: string,
        subject: any,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface>
    ) => {
        let definition = <DefinitionInterface>{
            name: name,
            subject: subject,
            type: TYPES.Scalar,
            metadata: metadata || {},
            compilationPass: compilationPass || []
        };

        container.register(definition);
    };
};
