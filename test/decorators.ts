import * as decorate from './../lib/decorators';
import * as register from './../lib/register';
import container from './../lib/container';

register.scalar('__foo', 'foo');
register.factory('__bar', (name) => {
    return `My name is ${name}`;
}, ['@__foo']);

let pass = {
    beforeCompilation: (definition, container) => {},
    afterCompilation: (subject, container) => {}
};

@decorate.compilationPass(pass)
@decorate.metadata('test')
@decorate.inject('@__foo', '@__bar')
@decorate.service('__test')
class TestService
{
    public fullSentence: string;

    constructor(name, sentence)
    {
        this.fullSentence = `The name is ${name}, and the sentence is "${sentence}"`;
    }
}

describe('decorators', () => {
    it('decorate a service', () => {
        expect(container.definitions.exists('__test')).toBe(true);
        expect(container.get('__test').fullSentence).toBe('The name is foo, and the sentence is "My name is foo"');
    });

    it('supports metadata decoration', () => {
        expect(container.definitions.retrieve('__test').metadata['test']).toBe(true);
    });

    it('supports compilation pass decoration', () => {
        expect(container.definitions.retrieve('__test').compilationPass[0]).toBe(pass);
    });
});
