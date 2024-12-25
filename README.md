# mrlm-net/logz

Logging package following SysLog protocol - [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424) written in Typescipt.

| Package | `mrlm-net/logz` |
| :-- | :-- |
| NPM name | `@mrlm/logz` |
| NPM version | ![NPM Version](https://img.shields.io/npm/v/@mrlm/logz) |
| Latest version | ![GitHub Release](https://img.shields.io/github/v/release/mrlm-net/logz) |
| License | ![GitHub License](https://img.shields.io/github/license/mrlm-net/logz) |

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
- [Interfaces](#interfaces)
- [Contributing](#contributing)

## Installation

> I'm using `YARN` so examples will be using it, you can install this package via any Node Package Manager.

```shell
$ yarn add @mrlm/logz
```

## Usage

```typescript
import { Logger, LogLevel, LogOutput } from '@mrlm/logz';

const logger = new Logger({
    level: LogLevel.DEBUG,
    format: LogOutput.STRING,
    prefix: 'my-app'
});

logger.info('This is an info message');
logger.error('This is an error message', { errorCode: 123 });
```

Output:
```
[my-app] [2023-10-05T14:48:00.000Z] [INFO] This is an info message
[my-app] [2023-10-05T14:48:00.000Z] [ERROR] ["123"] This is an error message
```

## Advanced Usage

### Using Outputs

You can customize the logger to output logs to different destinations. For example, you can use the `Console` object to stream logs to a file.

```typescript
import { Logger, LogLevel, LogOutput } from '@mrlm/logz';
import { Console } from 'console';
import { createWriteStream } from 'fs';

const output = createWriteStream('./stdout.log');
const errorOutput = createWriteStream('./stderr.log');
const loggerConsole = new Console({ stdout: output, stderr: errorOutput });

const logger = new Logger({
    level: LogLevel.DEBUG,
    format: LogOutput.STRING,
    outputs: [
        (level, message) => {
            if (level <= LogLevel.ERROR) {
                loggerConsole.error(message);
            } else {
                loggerConsole.log(message);
            }
        }
    ],
    prefix: 'my-app'
});

logger.info('This is an info message');
logger.error('This is an error message', { errorCode: 123 });
```

Output in `stdout.log`:
```
[my-app] [2023-10-05T14:48:00.000Z] [INFO] This is an info message
```

Output in `stderr.log`:
```
[my-app] [2023-10-05T14:48:00.000Z] [ERROR] ["123"] This is an error message
```

## Interfaces

### LogLevel

```typescript
export enum LogLevel {
    EMERGENCY = 0,
    ALERT = 1,
    CRITICAL = 2,
    ERROR = 3,
    WARNING = 4,
    NOTICE = 5,
    INFO = 6,
    DEBUG = 7
}
```

### LogOutput

```typescript
export enum LogOutput {
    STRING = "string",
    JSON = "json"
}
```

### LogOptions

```typescript
export interface LogOptions {
    level?: LogLevel;
    format?: LogOutput;
    formatCallback?: (level: LogLevel, message: string, additionalInfo?: object) => string;
    outputs?: Array<(level: LogLevel, message: string) => void>;
    prefix?: string;
}
```

### ILogger

```typescript
export interface ILogger {
    log(level: LogLevel, message: string, additionalInfo?: object): void;
    emergency(message: string, additionalInfo?: object): void;
    alert(message: string, additionalInfo?: object): void;
    critical(message: string, additionalInfo?: object): void;
    error(message: string, additionalInfo?: object): void;
    warning(message: string, additionalInfo?: object): void;
    notice(message: string, additionalInfo?: object): void;
    info(message: string, additionalInfo?: object): void;
    debug(message: string, additionalInfo?: object): void;
}
```

## Contributing

_Contributions are welcomed and must follow [Code of Conduct](https://github.com/mrlm-net/logz?tab=coc-ov-file) and common [Contributions guidelines](https://github.com/mrlm-net/.github/blob/main/docs/CONTRIBUTING.md)._

> If you'd like to report security issue please follow [security guidelines](https://github.com/mrlm-net/logz?tab=security-ov-file).

---
<sup><sub>_All rights reserved &copy; Martin Hrášek [<@marley-ma>](https://github.com/marley-ma) and WANTED.solutions s.r.o. [<@wanted-solutions>](https://github.com/wanted-solutions)_</sub></sup>