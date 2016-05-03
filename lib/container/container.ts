import ContainerInterface from './container-interface';
import DefinitionInterface from './../definition/definition-interface';
import DefinitionResolverInterface from './../resolver/definition-resolver-interface';
import RegistrationError from './../error/registration-error';
import createDefaultResolver from './../resolver/factory';
import DefinitionCollectorInterface from './../definition/collector/definition-collector-interface';
import DefinitionCollector from './../definition/collector/definition-collector';

interface CompiledDefinitionCollectionInterface
{
    [index: string]: any;
}

/**
 * A standard container implemenation.
 */
export default class Container implements ContainerInterface
{
    private compiled: CompiledDefinitionCollectionInterface;

    constructor(
        private definitionResolver?: DefinitionResolverInterface,
        private definitionsCollector?: DefinitionCollectorInterface
    ) {
        if (!definitionResolver) {
            this.definitionResolver = createDefaultResolver();
        }

        if (!definitionsCollector) {
            this.definitionsCollector = new DefinitionCollector();
        }

        this.compiled = <CompiledDefinitionCollectionInterface>{};
    }

    /**
     * {@inheritdoc}
     */
    register(definition: DefinitionInterface): ContainerInterface
    {
        this.definitionsCollector.collect(definition);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    get<T>(name: string): T
    {
        if (undefined !== this.compiled[name]) {
            return this.compiled[name];
        }

        if (!this.definitionsCollector.exists(name)) {
            throw new RegistrationError(`No member named ${name} has been found in the container.`);
        }

        let definition = this.definitionsCollector.retrieve(name);

        if (definition.compilationPass) {
            for (let pass of definition.compilationPass) {
                pass.beforeCompilation(definition, this);
            }
        }

        let resolvedMember = this.definitionResolver.resolve(
            definition,
            this
        );

        if (definition.compilationPass) {
            for (let pass of definition.compilationPass) {
                pass.afterCompilation(resolvedMember, this);
            }
        }

        if (undefined !== definition.metadata && false === definition.metadata['singleton']) {
            return resolvedMember;
        }

        this.compiled[name] = resolvedMember;

        return <T>this.compiled[name];
    }

    /**
     * {@inheritdoc}
     */
    has(name: string): boolean
    {
        return this.definitionsCollector.exists(name);
    }

    get definitions(): DefinitionCollectorInterface
    {
        return this.definitionsCollector;
    }
}
