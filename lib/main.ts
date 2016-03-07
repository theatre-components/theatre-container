/**
 * @module
 *
 * Theatre container is a full and advanced container implementation
 * for ECMA6 and typescript.
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
import SimpleContainer from 'theatre/container/container/simple-container';
export {SimpleContainer};

import Types from 'theatre/container/definition/types';
export {Types as DefinitionTypes};

import ContainerError from 'theatre/container/error/container-error';
export {ContainerError};

import Resolver from 'theatre/container/resolver/resolver';
export {Resolver};

import ParameterResolver from 'theatre/container/resolver/parameter-resolver';
export {ParameterResolver};

import ServiceResolver from 'theatre/container/resolver/service-resolver';
export {ServiceResolver};

import ContainerAggregate from 'theatre/container/container/container-aggregate';
export {ContainerAggregate};

const container = new ContainerAggregate();

export default container;
