const prodConfig = {
  apiKey: "AIzaSyDzCY3ib1dmqs5GdCr0BLphYn3_Uas9oEE",
  authDomain: "cargo-fleet-542c2.firebaseapp.com",
  databaseURL: "https://cargo-fleet-542c2-default-rtdb.firebaseio.com",
  projectId: "cargo-fleet-542c2",
  storageBucket: "cargo-fleet-542c2.appspot.com",
  messagingSenderId: "1092641946874",
  appId: "1:1092641946874:web:6ac3c7828ee58f73751d43",
  measurementId: "G-W7582CGKDL"
};
const devConfig = {
  apiKey: "AIzaSyDzCY3ib1dmqs5GdCr0BLphYn3_Uas9oEE",
  authDomain: "cargo-fleet-542c2.firebaseapp.com",
  databaseURL: "https://cargo-fleet-542c2-default-rtdb.firebaseio.com",
  projectId: "cargo-fleet-542c2",
  storageBucket: "cargo-fleet-542c2.appspot.com",
  messagingSenderId: "1092641946874",
  appId: "1:1092641946874:web:6ac3c7828ee58f73751d43",
  measurementId: "G-W7582CGKDL"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;