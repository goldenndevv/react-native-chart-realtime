import OpenPGP, { type KeyPair } from 'react-native-fast-openpgp';
interface inputGenerateKeyPair {
  userId: string;
  passphrase?: string;
  email: string;
}
export const generateKeyPair = async (
  data: inputGenerateKeyPair
): Promise<KeyPair> => {
  const valueKeys = await OpenPGP.generate({
    email: data.email,
    name: data.userId,
    passphrase: data?.passphrase, // Optional passphrase for private key
  });
  return valueKeys;
};
export const encryptMessage = async (
  plaintext: string,
  publicKeyArmored: string
) => {
  try {
    const encrypted = await OpenPGP.encrypt(plaintext, publicKeyArmored);
    return encrypted;
  } catch (error) {
    console.error('Error encrypting message:', error);
    return error?.toString() || '';
  }
};
export const decryptMessage = async (
  encryptedMessage: string,
  privateKeyArmored: string,
  passphrase?: string
) => {
  try {
    const decrypted = await OpenPGP.decrypt(
      encryptedMessage,
      privateKeyArmored,
      passphrase || ''
    );

    return decrypted;
  } catch (error) {
    console.error('Error decrypting message:', error);
    return error?.toString() || '';
  }
};
