import container from './../container';
import createCompilationPassDecorator from './factory/create-compilation-pass-decorator';

let compilationPass = createCompilationPassDecorator(container);

export default compilationPass;
