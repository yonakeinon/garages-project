import { Router, Request, Response } from 'express';
import { fetchAndStoreGarages, getAllGarages } from '../services/garage.service';

const router = Router();

router.get('/fetch', async (req: Request, res: Response) => {
  try {
    const garages = await fetchAndStoreGarages();
    res.json(garages);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch and store garages' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const garages = await getAllGarages();
    res.json(garages);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to get garages' });
  }
});

export default router;
