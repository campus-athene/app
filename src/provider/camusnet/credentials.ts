import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { UserNotLoggedInError } from '.';

const localStorageKey = 'campusNetCreds';
const key = 'campusnet-credentials';

type CampusNetCreds = { username: string; password: string };

export const getCredentials = async (): Promise<CampusNetCreds> => {
  const ssp = (await SecureStoragePlugin.keys()).value.includes(key)
    ? await SecureStoragePlugin.get({ key })
    : null;

  const ls = localStorage.getItem(localStorageKey);

  if (!ssp && ls)
    // Migrate from localStorage to SecureStoragePlugin
    await SecureStoragePlugin.set({ key, value: ls });

  if (ls) localStorage.removeItem(localStorageKey);

  const json = ssp?.value ?? ls;
  if (!json) throw new UserNotLoggedInError();

  const creds: CampusNetCreds = JSON.parse(json);
  return creds;
};

export const setCredentials = async (creds: CampusNetCreds) => {
  await SecureStoragePlugin.set({ key, value: JSON.stringify(creds) });
};

export const removeCredentials = async () => {
  await SecureStoragePlugin.remove({ key });
};
