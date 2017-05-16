var API = "http://localhost:3001/api";

angular.module('app.controllers', [])

  .controller('listTabDefaultPageCtrl', ['$http', '$scope', '$stateParams', '$rootScope', function ($http, $scope, $stateParams, $rootScope) {
    $http({
      url: API + '/books/user/' + $rootScope.userdata.name,
      method: "GET"
    })
      .then(function (response) {
        $scope.books = response.data;
        console.log('Libros obtenidos para mi' + $scope.books)
      }, function (error) {
        console.log('Error al obtener los libros: ' + error.data);
      });
    /* $scope.getBooks = function () {
     $http({
     url: API + '/book',
     method: "GET"
     })
     .then(function (response) {
     $scope.books = response.data;
     console.log('Libros obtenidos para mi' +$scope.books)
     }, function (error) {
     console.log('Error al obtener los libros: ' + error.data);
     });

     }*/

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

  .controller('LoginCtrl', ['$scope', '$http', '$state', '$ionicPopup', '$rootScope', function ($scope, $http, $state, $ionicPopup, $rootScope, $AuthService) {
    $scope.user = {};
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
    $scope.logout = function () {
      localStorage.removeItem("fs_web_token");
      localStorage.removeItem("fs_web_userdata");
      $rootScope.userdata = {};
      $rootScope.logged = false;
    };

  }])

  .controller('SignupCtrl', ['$http', '$state', '$scope', '$rootScope', function ($http, $state, $scope, $rootScope) {
    $http({
      url: API + '/users',
      method: "GET"
    })
      .then(function (response) {
        $scope.users = response.data;
      }, function (error) {
        console.log('Error al obtener los usuarios: ' + error.data);
      });
    $scope.signup = {};
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

  .controller('AddBookCtrl', ['$http', '$state', '$scope', '$rootScope', '$ionicPopup', function ($http, $state, $scope, $rootScope, $ionicPopup) {

    $scope.newBook = {};
    $scope.newBook.propietary = $rootScope.userdata.name
    console.log('book', $scope.newBook)
    $scope.addbook = function () {
      $http({
        url: API + '/book',
        method: "POST",
        data: $scope.newBook
      })
        .then(function (response) {
          if (response.data.success == true) {
            $scope.newBook = {};
            var alertPopup = $ionicPopup.alert({
              title: 'Libro añadido',
              template: 'Libro añadido correctamente a tu biblioteca'
            })
            //$state.go("library")
          } else {
            console.log("Ha fallat la publicacio del llibre");
          }
        });
    };

  }]);
