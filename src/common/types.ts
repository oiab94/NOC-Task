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