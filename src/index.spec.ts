import { describe, it, expect, vi } from 'vitest';
import { Logger } from './index';
import { LogLevel, LogOutput } from './types';

describe('Logger', () => {
    it('should log messages at or above the set log level', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Info message');
        logger.debug('Debug message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('Info message'));
        expect(output).not.toHaveBeenCalledWith(LogLevel.DEBUG, expect.stringContaining('Debug message'));
    });

    it('should format messages correctly', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('Test message'));
    });

    it('should use custom format callback if provided', () => {
        const output = vi.fn();
        const formatCallback = vi.fn((level, message) => `Custom format: ${message}`);
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output], formatCallback });

        logger.info('Test message');

        expect(formatCallback).toHaveBeenCalledWith(LogLevel.INFO, 'Test message', undefined);
        expect(output).toHaveBeenCalledWith(LogLevel.INFO, 'Custom format: Test message');
    });

    it('should log messages in JSON format if specified', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output], format: LogOutput.JSON });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('"message":"Test message"'));
    });

    it('should include additional info in the log message if provided', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message {userId}', { userId: 123 });

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('123'));
    });

    it('should not log messages below the set log level', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.WARNING, outputs: [output] });

        logger.info('Info message');
        logger.debug('Debug message');

        expect(output).not.toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('Info message'));
        expect(output).not.toHaveBeenCalledWith(LogLevel.DEBUG, expect.stringContaining('Debug message'));
    });

    it('should not use custom format callback if not provided', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('Test message'));
    });

    it('should not log messages in JSON format if not specified', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.not.stringContaining('"message":"Test message"'));
    });

    it('should not include additional info in the log message if not provided', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message', { userId: 123 });

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.not.stringContaining('"userId":123'));
    });

    it('should include prefix in the log message if provided', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output], prefix: 'PREFIX' });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('[PREFIX]'));
    });

    it('should not include prefix in the log message if not provided', () => {
        const output = vi.fn();
        const logger = new Logger({ level: LogLevel.INFO, outputs: [output] });

        logger.info('Test message');

        expect(output).toHaveBeenCalledWith(LogLevel.INFO, expect.not.stringContaining('[PREFIX]'));
    });
});
