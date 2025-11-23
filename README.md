# @mechurao/logger

[![npm version](https://img.shields.io/npm/v/@mechurao/logger)](https://www.npmjs.com/package/@mechurao/logger)
[![License](https://img.shields.io/npm/l/@mechurao/logger)](https://opensource.org/licenses/MIT)

A lightweight, structured, and color-coded logger for Node.js and TypeScript projects.  
Designed for both **ESM** and **CommonJS** environments, it provides consistent logging with module and component context, along with optional attributes.

---

## Features

- Color-coded output for `log`, `info`, `warn`, and `error`.
- Structured log format including module, component, and optional attributes.
- Full TypeScript support with `.d.ts` typings.
- Works seamlessly with both Node.js ESM and CommonJS.
- Simple to integrate into any Node.js project.

---

## Installation

```bash
npm install @mechurao/logger
```

---

## Usage

### Basic Example

```ts
import Logger from '@mechurao/logger';

Logger.log('App', 'Startup', 'Application has started');
Logger.info('Server', 'HTTP', 'Listening on port 3000');
Logger.warn('Cache', 'Redis', 'Response time is slow');
Logger.error('DB', 'MongoDB', 'Connection failed', { retry: true });
```

### With Attributes

Attributes allow you to attach structured data to your logs.

```ts
Logger.log('Auth', 'Login', 'User logged in', {
    userId: '123',
    ip: '127.0.0.1'
});
```

### Example Output

```
[Log]   2025-11-23 14:33:04  App             Startup         Application has started
[Info]  2025-11-23 14:33:04  Server          HTTP            Listening on port 3000
[Warn]  2025-11-23 14:33:04  Cache           Redis           Response time is slow
[Error] 2025-11-23 14:33:04  DB              MongoDB         Connection failed [ retry = true ]
```

### Using in CommonJS

```js
const Logger = require('@mechurao/logger').default;

Logger.log('App', 'Init', 'Running in CommonJS environment');
```

### Recommended Usage Pattern

You can create a wrapper per module for cleaner logs:

```ts
// logger.ts
import Logger from '@mechurao/logger';

export const AppLog = {
    startup: (msg, attr) => Logger.log('App', 'Startup', msg, attr),
    error: (msg, attr) => Logger.error('App', 'Error', msg, attr),
};
```

And use it anywhere:

```ts
import { AppLog } from './logger';

AppLog.startup('Application boot complete');
```
