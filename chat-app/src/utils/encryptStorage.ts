import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptedStorage = async (key: string, data: any) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const getEncryptedStorage = async (key: string) => {
  const storedData = await EncryptedStorage.getItem(key);
  return storedData ? JSON.stringify(storedData) : null;
};

const removeEncryptedStorage = async (key: string) => {
  const data = await EncryptedStorage.getItem(key);
  if (data) EncryptedStorage.removeItem(key);
};

export {setEncryptedStorage, getEncryptedStorage, removeEncryptedStorage};
