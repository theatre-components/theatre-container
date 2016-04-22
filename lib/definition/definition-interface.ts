import TYPES from './types';
import CompilationPassInterface from './../compilation/compilation-pass-interface';

/**
 * A definition is used for container registration. It allows you to define
 * a container member and how it should be resolved.
 */
interface DefinitionInterface
{
    /**
     * Used as an identifier inside the container.
     *
     * @see "./../container/container-interface.ts#get"
     */
    name: string;

    /**
     * Define here wich kind of definition is this for.
     */
    type: TYPES;

    /**
     * This is the value / function or class that will be resolved into
     * the container.
     */
    subject: any;

    /**
     * Defines here the members you want to inject.
     */
    inject?: Array<string>;

    /**
     * A free metadata object used for compilation pass in the container.
     */
    metadata?: Object;

    /**
     * Pass here the compilation pass for this definition.
     */
    compilationPass?: Array<CompilationPassInterface>;
}

export default DefinitionInterface;
