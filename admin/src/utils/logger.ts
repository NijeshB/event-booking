import winston from 'winston';

const { combine, timestamp, printf, json, prettyPrint, errors } =
  winston.format;

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: combine(
    errors({ stack: true }),
    timestamp(),
    json(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    //prettyPrint()
  ),
  defaultMeta: { service: 'admin-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
