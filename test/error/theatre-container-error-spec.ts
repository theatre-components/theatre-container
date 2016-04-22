import TheatreContainerError from './../../lib/error/theatre-container-error';

describe('error/theatre-container-error', () => {
    let error;

    beforeEach(() => {
        error = new TheatreContainerError('test');
    });

    it('is a standard javascript error', () => {
        expect(error instanceof Error).toBe(true);
    });

    it('format the message by default', () => {
        expect(error.message).toBe('[theatre-container]test');
    });
});
