import createScalarRegister from './factory/create-scalar-register';
import container from './../container';
import CompilationPassInterface from './../compilation/compilation-pass-interface';

let scalar = createScalarRegister(container);

export default scalar;
