import { describe, expect, it } from 'vitest';
import { CliArguments } from '../CliArguments';

describe('CliArguments', () => {
	describe('method `.getString(key)`', () => {
		it('should return a string value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
				'value',
			]);
			expect(cliArguments.getString('string')).toBe('value');
		});

		it('should return a `null` value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--string',
			]);
			expect(cliArguments.getString('string')).toBe(null);
		});

		it('should return a `null` value if arg is empty string', () => {
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
		it('should return a number value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--port',
				'4000',
			]);
			expect(cliArguments.getNumber('port')).toBe(4000);
		});

		it('should return a `null` value', () => {
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
		it('should return a `true` value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(true);
		});

		it('should return a `false` value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--no-enabled',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(false);
		});

		it('should return a `null` value', () => {
			const cliArguments = new CliArguments([
				'node-interpreter',
				'cli-command',
				'--enabled',
				'true',
			]);
			expect(cliArguments.getBoolean('enabled')).toBe(null);
		});
	});
});
