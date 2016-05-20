import Container from './container/container';
import FrozenContainer from './container/frozen-container';

const container = new FrozenContainer(new Container());

export default container;
