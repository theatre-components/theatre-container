import AggregableResolver from './aggregable-resolver';
import ScalarDefinitionResolver from './scalar-definition-resolver';
import FactoryDefinitionResolver from './factory-definition-resolver';
import ServiceDefinitionResolver from './service-definition-resolver';
import DefinitionResolverInterface from './definition-resolver-interface';

export default function createDefaultResolver(): DefinitionResolverInterface {
    let resolver = new AggregableResolver();

    return resolver
        .addResolver(new ScalarDefinitionResolver())
        .addResolver(new FactoryDefinitionResolver())
        .addResolver(new ServiceDefinitionResolver())
    ;
};
