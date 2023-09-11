import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { log } from '../../app/errorReporting';
import * as api from '../../provider/api';

const platform = Capacitor.getPlatform();
const registrationType =
  platform === 'android' ? 'FCM' : platform === 'ios' ? 'APNS' : null;

const registrationListenerPromise = registrationType
  ? Promise.all([
      PushNotifications.addListener('registration', (token) =>
        api.subscribePNS(token.value, registrationType),
      ),
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
