import AnnotationInterface from './annotation-interface';
import CompilationPassInterface from './../compilation/compilation-pass-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';

/**
 * This is a default annotations instance.
 */
export default class Annotation implements AnnotationInterface
{
    constructor(private container: ContainerInterface)
    {
    }

    /**
     * {@inheritdoc}
     */
    register<T extends Function>(
        name: string,
        inject?: Array<string>,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface<T>>
    ): (target: T) => void
    {
        return (target: T) => {
            let definition: DefinitionInterface<T> = {
                name: name,
                type: 'service',
                value: target,
                inject: inject,
                metadata: metadata,
                compilationPass: compilationPass
            };

            this.container.register(definition);
        };
    }
}
