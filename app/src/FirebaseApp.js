import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const firebaseConfig = {
  // Add your own keys here
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const functions = firebase.functions();
firestore.settings({
  host: 'localhost:8080',
  ssl: false
});
functions.useFunctionsEmulator('http://localhost:5001');

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableClaims: true
};

const FirebaseApp = ({ store, children }) => {
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  };

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  );
};

FirebaseApp.propTypes = {
  store: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired
};

export default FirebaseApp;
