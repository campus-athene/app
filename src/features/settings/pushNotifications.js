import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { log } from '../../app/errorReporting';
import { session } from '../../provider/tucan';

const platform = Capacitor.getPlatform();
const registrationType = { android: 'FCM', ios: 'APNS' }[platform];

const registrationListenerPromise = registrationType
  ? Promise.all([
      PushNotifications.addListener('registration', (token) => {
        // This is only a temoprary workaround and should be improved in the future.
        const creds = JSON.parse(localStorage.getItem('creds'));
        new session(creds).subscribePNS(token.value, registrationType);
      }),
      PushNotifications.addListener('registrationError', (err) => {
        log('warning', 'registrationError was raised.', err);
      }),
    ])
  : null;

export const setupPush = async () => {
  if (!registrationListenerPromise)
    // Platform does not support push.
    return;

  try {
    switch ((await PushNotifications.checkPermissions()).receive) {
      case 'granted':
        break;
      case 'prompt':
        if (
          (await PushNotifications.requestPermissions()).receive !== 'granted'
        )
          return;
        break;
      default:
        return;
    }

    await registrationListenerPromise;
    await PushNotifications.register();
  } catch (error) {
    log('warning', 'setupPush threw an error.', error);
  }
};
