import * as path from "path";
import { createLogger, format, Logger, transport, transports } from "winston";
import "winston-daily-rotate-file";
import * as winston from "winston";

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  LOG = 'log',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  FATAL = 'fatal'
}

export type LoggerConfiguration = {
  applicationName?: string,
  filePath?: string,
  logLevel?: LogLevel
}

export function loggerFactory(
  {
    applicationName = 'application',
    filePath = `/var/log/${applicationName}`,
    logLevel = LogLevel.DEBUG
  }: LoggerConfiguration = {}
): Logger {
  const loggerTransports: Array<transport> = [new transports.Console({
    level: logLevel,
  })]
  
  if (filePath) {
    const loggerFilePath: string = path.join(filePath, `${applicationName}-%DATE%.log`)
    loggerTransports.push(
      new winston.transports.DailyRotateFile({
        level: logLevel,
        filename: loggerFilePath,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '8d',
        auditFile: path.join(filePath, '.daily-rotate-audit.json')
      })
    )
  }


  const loggerFormat = format.printf(
    ({ level, message, timestamp, stack, context, metadata }) => {
      const applicationNameAndContext = context ? `${applicationName}.${context as string}` : applicationName;
      const text = `${timestamp as string} ${applicationNameAndContext} ${level.toUpperCase()} - ${message as string}`;
      return stack ? text + '\n' + (stack as string) : text;
    }
  )

  const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
      //format.colorize({ all: true }),
      format.errors({ stack: true }),
      format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'context'] }),
      format.json(),
      format.timestamp(),
      loggerFormat
    ),
    exitOnError: false
  })

  return logger
}
