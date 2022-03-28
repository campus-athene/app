import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.oliverrm.campus',
  appName: 'campus',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
