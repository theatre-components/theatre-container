/**
 * A standard implemtation of a basic error in theatre/container.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default class ContainerError extends Error
{
    constructor(message: string)
    {
        super(message);

        this.message = `[theatre/container] ${message}`;
        this.name    = 'TheatreContainerError';
    }
}
