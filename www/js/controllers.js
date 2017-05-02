var API = "http://localhost:3001/api/";

angular.module('app.controllers', [])

.controller('listTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('chatTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mapTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('bOOK2SHARECtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
}])
/*.controller('bOOK2SHARECtrl', ['$scope', '$stateParams', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  }); */

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

 /*  $scope.login = function() {

    $http({
      url: API + 'users/login',
      method: "POST",
      data: $scope.newUser
    })
      .then(function (response) {
          // success
          if (response.data.success == true) {
            localStorage.setItem("fs_app_token", response.data.token);
            localStorage.setItem("fs_app_userdata", JSON.stringify(response.data.user));
            window.location.reload();
          }
        },
        function (response) { // optional
          // failed
          $ionicLoading.show({template: 'Ha fallat l\' inici de sessió', noBackdrop: true, duration: 2000});
        });
  }

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
}]) */

/*.controller('loginCtrl', ['$scope', '$stateParams', function ($scope, $http, $rootScope, $state, AuthService) {
  ionic.Platform.ready(function(){

    	});

    	$scope.login = function() {

        $http({
            url: API + 'users/login',
            method: "POST",
            data: $scope.actualUser

        })
    		console.info('Authentication...');
    		AuthService.login($scope.email,$scope.password);

    		setTimeout(function() {
  			if($scope.token) {
  				console.info('Successfully logged in...');
  				$state.go('profile');
  			}
  		}, 2000);

    	}
}])*/

.controller('LoginCtrl', ['$scope', '$stateParams', function($scope, $state, $ionicPopup, AuthService) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
}])

.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.registra = function() {
    $http({
      url: API + 'users/register',
      method: "POST",
      data: $scope.newUser
    })
      .then(function (response) {
          // success
          if (response.data.success == true) {
            localStorage.setItem("fs_app_token", response.data.token);
            localStorage.setItem("fs_app_userdata", JSON.stringify(response.data.user));
            window.location.reload();
          }
        },
        function (response) { // optional
          // failed
          $ionicLoading.show({template: 'Ha fallat el registre', noBackdrop: true, duration: 2000});
        });
  }

}])

/*.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function() {
    $http.get('http://localhost:3001/valid').then(
      function(result) {
        $scope.response = result;
      });
  };

  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:3001/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:3001/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
});*/
