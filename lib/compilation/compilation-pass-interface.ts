import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';

/**
 * Used for hooking a definition compilation process.
 */
interface CompilationPassInterface<T>
{
    /**
     * This method will be launched just before the compilation allowing
     * you to «Hook» a definition.
     */
    beforeCompilation?(definition: DefinitionInterface<T>, container: ContainerInterface): void;

    /**
     * This one «Hook» a given resolved members just after the definition has
     * been resolved.
     */
    afterCompilation?(value: T, container: ContainerInterface): void;
}

export default CompilationPassInterface;
