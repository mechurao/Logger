import chalk from 'chalk';
import * as util from 'node:util';

export type Attr = Record<string, unknown> | undefined | null;

export class Logger {
    private constructor() {}

    static formatAttr(attr: Attr): string {
        if (attr && typeof attr === 'object' && !Array.isArray(attr)) {
            const entries = Object.entries(attr)
                .map(([key, value]) => {
                    const safeValue =
                        value === undefined
                            ? 'undefined'
                            : value === null
                                ? 'null'
                                : typeof value === 'object'
                                    ? JSON.stringify(value)
                                    : String(value);
                    return `${chalk.gray(key)} = ${chalk.white(safeValue)}`;
                })
                .join(', ');
            return ` ${chalk.dim('[')} ${entries} ${chalk.dim(']')}`;
        }
        return '';
    }

    static getDateTime(): string {
        const now = new Date();

        const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const time = now
            .toLocaleTimeString('cs-CZ', { hour12: false })
            .padStart(8, '0'); // HH:mm:ss

        return chalk.yellow(`${date} ${time}`);
    }

    static processOutput(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): string {
        const dateTime = this.getDateTime();
        const modStr = chalk.cyan(String(moduleName).padEnd(15));
        const compStr = chalk.magenta(String(component).padEnd(15));
        const msgStr = util.inspect(message, { depth: null, colors: true });
        const attrStr = this.formatAttr(attr);

        return `${dateTime} ${modStr} ${compStr} ${msgStr} ${attrStr}`;
    }

    static log(moduleName: string | number, component: string | number, message: unknown, attr?: Attr) {
        console.log(chalk.green('[Log]   ') + this.processOutput(moduleName, component, message, attr));
    }

    static error(moduleName: string | number, component: string | number, message: unknown, attr?: Attr) {
        console.error(chalk.bgRed.white('[Error] ') + this.processOutput(moduleName, component, message, attr));
    }

    static warn(moduleName: string | number, component: string | number, message: unknown, attr?: Attr) {
        console.warn(chalk.yellow('[Warn]  ') + this.processOutput(moduleName, component, message, attr));
    }

    static info(moduleName: string | number, component: string | number, message: unknown, attr?: Attr) {
        console.info(chalk.blue('[Info]  ') + this.processOutput(moduleName, component, message, attr));
    }
}

export default Logger;