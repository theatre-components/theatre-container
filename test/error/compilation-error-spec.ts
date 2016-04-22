import CompilationError from './../../lib/error/compilation-error';

describe('error/compilation-error', () => {
    let error;

    beforeEach(() => {
        error = new CompilationError('something wrong!');
    });

    it('is a standard javascript error', () => {
        expect(error instanceof Error).toBe(true);
    });

    it('format the message as a compilation trouble', () => {
        expect(error.message).toBe('[theatre-container][compilation] something wrong!');
    });
});
