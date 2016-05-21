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
        private definitionsCollector?: DefinitionCollectorInterface<any>
    ) {
        if (!definitionResolver) {
            this.definitionResolver = createDefaultResolver();
        }

        if (!definitionsCollector) {
            this.definitionsCollector = new DefinitionCollector<any>();
        }

        this.compiled = <CompiledDefinitionCollectionInterface>{};
    }

    /**
     * {@inheritdoc}
     */
    register<A>(definition: DefinitionInterface<A>): ContainerInterface
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

    /**
     * {@inheritdoc}
     */
    embed(container: ContainerInterface, alias?: string): ContainerInterface
    {
        container.definitions.forEach((definition: DefinitionInterface<any>) => {
            definition = Object.create(definition);

            definition.name = alias ?
                `${alias}.${definition.name}` :
                definition.name
            ;

            if (this.definitionsCollector.exists(definition.name)) {
                this.definitionsCollector.replace(definition);

                return;
            }

            this.definitionsCollector.collect(definition);
        });

        this.compiled = <CompiledDefinitionCollectionInterface>{};

        return this;
    }

    get definitions(): DefinitionCollectorInterface<any>
    {
        return this.definitionsCollector;
    }
}
