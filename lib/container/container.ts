import ContainerInterface from './container-interface';
import DefinitionInterface from './../definition/definition-interface';
import DefinitionResolverInterface from './../resolver/definition-resolver-interface';
import RegistrationError from './../error/registration-error';
import createDefaultResolver from './../resolver/factory';

interface CompiledDefinitionCollectionInterface
{
    [index: string]: any;
}

interface DefinitionCollectionInterface
{
    [index: string]: DefinitionInterface;
}

/**
 * A standard container implemenation.
 */
export default class Container implements ContainerInterface
{
    private definitions: DefinitionCollectionInterface;

    private compiled: CompiledDefinitionCollectionInterface;

    constructor(private definitionResolver?: DefinitionResolverInterface)
    {
        if (!definitionResolver) {
            this.definitionResolver = createDefaultResolver();
        }

        this.definitions = <DefinitionCollectionInterface>{};
        this.compiled = <CompiledDefinitionCollectionInterface>{};
    }

    /**
     * {@inheritdoc}
     */
    register(definition: DefinitionInterface): ContainerInterface
    {
        if (undefined !== this.definitions[definition.name]) {
            throw new RegistrationError(`The member named ${definition.name} is already registered in the container. You can't register the same member twice.`);
        }

        this.definitions[definition.name] = definition;

        return this;
    }

    /**
     * {@inheritdoc}
     */
    get(name: string): any
    {
        if (undefined === this.compiled[name]) {
            if (undefined === this.definitions[name]) {
                throw new RegistrationError(`No member named ${name} has been found in the container.`);
            }

            if (this.definitions[name].compilationPass) {
                for (let pass of this.definitions[name].compilationPass) {
                    pass.beforeCompilation(this.definitions[name], this);
                }
            }

            let resolvedMember = this.definitionResolver.resolve(
                this.definitions[name],
                this
            );

            if (this.definitions[name].compilationPass) {
                for (let pass of this.definitions[name].compilationPass) {
                    pass.afterCompilation(resolvedMember, this);
                }
            }

            if (undefined !== this.definitions[name].metadata && false === this.definitions[name].metadata['singleton']) {
                return resolvedMember;
            }

            this.compiled[name] = resolvedMember;
        }

        return this.compiled[name];
    }

    /**
     * {@inheritdoc}
     */
    has(name: string): boolean
    {
        return undefined !== this.definitions[name];
    }

    /**
     * {@inheritdoc}
     */
    findDefinitions(...metadataKeys: string[]): Array<DefinitionInterface>
    {
        let results = [];

        for (let meta of metadataKeys) {
            for (let i in this.definitions) {
                let definition = this.definitions[i];
                let alreadyRegistered = false;

                if (undefined === definition.metadata[meta]) {
                    continue;
                }

                for (let registeredDefinition of results) {
                    if (definition === registeredDefinition) {
                        alreadyRegistered = true;

                        break;
                    }
                }

                if (alreadyRegistered) {
                    continue;
                }

                results.push(definition);
            }
        }

        return results;
    }
}
