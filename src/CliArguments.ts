import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

export class CliArguments {
	protected argv: Exclude<Argv['argv'], Promise<any>>;

	constructor(source = process.argv) {
		const argv = yargs(hideBin(source)).argv;
		if (typeof argv === 'object' && argv !== null && !('then' in argv)) {
			this.argv = argv;
		} else {
			throw new Error('CliArguments got Argv as Promise!');
		}
	}

	protected getArgvValue(key: string): unknown {
		const value = this.argv[key];
		return Array.isArray(value) ? value[value.length - 1] : value;
	}

	getString<S extends boolean>(
		key: string,
		strict?: S
	): S extends true ? string : string | null {
		const value = this.getArgvValue(key);
		if (typeof value === 'string' && value.length > 0) {
			return value;
		} else {
			if (strict) {
				throw new Error(CliArguments.getStringError(key));
			} else {
				return null as S extends true ? string : string | null;
			}
		}
	}

	static getStringError(arg: string): string {
		return `The argument \`${arg}\` is not a defined as string!`;
	}

	getNumber<S extends boolean>(
		key: string,
		strict?: S
	): S extends true ? number : number | null {
		const value = this.getArgvValue(key);
		if (typeof value === 'number' && Number.isFinite(value)) {
			return value;
		} else {
			if (strict) {
				throw new Error(CliArguments.getNumberError(key));
			} else {
				return null as S extends true ? number : number | null;
			}
		}
	}

	static getNumberError(arg: string): string {
		return `The argument \`${arg}\` is not a defined as number!`;
	}

	getBoolean<S extends boolean>(
		key: string,
		strict?: S
	): S extends true ? boolean : boolean | null {
		const value = this.getArgvValue(key);
		if (typeof value === 'boolean') {
			return value;
		} else {
			if (strict) {
				throw new Error(CliArguments.getBooleanError(key));
			} else {
				return null as S extends true ? boolean : boolean | null;
			}
		}
	}

	static getBooleanError(arg: string): string {
		return `The argument \`${arg}\` is not a defined as boolean!`;
	}
}
