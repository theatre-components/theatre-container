import DefinitionResolverInterface from './definition-resolver-interface';
import SupportableDefinitionResolverInterface from './supportable-definition-resolver-interface';
import DefinitionInterface from './../definition/definition-interface';
import ContainerInterface from './../container/container-interface';
import CompilationError from './../error/compilation-error';

/**
 * Aggregate resolvers in one.
 */
export default class AggregableResolver implements DefinitionResolverInterface
{
    private resolvers: Array<SupportableDefinitionResolverInterface>;

    constructor()
    {
        this.resolvers = [];
    }

    /**
     * {@inheritdoc}
     */
    resolve<T>(definition: DefinitionInterface<T>, container: ContainerInterface): T
    {
        for (let resolver of this.resolvers) {
            if (!resolver.supports<T>(definition)) {
                continue;
            }

            return resolver.resolve<T>(definition, container);
        }

        let parsedDefinition = JSON.stringify(definition, null, 4);

        throw new CompilationError(
            `Unable to resolve the definition ${definition.name}. Maybe a non supprted type ? ${parsedDefinition}`
        );
    }

    /**
     * Aggregate a new resolver.
     */
    addResolver(resolver: SupportableDefinitionResolverInterface): AggregableResolver
    {
        this.resolvers.push(resolver);

        return this;
    }
}
