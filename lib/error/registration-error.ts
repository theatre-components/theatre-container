import TheatreContainerError from './theatre-container-error';

/**
 * Notify container registration errors.
 */
export default class RegistrationError extends TheatreContainerError
{
    constructor(message: string)
    {
        super(`[registration] ${message}`);
    }
}
