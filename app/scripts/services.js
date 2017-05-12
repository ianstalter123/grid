'use strict';

angular
  .module('services', [])

.factory('JoyDB', function(FirebaseConfig) {
  firebase.initializeApp(FirebaseConfig.config);
  return firebase.database()
    .ref();
});
