import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TravelAgency',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    GoogleAuth: {
        scopes: ['profile', 'email'],
        serverClientId: '344515759200-9a0nrpa6b4i6vdl9mn50ctg7j5p92rsv.apps.googleusercontent.com',
        forceCodeForRefreshToken: true
    }
} 
};

export default config;
