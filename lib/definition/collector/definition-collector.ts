import DefinitionCollectorInterface from './definition-collector-interface';
import {LoopOnDefinitionInterface} from './definition-collector-interface';
import DefinitionInterface from './../definition-interface';
import RegistrationError from './../../error/registration-error';

/**
 * Implements a standard definition collector.
 */
export default class DefinitionCollector<T> implements DefinitionCollectorInterface<T>
{
    private definitions: Array<DefinitionInterface<T>>;

    constructor()
    {
        this.definitions = [];
    }

    /**
     * {@inheritdoc}
     */
    collect(definition: DefinitionInterface<T>): DefinitionCollectorInterface<T>
    {
        if (this.exists(definition.name)) {
            throw new RegistrationError(`The definition "${definition.name}" is already registered into the container.`);
        }

        this.definitions.push(definition);

        return this;
    }

    /**
     * {@inheritdoc}
     */
    exists(name: string): boolean
    {
        for (let definition of this.definitions) {
            if (name === definition.name) {
                return true;
            }
        }

        return false;
    }

    /**
     * {@inheritdoc}
     */
    retrieve(name: string): DefinitionInterface<T>
    {
        for (let definition of this.definitions) {
            if (name === definition.name) {
                return definition;
            }
        }

        throw new RegistrationError(`The definition "${name}" is not registered in the container. Maybe a typo somewhere ?`);
    }

    /**
     * Replace a given definition.
     */
    replace(definition: DefinitionInterface<T>): DefinitionCollectorInterface<T>
    {
        if (!this.exists(definition.name)) {
            throw new RegistrationError(`Unable to replace the definition "${definition.name}", it's not registered in the container. Maybe a type somewhere ?`);
        }

        for (let i in this.definitions) {
            if (definition.name !== this.definitions[i].name) {
                continue;
            }

            this.definitions[i] = definition;
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    forEach(callback: LoopOnDefinitionInterface<T>): DefinitionCollectorInterface<T>
    {
        for (let definition of this.definitions) {
            callback(definition);
        }

        return this;
    }

    /**
     * {@inheritdoc}
     */
    find(...metas: Array<string>): Array<DefinitionInterface<T>>
    {
        let results = [];

        for (let meta of metas) {
            for (let i in this.definitions) {
                let definition = this.definitions[i];
                let alreadyRegistered = false;

                if (!definition.metadata || undefined === definition.metadata[meta]) {
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
