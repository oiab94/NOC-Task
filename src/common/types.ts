/**
 * LOG TYPES
 */
export type LogSeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt: Date;
  origin: string;
}

export interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

/**
 * EMAIL TYPES
 */
export interface Attachement {
  filename: string;
  path: string;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];

}
export interface EmailServiceUseCase {
  sendMail( options: SendMailOptions ): Promise<boolean>;
}

//  * LOGGER TYPES

/**
 * object | number | string
 */
export type LoggerType = object | number | string;

export interface LoggerInterface {
  info: ( message: LoggerType ) => void;
  error: ( message: LoggerType ) => void;
  warn: ( message: LoggerType ) => void;
  debug: ( message: LoggerType ) => void;
}