/**
 * Define a custom Error class for this library.
 */
export default class TheatreContainerError extends Error
{
    constructor(message)
    {
        super(message);

        this.message = `[theatre-container]${message}`;
        this.name = 'TheatreContainerError';
    }
}
