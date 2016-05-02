import createServiceRegister from './factory/create-service-register';
import container from './../container';
import CompilationPassInterface from './../compilation/compilation-pass-interface';

let service = createServiceRegister(container);

export default service;
