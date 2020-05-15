const admin = require('firebase-admin');
const functions = require('firebase-functions');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const cors = require('cors')

class InvalidFieldError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.type = 'InvalidFieldError';
  }
}

exports.createUser = functions.https.onRequest(async (request, response) => {
  return cors(request, response, async () => {
    try {
      const data = JSON.parse(request.body);

      if (!data.email) {
        throw new InvalidFieldError('email should be provided');
      }

      if (!data.password) {
        throw new InvalidFieldError('password should be provided');
      }

      if (data.password.length < 6) {
        throw new InvalidFieldError('The password must be a string with at least 6 characters.');
      }

      // Delete password from data so we dont store it
      const password = data.password;
      delete data.password;

      data.createdAt = FieldValue.serverTimestamp();

      const userCreationRequest = {
        userDetails: data,
        status: 'pending'
      };

      const userCreationRequestRef = await admin.firestore()
        .collection('userCreationRequests')
        .add(userCreationRequest);

      const newUser = {
        email: data.email,
        emailVerified: false,
        password: password,
        displayName: `${data.firstName} ${data.lastName}`,
        disabled: false
      };

      const user = await admin.auth().createUser(newUser);

      await userCreationRequestRef.update({ status: 'Treated' });

      response.status(200).send({ ...user })
    } catch (error) {
      if (error.type === 'UnauthenticatedError') {
        throw new functions.https.HttpsError('unauthenticated', error.message);
      } else if (error.type === 'NotPermissionError' || error.type === 'InvalidRoleError') {
        throw new functions.https.HttpsError('failed-precondition', error.message);
      } else {
        throw new functions.https.HttpsError('internal', error.message);
      }
    }
  });
});
