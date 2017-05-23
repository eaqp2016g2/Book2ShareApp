var API = "http://localhost:3001/api";

angular.module('app.controllers', [])

.controller('listTabDefaultPageCtrl', ['$http','$scope', '$stateParams', '$rootScope', '$ionicPopup','$state', function ($http, $scope, $stateParams, $rootScope, $ionicPopup, $state) {
  $http({

      url: API + '/books/user/' + $rootScope.userdata.name,
      method: "GET"
    })
      .then(function (response) {

            $scope.books = response.data;
            $rootScope.book = JSON.parse(localStorage.getItem("fs_web_book"));
            console.log('Libros obtenidos para mi ' + $rootScope.book)
        }, function (error) {
      console.log('Error al obtener los libros: ' + error.data);
          });
      $scope.getBooks = function () {
          $http({
              url: API + '/book',
              method: "GET"
          })
          .then(function (response) {
                $scope.books = response.data;
                console.log('Libros obtenidos para mi' + $rootScope.books)
            }, function (error) {
          console.log('Error al obtener los libros: ' + error.data);
        });
      }
      $scope.deleteBooks = function (book) {
        console.log('' + book._id)
          $http({
              url: API + '/book/' + book._id,
              method: "DELETE"
          })
          .then(function (response) {
                console.log('Libro eliminado' +$scope.books)
                var alertPopup = $ionicPopup.alert({
                  title: 'ELIMINADO',
                  template: 'El libro ha sido eliminado!'
                });
              $state.go("tabsController.listTabDefaultPage")
            }, function (error) {
          console.log('Error al eliminar el libro: ' + error.data);
        });
      }
  $scope.searchBook = function (book) {
  $rootScope.booksel=book;
  console.log("libro sel " + book + "******" + book._id);
  $state.go("bookinfo")
}
}])

.controller('bookInfoCtrl', ['$scope', '$stateParams','$rootScope','$state', function ($scope, $stateParams, $rootScope, $state) {

  $scope.book = $rootScope.booksel;
  $rootScope.booksel = {};
    console.log("libro sel " +  "****** este " + $scope.book._id);

   $scope.SelectBook = function (book) {
   $rootScope.booksel=book;
    console.log("libro sel " + book + "******" + book._id);
    $state.go("editbook")
  }

}])

.controller('chatTabDefaultPageCtrl', ['$scope', '$stateParams', function ($scope, $stateParams, Chats) {
  /*  $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
  };*/
    }])
.controller('chatDetailCtrl', ['$scope', '$stateParams', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
      }])

.controller('editBookCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', function ($scope, $stateParams, $rootScope, $http, $ionicPopup) {
  $scope.book = $rootScope.booksel;
  $rootScope.booksel = {};
        console.log("libro sel ****** para editar " + $scope.book._id);
    $scope.editbook = function (booksel) {

            $http({
                url: API + '/book/' + $scope.book._id,
                method: "PUT",
                data: $scope.book
            })
            .then(function (response) {
                    if (response.data.success == true) {
                      console.log("libro sel editadooooo");
                        $scope.book={};
                        var alertPopup = $ionicPopup.alert({
                          title: 'Libro Actualizado',
                          template: 'Libro actualizado correctamente'
                        })
                        $state.go("tabsController.listTabDefaultPage")
                    } else {
                        console.log("Ha fallat la edicio del llibre");
                    }
            });
    };
}])

.controller('homeTabDefaultPageCtrl', ['$scope', '$stateParams', '$http', '$rootScope', function ($scope, $stateParams, $http, $rootScope) {
     $http({
          url: API + '/book',
          method: "GET"
      })
      .then(function (response) {
            $scope.books = response.data;
            $rootScope.book = JSON.parse(localStorage.getItem("fs_web_book"));
            console.log('Libros obtenidos para mi' + $rootScope.books)
        }, function (error) {
      console.log('Error al obtener los libros: ' + error.data);
    });
    $scope.SearchBook = function(){
    console.log("Buscando Libro *****  " + this.titleBook);
      $http({
                   url: API + '/book/search/title/' + this.titleBook,
                   method: "GET",
                   data: $scope.titleBook
               })
                   .then(function (response) {
                           if (response.data != null) {
                               $rootScope.title={};
                               $scope.books = response.data;
                               //$state.go("library")
                           } else {
                               console.log("No hi ha cap llibre");
                           }
                       });
    }
}])

.controller('mapTabDefaultPageCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', function ($scope, $stateParams, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });

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
      $rootScope.userdata={};
      $rootScope.logged=false;
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
          });
        }
      }
}])

.controller('AddBookCtrl', [ '$http', '$state','$scope', '$rootScope', '$ionicPopup', function ($http, $state, $scope, $rootScope, $ionicPopup) {

          $scope.newBook={};
          $scope.newBook.propietary=$rootScope.userdata.name
          console.log('book', $scope.newBook)
          $scope.addbook = function () {
                  $http({
                      url: API + '/book',
                      method: "POST",
                      data: $scope.newBook
                  })
                  .then(function (response) {
                          if (response.data.success == true) {
                              $scope.newBook={};
                              var alertPopup = $ionicPopup.alert({
                                title: 'Libro añadido',
                                template: 'Libro añadido correctamente a tu biblioteca'
                              })
                              $state.go("tabsController.listTabDefaultPage")
                          } else {
                              console.log("Ha fallat la publicacio del llibre");
                          }
                  });
          };
}])
