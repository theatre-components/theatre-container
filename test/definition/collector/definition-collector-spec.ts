import DefinitionCollector from './../../../lib/definition/collector/definition-collector';
import TYPES from './../../../lib/definition/types';
import RegistrationError from './../../../lib/error/registration-error';

describe('definition/collector/definition-collector', () => {
    let collector;

    beforeEach(() => {
        collector = new DefinitionCollector();
    });

    it('collect and retrieve definitions', () => {
        collector.collect({
            name: 'test',
            type: TYPES.Scalar,
            subject: 'plop'
        });

        expect(collector.retrieve('test').subject).toBe('plop');
    });

    it('can not retrieve unregistered definitions', () => {
        expect(() => {
            collector.retrieve('plop');
        }).toThrowError(RegistrationError);
    });

    it('can not collect the same named definition more than one', () => {
        collector.collect({
            name: 'test',
            type: TYPES.Scalar,
            subject: 'plop'
        });

        expect(() => {
            collector.collect({
                name: 'test',
                type: TYPES.Scalar,
                subject: 'plop'
            });
        }).toThrowError(RegistrationError);
    });

    it('can test definition existence', () => {
        expect(collector.exists('test')).toBe(false);
        collector.collect({
            name: 'test',
            type: TYPES.Scalar,
            subject: 'plop'
        });

        expect(collector.exists('test')).toBe(true);
    });

    it('can replace an existing definition', () => {
        collector.collect({
            name: 'test',
            type: TYPES.Scalar,
            subject: 'plop'
        });

        collector.replace({
            name: 'test',
            type: TYPES.Scalar,
            subject: 'plip'
        });

        expect(collector.retrieve('test').subject).toBe('plip');
    });

    it('can not replace an unexistent definition', () => {
        expect(() => {
            collector.replace({
                name: 'test',
                type: TYPES.Scalar,
                subject: 'plip'
            });
        }).toThrowError(RegistrationError);
    });

    it('can loop on definitions', () => {
        collector.collect({
            name: 'test1',
            type: TYPES.Scalar,
            subject: 'plop1'
        });
        collector.collect({
            name: 'test2',
            type: TYPES.Scalar,
            subject: 'plop2'
        });

        let collection = {};

        collector.forEach((definition) => {
            collection[definition.name] = definition;
        });

        expect(collection['test1']).toBe(collector.retrieve('test1'));
        expect(collection['test2']).toBe(collector.retrieve('test2'));
    });

    it('can find definitions by tag name', () => {
        collector.collect({
            name: 'test1',
            type: TYPES.Scalar,
            subject: 'plop1',
            metadata: {
                "a": true
            },
        });
        collector.collect({
            name: 'test2',
            type: TYPES.Scalar,
            subject: 'plop2',
            metadata: {
                "a": true,
                "b": true
            },
        });

        let a = collector.find('a');
        let b = collector.find('b');
        let all = collector.find('a', 'b');

        expect(a.length).toBe(2);
        expect(b.length).toBe(1);
        expect(all.length).toBe(2);
    });
});
