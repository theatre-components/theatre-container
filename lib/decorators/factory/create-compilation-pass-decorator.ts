import ContainerInterface from './../../container/container-interface';
import RegistrationError from './../../error/registration-error';
import CompilationPassInterface from './../../compilation/compilation-pass-interface';

/**
 * Create a @compilationPass decorator.
 */
export default function createCompilationPassDecorator(container: ContainerInterface) {
    return <T>(...compilationPass: Array<CompilationPassInterface<T>>) => {
        return (target: Function) => {
            if (!target['__theatreDefinition']) {
                throw new RegistrationError('Undefined service name. You must use the @service decorator before @compilationPass.');
            }

            let definition = container.definitions.retrieve(target['__theatreDefinition']);

            if (definition.compilationPass) {
                definition.compilationPass.concat(compilationPass);

                return;
            }

            definition.compilationPass = compilationPass;
        };
    };
};
