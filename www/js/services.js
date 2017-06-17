angular.module('app.services', [])

.service('AuthService', function($q, $http, $rootScope, $ionicLoading, ApiEndpoint){
	//var LOCAL_TOKEN_KEY = 'miclavedetokens';
   var isAuthenticated = false;
   var authToken;


   function loadUserCredentials() {
     var token = window.localStorage.getItem('fs_web_token');
     if (token) {
       useCredentials(token);
     }
   }

   function storeUserCredentials(token) {
     window.localStorage.setItem('fs_web_token');
     useCredentials(token);
   }

   function useCredentials(token) {
     isAuthenticated = true;
     authToken = token;

     // Set the token as header for your requests!
     //$http.defaults.headers.common.Authorization = authToken;
     $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
     $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
   }

   function destroyUserCredentials() {
     authToken = undefined;
     isAuthenticated = false;
     $http.defaults.headers.common['X-Access-Token'] = undefined;
     $http.defaults.headers.post['X-Access-Token'] = undefined;
     window.localStorage.removeItem('fs_web_token');
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
	 isAuthenticated: function() {return isAuthenticated;}
 };
});
