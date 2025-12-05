import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de Logging
 * Registra información relevante de cada solicitud:
 * - Timestamp
 * - Método HTTP
 * - Endpoint
 * - Estado de respuesta
 * - Tiempo de ejecución
 */
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Capturamos el evento 'finish' para obtener el status code después de que la respuesta se envíe
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    
    // Colores para la consola según el status
    let statusColor = '\x1b[32m'; // Verde para 2xx
    if (statusCode >= 400 && statusCode < 500) {
      statusColor = '\x1b[33m'; // Amarillo para 4xx
    } else if (statusCode >= 500) {
      statusColor = '\x1b[31m'; // Rojo para 5xx
    }
    const resetColor = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} - ${statusColor}${statusCode}${resetColor} - ${duration}ms`
    );
  });

  next();
};
