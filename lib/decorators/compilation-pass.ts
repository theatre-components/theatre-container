import container from './../container';
import createCompilationPassDecorator from './factory/create-compilation-pass-decorator';
import CompilationPassInterface from './../compilation/compilation-pass-interface';

let compilationPass = createCompilationPassDecorator(container);

export default compilationPass;
