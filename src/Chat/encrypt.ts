import { RSA, type KeyPair } from 'react-native-rsa-native';

export const generateKeyPair = async (): Promise<KeyPair> => {
  const valueKeys = await RSA.generateKeys(2048);
  return valueKeys;
};
export const encryptString = async (
  publicKeyArmored: string,
  plaintext: string
) => {
  try {
    const encrypted = await RSA.encrypt(plaintext, publicKeyArmored);
    return encrypted;
  } catch (error) {
    console.error('Error encrypting message:', error);
    return error?.toString() || '';
  }
};
export const decryptString = async (
  privateKeyArmored: string,
  encryptedMessage: string
) => {
  try {
    const decrypted = await RSA.decrypt(encryptedMessage, privateKeyArmored);

    return decrypted;
  } catch (error) {
    console.error('Error decrypting message:', error);
    return error?.toString() || '';
  }
};
