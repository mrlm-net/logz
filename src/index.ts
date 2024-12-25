import { 
    ILogger, 
    LogLevel, 
    LogOptions, 
    LogOutput 
} from "./types";

export class Logger implements ILogger {
    private level: LogLevel;
    private format: LogOutput;
    private formatCallback?: (level: LogLevel, message: string, additionalInfo?: object) => string;
    private outputs: Array<(level: LogLevel, message: string) => void>;
    private prefix?: string;
    
    constructor(options: LogOptions) {
        this.level = options.level || LogLevel.INFO;
        this.format = options.format || LogOutput.STRING;
        this.formatCallback = options.formatCallback;
        this.outputs = options.outputs || [
            (level, message) => console.log(level, message)
        ];
        this.prefix = options.prefix;
    }

    private formatMessage(level: LogLevel, message: string, additionalInfo?: object): string {
        if (this.formatCallback) {
            return this.formatCallback(level, message, additionalInfo);
        }

        const timestamp = new Date().toISOString();
        const logLevel = LogLevel[level];

        let baseMessage = (this.prefix) 
            ? `[${this.prefix}] [${timestamp}] [${logLevel}]` 
            : `[${timestamp}] [${logLevel}]`;

        if (this.format === LogOutput.JSON) {
            return JSON.stringify({ timestamp, level: logLevel, message, ...additionalInfo });
        }

        if (additionalInfo) {
            baseMessage += ` ${JSON.stringify(Object.values(additionalInfo))}`;
        }

        return `${baseMessage} ${message}`;
    }

    private shouldLog(level: LogLevel): boolean {
        return level <= this.level;
    }

    private outputMessage(level: LogLevel, message: string) {
        this.outputs.forEach(output => output(level, message));
    }

    log(level: LogLevel, message: string, additionalInfo?: object) {
        if (this.shouldLog(level)) {
            this.outputMessage(level, this.formatMessage(level, message, additionalInfo));
        }
    }

    emergency(message: string, additionalInfo?: object) {
        this.log(LogLevel.EMERGENCY, message, additionalInfo);
    }

    alert(message: string, additionalInfo?: object) {
        this.log(LogLevel.ALERT, message, additionalInfo);
    }

    critical(message: string, additionalInfo?: object) {
        this.log(LogLevel.CRITICAL, message, additionalInfo);
    }

    error(message: string, additionalInfo?: object) {
        this.log(LogLevel.ERROR, message, additionalInfo);
    }

    warning(message: string, additionalInfo?: object) {
        this.log(LogLevel.WARNING, message, additionalInfo);
    }

    notice(message: string, additionalInfo?: object) {
        this.log(LogLevel.NOTICE, message, additionalInfo);
    }

    info(message: string, additionalInfo?: object) {
        this.log(LogLevel.INFO, message, additionalInfo);
    }

    debug(message: string, additionalInfo?: object) {
        this.log(LogLevel.DEBUG, message, additionalInfo);
    }
}
