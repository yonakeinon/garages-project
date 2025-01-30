import axios from 'axios';
import Garage, { IGarage } from '../models/garage.model';

export const fetchAndStoreGarages = async (): Promise<IGarage[]> => {
  const apiUrl =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5';

  try {
    const response = await axios.get(apiUrl);
    const records = response.data.result.records;

    console.log('-----> Check records:', records);

    const parsedGarages: IGarage[] = records.map((record: any) => ({
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

    console.log('-----> Parsed Garages:', parsedGarages);

    await Garage.insertMany(parsedGarages, { ordered: false }).catch(() => []);

    return await Garage.find({});
  } catch (error) {
    console.error('❌ Error fetching garages:', error);
    throw new Error('Failed to fetch and store garages');
  }
};

export const getGarages = async (): Promise<IGarage[]> => {
  return await Garage.find({});
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
