import Container from './../../lib/container/container';
import Annotation from './../../lib/annotation/annotation';

class Test
{
    public sentence: string;

    constructor(name: string)
    {
        this.sentence = `Hello ${name}`;
    }
}

describe('annotation/annotation', () => {
    let annotation: Annotation, container: Container;

    beforeEach(() => {
        container = new Container();

        container.register({
            name: 'foo',
            type: 'scalar',
            value: 'foo'
        });

        annotation = new Annotation(container);
    });

    it('can create a register annotation', () => {
        annotation.register('test', ['@foo'])(Test);

        expect(container.get<Test>('test').sentence).toBe('Hello foo');
    });
});
