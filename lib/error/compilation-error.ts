import TheatreContainerError from './theatre-container-error';

/**
 * Notify container compilation errors.
 */
export default class CompilationError extends TheatreContainerError
{
    constructor(message: string)
    {
        super(`[compilation] ${message}`);
    }
}
