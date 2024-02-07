const prodConfig = {
  apiKey: 'AIzaSyDZY5kH8rKQsgkPalQ5NiFWwqWiyACEwsM',
  authDomain: 'fleetcargo-2e197.firebaseapp.com',
  databaseURL: 'https://fleetcargo-2e197-default-rtdb.firebaseio.com',
  projectId: 'fleetcargo-2e197',
  storageBucket: 'fleetcargo-2e197.appspot.com',
  messagingSenderId: '755549828580',
  appId: '1:755549828580:web:64841aad0f46a1630483f1',
  measurementId: 'G-LV55GF29PS'
};
const devConfig = {
  apiKey: 'AIzaSyDZY5kH8rKQsgkPalQ5NiFWwqWiyACEwsM',
  authDomain: 'fleetcargo-2e197.firebaseapp.com',
  databaseURL: 'https://fleetcargo-2e197-default-rtdb.firebaseio.com',
  projectId: 'fleetcargo-2e197',
  storageBucket: 'fleetcargo-2e197.appspot.com',
  messagingSenderId: '755549828580',
  appId: '1:755549828580:web:64841aad0f46a1630483f1',
  measurementId: 'G-LV55GF29PS'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
