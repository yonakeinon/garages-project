import express from 'express';
import { fetchAndStoreGarages, addNewGarage, getGarages } from '../services/garage.service';
import { validateGarage } from '../middleware/validateGarage';

const router = express.Router();

router.get('/fetch', async (req, res) => {
  try {
    const allGarages = await fetchAndStoreGarages();
    console.log('Fetch endpoint returning garages:', allGarages.length);
    res.json(allGarages);
  } catch (error) {
    console.error('Error in fetch endpoint:', error);
    res.status(500).json({ message: 'Error fetching garages', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const garages = await getGarages();
    res.json(garages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving garages', error });
  }
});

router.post('/add', validateGarage, async (req, res) => {
  try {
    const newGarage = await addNewGarage(req.body);
    res.status(201).json(newGarage);
  } catch (error) {
    res.status(500).json({ message: 'Error adding garage', error });
  }
});

export default router;
