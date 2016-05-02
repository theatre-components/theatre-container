import createFactoryRegister from './factory/create-factory-register';
import container from './../container';
import CompilationPassInterface from './../compilation/compilation-pass-interface';

let factory = createFactoryRegister(container);

export default factory;
