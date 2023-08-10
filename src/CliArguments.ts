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

	getString(key: string): string | null {
		const value = this.argv[key];
		return typeof value === 'string' && value.length > 0 ? value : null;
	}

	getNumber(key: string): number | null {
		const value = this.argv[key];
		return typeof value === 'number' && Number.isFinite(value)
			? value
			: null;
	}

	getBoolean(key: string): boolean | null {
		const value = this.argv[key];
		return typeof value === 'boolean' ? value : null;
	}
}
