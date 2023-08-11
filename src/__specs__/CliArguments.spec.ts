import { describe, expect, it } from 'vitest';
import { CliArguments } from '../CliArguments';

describe('CliArguments', () => {
	describe('method `.getString(key)`', () => {
		it('should return a string from the single value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
				'value',
			]);
			expect(cliArguments.getString('string')).toBe('value');
		});

		it('should return a last string from the multiple value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
				'value1',
				'--string',
				'value2',
			]);
			expect(cliArguments.getString('string')).toBe('value2');
		});

		it('should return a `null` when value of argument is the boolean', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
			]);
			expect(cliArguments.getString('string')).toBe(null);
		});

		it('should return a `null` when value of argument is the empty string', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
				'',
			]);
			expect(cliArguments.getString('string')).toBe(null);
		});
	});

	describe('method `.getNumber(key)`', () => {
		it('should return a number from the single value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--port',
				'4000',
			]);
			expect(cliArguments.getNumber('port')).toBe(4000);
		});

		it('should return a last number from the multiple value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--port',
				'4000',
				'--port',
				'8080',
			]);
			expect(cliArguments.getNumber('port')).toBe(8080);
		});

		it('should return a `null` when value of argument is not a number', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--port',
				'Lorem',
			]);
			expect(cliArguments.getNumber('port')).toBe(null);
		});

		it('should return a `null` when value of argument is not a finite number', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--port',
				'Infinity',
			]);
			expect(cliArguments.getNumber('port')).toBe(null);
		});
	});

	describe('method `.getBoolean(key)`', () => {
		it('should return a `true` from a single value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(true);
		});

		it('should return a `false` from a single value of the argument with `no-*` part', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--no-enabled',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(false);
		});

		it('should return a `null` when the value is a string', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
				'true',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(null);
		});

		it('should return a `null` when the value is a number', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
				'4000',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(null);
		});

		it('should return a last number from the multiple value of the argument', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
				'--no-enabled',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(false);
		});
	});
});
