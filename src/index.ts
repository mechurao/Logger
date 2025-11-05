// src/index.ts
import chalk from 'chalk';
import * as util from "node:util";

export type Attr = Record<string, unknown> | undefined | null;

/**
 * Logger is a static utility class for structured and color-coded logging.
 * It provides standardized methods for logging messages of various levels
 * (log, error, warn, info), each including context such as module, component,
 * and optional attributes.
 */
export class Logger {
    private constructor() {
        /* static-only */
    }

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

    static processOutput(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): string {
        const modStr = chalk.cyan(String(moduleName).padEnd(15));
        const compStr = chalk.magenta(String(component).padEnd(15));
        const msgStr = util.inspect(message, { depth: null, colors: true });
        const attrStr = this.formatAttr(attr);
        return `${modStr} ${compStr} ${msgStr} ${attrStr}`;
    }

    static log(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): void {
        console.log(chalk.green('[Log]   ') + this.processOutput(moduleName, component, message, attr));
    }

    static error(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): void {
        console.error(chalk.bgRed.white('[Error] ') + this.processOutput(moduleName, component, message, attr));
    }

    static warn(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): void {
        console.warn(chalk.yellow('[Warn]  ') + this.processOutput(moduleName, component, message, attr));
    }

    static info(
        moduleName: string | number,
        component: string | number,
        message: unknown,
        attr?: Attr
    ): void {
        console.info(chalk.blue('[Info]  ') + this.processOutput(moduleName, component, message, attr));
    }
}

export default Logger;