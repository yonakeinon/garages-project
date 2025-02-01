import axios from 'axios';
import Garage, { IGarage } from '../models/garage.model';

export const fetchAndStoreGarages = async (): Promise<IGarage[]> => {
  const apiUrl =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=45';

  try {
    console.log('1. Starting to fetch garages from API...');
    const response = await axios.get(apiUrl);
    
    if (!response.data?.result?.records) {
      console.error('No records found in API response');
      throw new Error('Invalid API response structure');
    }

    const records = response.data.result.records;
    console.log(`2. Fetched ${records.length} records from API`);

    const allGarages: IGarage[] = records.map((record: any) => ({
      mispar_mosah: record['mispar_mosah'],
      full_name: record['shem_mosah'],
      cod_sug_mosah: record['cod_sug_mosah'],
      sug_mosah: record['sug_mosah'],
      address: record['ktovet'],
      city: record['yishuv'],
      phone: record['telephone'],
      mikud: record['mikud'],
      cod_miktzoa: record['cod_miktzoa'],
      miktzoa: record['miktzoa'],
      menahel_miktzoa: record['menahel_miktzoa'],
      rasham_havarot: record['rasham_havarot'],
    }));

    // Only store first 5 if DB is empty
    const existingCount = await Garage.countDocuments();
    if (existingCount === 0) {
      const firstFive = allGarages.slice(0, 5);
      console.log(`3. Database empty, storing first ${firstFive.length} garages`);
      await Garage.insertMany(firstFive, { ordered: false })
        .catch(err => console.log('Insert error (might be duplicates):', err.message));
    }

    console.log(`4. Returning ${allGarages.length} garages for multi-select`);
    return allGarages;
  } catch (error) {
    console.error('❌ Error in fetchAndStoreGarages:', error);
    throw error;
  }
};

// Add pagination interface
interface PaginatedGarages {
  garages: IGarage[];
  total: number;
  page: number;
  limit: number;
}

export const getGarages = async (): Promise<IGarage[]> => {
  console.log('Getting all stored garages from database...');
  const garages = await Garage.find({});
  console.log(`Found ${garages.length} garages in database`);
  return garages;
};

export const addNewGarage = async (garageData: Partial<IGarage>): Promise<IGarage> => {
    try {
      const newGarage = new Garage(garageData);
      return await newGarage.save();
    } catch (error: any) {
      console.error('❌ Error adding new garage:', error.message);
      throw new Error(error.message);
    }
  };
