import { ZodError } from 'zod';

export function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Invalid data',
          details: error.errors.map(e => ({
            message: `${e.path.join('.')} ${e.message}`,
          })),
        });
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}