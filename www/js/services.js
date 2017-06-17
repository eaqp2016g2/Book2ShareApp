angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

/*.service('AuthService', function($q, $http, $rootScope, $ionicLoading, ApiEndpoint){
	var LOCAL_TOKEN_KEY = 'miclavedetokens';
   var isAuthenticated = false;
   var authToken;


   function loadUserCredentials() {
     var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
     if (token) {
       useCredentials(token);
     }
   }

   function storeUserCredentials(token) {
     window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
     useCredentials(token);
   }

   function useCredentials(token) {
     isAuthenticated = true;
     authToken = token;

     // Set the token as header for your requests!
     $http.defaults.headers.common.Authorization = authToken;
   }

   function destroyUserCredentials() {
     authToken = undefined;
     isAuthenticated = false;
     $http.defaults.headers.common.Authorization = undefined;
     window.localStorage.removeItem(LOCAL_TOKEN_KEY);
   }
	 var login = function(user) {
	 return $q(function(resolve, reject) {
		 $http.post(ApiEndpoint.url + '/authenticate', user).then(function(result) {
			 if (result.data.success) {
				 storeUserCredentials(result.data.token);
				 resolve(result.data.msg);
			 } else {
				 reject(result.data.msg);
			 }
		 });
	 });
 };

 var logout = function() {
	 destroyUserCredentials();
 };

 loadUserCredentials();

 return {
	 login: login,
	 register: register,
	 logout: logout,
	 isAuthenticated: function() {return isAuthenticated;},
 };
});*/
