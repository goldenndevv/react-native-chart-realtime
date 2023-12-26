import { RSA, type KeyPair } from 'react-native-rsa-native';

export const generateKeyPair = async (): Promise<KeyPair> => {
  const valueKeys = await RSA.generateKeys(2048);
  return valueKeys;
};
export const encryptMessage = async (
  plaintext: string,
  publicKeyArmored: string
) => {
  try {
    const encrypted = await RSA.encrypt(plaintext, publicKeyArmored);
    return encrypted;
  } catch (error) {
    console.error('Error encrypting message:', error);
    return error?.toString() || '';
  }
};
export const decryptMessage = async (
  encryptedMessage: string,
  privateKeyArmored: string
) => {
  try {
    const decrypted = await RSA.decrypt(encryptedMessage, privateKeyArmored);

    return decrypted;
  } catch (error) {
    console.error('Error decrypting message:', error);
    return error?.toString() || '';
  }
};
