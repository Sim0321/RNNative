import database from '@react-native-firebase/database';
import {RestaurantInfo} from '../model/Model';

const DB_REF = '/restaurant';

export const saveNewRestaurant = async ({
  title,
  address,
  latitude,
  longitude,
}: RestaurantInfo) => {
  const db = database().ref(DB_REF);
  console.log(db);
  const saveItem = {
    title,
    address,
    latitude,
    longitude,
  };

  // console.log('saveItem:: ', saveItem);

  // 데이터 저장 시도
  await db.push().set({
    ...saveItem,
  });
};

export const getRestaurantList = async (): Promise<RestaurantInfo[]> => {
  const db = database().ref(DB_REF);
  const snapshotValue = await db.once('value').then(snapshot => snapshot.val());
  console.log(Object.keys(snapshotValue).map(key => snapshotValue[key]));

  return Object.keys(snapshotValue).map(key => snapshotValue[key]);
};
