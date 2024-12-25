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

export enum LogOutput {
    STRING = "string",
    JSON = "json"
}

export interface LogOptions {
    level?: LogLevel;
    format?: LogOutput;
    formatCallback?: (level: LogLevel, message: string, additionalInfo?: object) => string;
    outputs?: Array<(level: LogLevel, message: string) => void>;
    prefix?: string;
}

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