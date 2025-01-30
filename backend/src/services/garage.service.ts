import axios from 'axios';
import Garage, { IGarage } from '../models/garage.model';


export const fetchAndStoreGarages = async (): Promise<IGarage[]> => {
  const apiUrl =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5';

  try {
    const response = await axios.get(apiUrl);
    const records = response.data.result.records;

 
    const parsedGarages: IGarage[] = records.map((record: any) => ({
      full_name: record['שם מוסך'],
      address: record['כתובת'],
      city: record['ישוב'],
      phone: record['טלפון'],
    }));

    
    await Garage.insertMany(parsedGarages, { ordered: false }).catch(() => []);

    return await Garage.find({});
  } catch (error) {
    console.error('Error fetching garages:', error);
    throw new Error('Failed to fetch and store garages');
  }
};

/**
 * Get all garages from the database
 */
export const getAllGarages = async (): Promise<IGarage[]> => {
  return await Garage.find({});
};
