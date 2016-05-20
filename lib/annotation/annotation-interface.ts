import CompilationPassInterface from './../compilation/compilation-pass-interface';

/**
 * This object contains all defined annotations for theatre container.
 */
interface AnnotationInterface
{
    /**
     * Register an class as a service.
     */
    register<T extends Function>(
        name: string,
        inject?: Array<string>,
        metadata?: Object,
        compilationPass?: Array<CompilationPassInterface<T>>
    ): (target: T) => void;
}

export default AnnotationInterface;
