var API = "http://localhost:3001/api";

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


.controller('LoginCtrl', ['$scope','$http','$state','$ionicPopup','$rootScope', function($scope, $http, $state, $ionicPopup, $rootScope, $AuthService) {
  $scope.user={};
  $scope.login = function () {
      $http({
          url: API + '/users/login',
          method: "POST",
          data: $scope.user

      })
          .then(function (response) {
                  if (response.data.success == true) {
                      localStorage.setItem("fs_web_token", response.data.token);
                      localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                      //console.log('user2', $scope.userdata)
                      //$mdDialog.hide();
                      $rootScope.logged = true;
                      $rootScope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));

                  } else {
                    var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });

                      $state.go('login');
                      console.log("Ha fallat l'inici de sessió");
                  }
              },
              function (error) {
                  console.log(error);
                  console.log('Error al iniciar sessio' + error);
              });
  };
  $scope.logout = function(){
      localStorage.removeItem("fs_web_token");
      localStorage.removeItem("fs_web_userdata");
      $rootScope.userdata={};
      $rootScope.logged=false;
  };

}])

.controller('SignupCtrl', ['$scope', '$http', '$state',function ($http, $state, $scope) {
    $scope.signup={};
          $scope.register = function () {
              if ($scope.signup.password2 === $scope.signup.password) {
                  $http({
                      url: API + '/users/register',
                      method: "POST",
                      data: $scope.signup
                  })
                      .then(function (response) {
                              if (response.data.success == true) {
                                  localStorage.setItem("fs_web_token", response.data.token);
                                  localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                                  $state.go("login")
                              } else {
                                  console.log("Ha fallat l'inici de sessió");
                              }
                          },
                          function (error) {
                              console.log('El correu electrònic està en ús' + error);
                          });
              }
              else {
                  console.log("Les contrasenyes no coincideixen");
              }
          };

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
