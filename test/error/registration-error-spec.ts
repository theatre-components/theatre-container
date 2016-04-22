import RegistrationError from './../../lib/error/registration-error';

describe('error/registration-error', () => {
    let error;

    beforeEach(() => {
        error = new RegistrationError('youps!');
    });

    it('is a standard javascript error', () => {
        expect(error instanceof Error).toBe(true);
    });

    it('format the message', () => {
        expect(error.message).toBe('[theatre-container][registration] youps!');
    });
});
