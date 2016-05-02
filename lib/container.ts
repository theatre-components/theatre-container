import Container from './container/container';
import FrozenContainer from './container/frozen-container';

let container = new FrozenContainer(new Container());

export default container;
