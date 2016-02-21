import * as container from 'theatre/container';
import {Container} from 'theatre/container';

describe('A theatre container', () => {
    it('contains a container', () => {
        let a = new Container();
        let b = new container.Container();

        expect(a instanceof container.Container).toBe(true);
        expect(a instanceof Container).toBe(true);
        expect(b instanceof container.Container).toBe(true);
        expect(b instanceof Container).toBe(true);
    });
});
