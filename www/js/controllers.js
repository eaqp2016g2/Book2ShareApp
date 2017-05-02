var API = "http://localhost:3001/api/"

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

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.login = function() {

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
