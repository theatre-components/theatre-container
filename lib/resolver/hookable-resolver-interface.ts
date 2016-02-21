import ResolverInterface from 'theatre/container/resolver/resolver-interface';
import BeforeListenerInterface from 'theatre/container/resolver/listener/before-listener-interface';
import AfterListenerInterface from 'theatre/container/resolver/listener/after-listener-interface';

/**
 * Allow a resolver to be hooked by listeners.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
export default interface HookableResolverInterface extends Resolver
{
    /**
     * Register a BeforeListenerInterface. Those listeners are launched just
     * before a member has been resolved.
     */
    before(listener: BeforeListenerInterface): HookableResolverInterface;

    /**
     * Register a AfterListenerInterface. Those listeners are launched just
     * after a member has been resolved.
     */
    after(listener: AfterListenerInterface): HookableResolverInterface;
}
