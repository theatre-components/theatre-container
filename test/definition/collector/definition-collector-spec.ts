import DefinitionCollector from './../../../lib/definition/collector/definition-collector';
import RegistrationError from './../../../lib/error/registration-error';

describe('definition/collector/definition-collector', () => {
    let collector;

    beforeEach(() => {
        collector = new DefinitionCollector();
    });

    it('collect and retrieve definitions', () => {
        collector.collect({
            name: 'test',
            type: 'scalar',
            value: 'plop'
        });

        expect(collector.retrieve('test').value).toBe('plop');
    });

    it('can not retrieve unregistered definitions', () => {
        expect(() => {
            collector.retrieve('plop');
        }).toThrowError(RegistrationError);
    });

    it('can not collect the same named definition more than one', () => {
        collector.collect({
            name: 'test',
            type: 'scalar',
            value: 'plop'
        });

        expect(() => {
            collector.collect({
                name: 'test',
                type: 'scalar',
                value: 'plop'
            });
        }).toThrowError(RegistrationError);
    });

    it('can test definition existence', () => {
        expect(collector.exists('test')).toBe(false);
        collector.collect({
            name: 'test',
            type: 'scalar',
            value: 'plop'
        });

        expect(collector.exists('test')).toBe(true);
    });

    it('can replace an existing definition', () => {
        collector.collect({
            name: 'test',
            type: 'scalar',
            value: 'plop'
        });

        collector.replace({
            name: 'test',
            type: 'scalar',
            value: 'plip'
        });

        expect(collector.retrieve('test').value).toBe('plip');
    });

    it('can not replace an unexistent definition', () => {
        expect(() => {
            collector.replace({
                name: 'test',
                type: 'scalar',
                value: 'plip'
            });
        }).toThrowError(RegistrationError);
    });

    it('can loop on definitions', () => {
        collector.collect({
            name: 'test1',
            type: 'scalar',
            value: 'plop1'
        });
        collector.collect({
            name: 'test2',
            type: 'scalar',
            value: 'plop2'
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
            type: 'scalar',
            value: 'plop1',
            metadata: {
                "a": true
            },
        });
        collector.collect({
            name: 'test2',
            type: 'scalar',
            value: 'plop2',
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
