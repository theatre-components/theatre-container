import * as tct from 'theatre/container';
import {ContainerAggregate as Container} from 'theatre/container';
import container from 'theatre/container';

describe('A theatre container', () => {
    it('contains a container', () => {
        let a = new Container();
        let b = new tct.ContainerAggregate();

        expect(a instanceof tct.ContainerAggregate).toBe(true);
        expect(a instanceof Container).toBe(true);
        expect(b instanceof tct.ContainerAggregate).toBe(true);
        expect(b instanceof Container).toBe(true);
    });

    it('contains a default container implementation', () => {
        expect(container.has('foo')).toBe(false);
    });
});
