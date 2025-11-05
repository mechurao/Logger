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

    static processOutput(moduleName: string | number, component: string | number, message: unknown, attr?: Attr): string {
        const modStr = chalk.cyan(String(moduleName).padEnd(15));
        const compStr = chalk.magenta(String(component).padEnd(15));
        const msgStr = util.inspect(message, { depth: null, colors: true });
        const attrStr = this.formatAttr(attr);
        return `${modStr} ${compStr} ${msgStr} ${attrStr}`;
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

// Fix for CommonJS require() without using "module" directly
const g: any = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : {});
if (g && g.require && g.process && g.process.release && g.process.release.name === 'node') {
    const m = g.module;
    if (m && m.exports) {
        m.exports = Logger;
        m.exports.default = Logger;
        m.exports.Logger = Logger;
    }
}