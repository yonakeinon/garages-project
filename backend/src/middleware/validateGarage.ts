import { Request, Response, NextFunction } from 'express';

export const validateGarage = (req: Request, res: Response, next: NextFunction): void => {
  const { mispar_mosah, full_name, address, city, phone, mikud, rasham_havarot } = req.body;

  if (!mispar_mosah || !full_name || !address || !city || !phone) {
    res.status(400).json({
      message: 'Missing required fields: mispar_mosah, full_name, address, city, phone',
    });
    return; 
  }

  if (typeof mispar_mosah !== 'number') {
    res.status(400).json({ message: 'mispar_mosah must be a number' });
    return;
  }
  if (typeof phone !== 'string' || !/^[0-9-]+$/.test(phone)) {
    res.status(400).json({ message: 'Invalid phone number format' });
    return;
  }
  if (mikud && typeof mikud !== 'number') {
    res.status(400).json({ message: 'mikud must be a number' });
    return;
  }
  if (rasham_havarot && typeof rasham_havarot !== 'number') {
    res.status(400).json({ message: 'rasham_havarot must be a number' });
    return;
  }

  next();
};
