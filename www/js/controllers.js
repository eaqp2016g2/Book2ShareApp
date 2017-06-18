var API = "http://localhost:3001/api";

angular.module('app.controllers', ['angular.filter'])

  .controller('listTabDefaultPageCtrl', ['$http', '$scope', '$stateParams', '$rootScope', '$ionicPopup', '$state', function ($http, $scope, $stateParams, $rootScope, $ionicPopup, $state) {

    /// MI BIBLIOTECA

    $rootScope.booksel = {};
    $scope.users = {};

    $http.get(API + '/users')
      .then(function (response) {
        $scope.users = response.data;
      }, function (error) {
        console.log('Error al obtener los usuarios: ' + error.data);
    });

    $http({
      url: API + '/books/user/' + $rootScope.userdata._id,
      method: "GET"
    })
      .then(function (response) {
        $scope.books = response.data;
        //$rootScope.book = JSON.parse(localStorage.getItem("fs_web_book"));
        console.log('Libros obtenidos para mi ' + $scope.books)
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
          console.log('Libros obtenidos para mi' + $scope.books)
        }, function (error) {
          console.log('Error al obtener los libros: ' + error.data);
        });
    };

    $scope.deleteBooks = function (book) {
      console.log('' + book._id);
      $http({
        url: API + '/book/' + book._id,
        method: "DELETE"
      })
        .then(function (response) {
          console.log('Libro eliminado' + $scope.books);
          var alertPopup = $ionicPopup.alert({
            title: 'ELIMINADO',
            template: 'El libro ha sido eliminado!'
          });
          $state.go("tabsController.listTabDefaultPage")
        }, function (error) {
          console.log('Error al eliminar el libro: ' + error.data);
        });
    };

    $scope.searchBook = function (book) {
      console.log(book);
      $rootScope.booksel = book;
      console.log("libro sel " + book.title + "******" + book._id);
      $state.go("bookinfo")
    }
  }])

  .controller('bookInfoCtrl', ['$http', '$scope', '$stateParams', '$rootScope', '$state', function ($http, $scope, $stateParams, $rootScope, $state) {

    /// INFORMACIÓN DE LIBRO

    $scope.users = {};
    $scope.book = {};

    $http.get(API + '/users')
      .then(function (response) {
        $scope.users = response.data;
      }, function (error) {
        console.log('Error al obtener los usuarios: ' + error.data);
      });

    console.log($rootScope.booksel);

    $http.get(API + '/book/' + $rootScope.booksel._id)
      .then(function (response) {
        $scope.book = response.data;
      }, function (error) {
        console.log('Error al obtener el libro: ' + error.data);
      });

    //$scope.book = $rootScope.booksel;
    console.log($scope.book);
    //$rootScope.booksel = {};


    $scope.SelectBook = function (book) {
      $rootScope.booksel = book;
      console.log("libro sel " + book.title + "******" + book._id);
      $state.go("editbook")
    }

  }])

  .controller('chatTabDefaultPageCtrl', ['$http','$scope', '$stateParams','$state','$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

            $scope.check = function(user){
                if(user._id===$rootScope.userdata._id){
                    return true;
                }
                else{
                    return false;
                }
            }

            var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
            $scope.conversations = userdata.conversations;

            $scope.refreshConversations = function(user_id){
                $http.get(API +'/conversations/' + user_id)
                    .then(function(response) {
                        localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                        userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
                        $scope.conversations = userdata.conversations;
                    }, function (error){
                        console.log('Error al obtener el usuario: ' + error.data);
                    });
            };

            $scope.showComposer = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'composer.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };
            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }

            console.log(userdata.conversations[0]);
          //  $scope.finestraxat;
            $scope.destinatari;

            // Obtener todos los usuarios
            $http.get(API +'/users')
                .then(function(response) {
                    $scope.users = response.data;
                    if(userdata.conversations[0] !== undefined) {
                        console.log("Conversations not null");
                        //$scope.finestraxat=true;
                        $scope.getMessages(userdata.conversations[0]);
                    }
                    else{
                        console.log("Conversations null");
                        $scope.finestraxat=false;
                    }
                }, function (error){
                    console.log('Error al obtener los usuarios: ' + error.data);
                });
            // Seleccionar conversa
            $scope.selectConversation = function (user) {
                    $scope.selected = true;
                    console.log(user._id);
                    $scope.getMessages(user._id);
                    console.log("usuario " + user._id + "******" + user.name);
                    console.log($scope.selected);
                  //  $state.go("chatDetail");
            };

            // Obtener todos los mensajes de un usuario determinado
            $scope.conversation = {};
            $scope.conversation2 = {};

            $scope.getMessages = function (user_id) {
                $http.get(API + '/msg/' + user_id)
                    .then(function (response) {
                        $scope.conversation = response.data;
                        $scope.conversation2 = orderMessages($scope.conversation, user_id);
                    }, function (error) {
                        console.log('Error al obtener los mensajes: ' + error.data);
                    });

                function orderMessages(conversation, user) {
                    conversation.user = user;

                    for (var message of conversation) {
                        if (message.userA === userdata._id) {
                            message.send = "message sent";
                            if(message.read === true){
                                message.tick= "../img/msg-dblcheck-ack.svg";
                            }
                            else{
                                if(message.delivered === true){
                                    message.tick = "../img/msg-dblcheck.svg";
                                }
                                else{
                                    message.tick = "../img/msg-check.svg";
                                }
                            }
                        }
                        else {
                            message.send = "message received";
                        }
                    }
                    return conversation;
                }
                return $scope.conversation2;
            };

            $scope.newMessage={};

            $scope.sendMessage = function (destinatari) {
                if (($scope.newMessage.content != "") && ($scope.newMessage.content)) {
                    //$scope.newMessage.userA = userdata._id;
                    $scope.newMessage.userB = destinatari;
                    $http({
                        url: API + '/msg',
                        method: "POST",
                        data: $scope.newMessage
                    })
                        .then(function (data) {
                                console.log(data);
                                $scope.newMessage = {};
                                $scope.refreshConversations(userdata._id);
                                $scope.getMessages(destinatari);
                            },
                            function () {
                 //               toastr.error('Error a l\'enviar el missatge');
                            });
                }
                $mdDialog.cancel();
            };
  }])
  /*.controller('chatDetailCtrl', ['$http','$scope', '$stateParams','$state','$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {
    var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
    $scope.conversations = userdata.conversations;
                // Obtener todos los usuarios
                $http.get(API +'/users')
                    .then(function(response) {
                        $scope.users = response.data;
                        if(userdata.conversations[0] !== undefined) {
                            console.log("Conversations not null");
                            //$scope.finestraxat=true;
                            $scope.getMessages(userdata.conversations[0]);
                        }
                        else{
                            console.log("Conversations null");
                            $scope.finestraxat=false;
                        }
                    }, function (error){
                        console.log('Error al obtener los usuarios: ' + error.data);
                    });
                // Seleccionar conversa
                $scope.selectConversation = function (user) {
                        $scope.selected = true;
                        console.log(user._id);
                        $scope.getMessages(user._id);
                        console.log("usuario " + user._id + "******" + user.name);
                        console.log($scope.selected);
                        $state.go("chatDetail");
                };

    // Obtener todos los mensajes de un usuario determinado
    $scope.conversation = {};
    $scope.conversation2 = {};

    $scope.getMessages = function (user_id) {
        $http.get(API + '/msg/' + user_id)
            .then(function (response) {
                $scope.conversation = response.data;
                $scope.conversation2 = orderMessages($scope.conversation, user_id);
            }, function (error) {
                console.log('Error al obtener los mensajes: ' + error.data);
            });

        function orderMessages(conversation, user) {
            conversation.user = user;

            for (var message of conversation) {
                if (message.userA === userdata._id) {
                    message.send = "message sent";
                    if(message.read === true){
                        message.tick= "../img/msg-dblcheck-ack.svg";
                    }
                    else{
                        if(message.delivered === true){
                            message.tick = "../img/msg-dblcheck.svg";
                        }
                        else{
                            message.tick = "../img/msg-check.svg";
                        }
                    }
                }
                else {
                    message.send = "message received";
                }
            }
            return conversation;
        }
        return $scope.conversation2;
    };

    $scope.newMessage={};

    $scope.sendMessage = function (destinatari) {
        if (($scope.newMessage.content != "") && ($scope.newMessage.content)) {
            //$scope.newMessage.userA = userdata._id;
            $scope.newMessage.userB = destinatari;
            $http({
                url: API + '/msg',
                method: "POST",
                data: $scope.newMessage
            })
                .then(function (data) {
                        console.log(data);
                        $scope.newMessage = {};
                        $scope.refreshConversations(userdata._id);
                        $scope.getMessages(destinatari);
                    },
                    function () {
         //               toastr.error('Error a l\'enviar el missatge');
                    });
        }
        $mdDialog.cancel();
    };

  }])*/

  .controller('editBookCtrl', ['$state', '$scope', '$stateParams', '$rootScope', '$http', '$ionicPopup', function ($scope, $stateParams, $rootScope, $http, $ionicPopup, $state) {

    $scope.book = $rootScope.booksel;
    $rootScope.booksel = {};
    $scope.editbook = function (booksel) {
      $http({
      url: API + '/book/' + $scope.book._id,
      method: "PUT",
      data: $scope.book
    })
      .then(function (response) {
        if (response.data.success === true) {
          console.log("libro sel editadooooo");
          $scope.book = {};
          var alertPopup = $ionicPopup.alert({
            title: 'Libro Actualizado',
            template: 'Libro actualizado correctamente'
          });
          $state.go("tabsController.listTabDefaultPage")
          }
          else {
            console.log("Ha fallat la edicio del llibre");
          }
        });
    };
  }])

  .controller('homeTabDefaultPageCtrl', ['$scope', '$stateParams', '$http', '$rootScope', function ($scope, $stateParams, $http, $rootScope) {
    $scope.users = {};
    $http.get(API + '/users')
      .then(function (response) {
        $scope.users = response.data;
      }, function (error) {
        console.log('Error al obtener los usuarios: ' + error.data);
    });
    $http({
      url: API + '/book',
      method: "GET"
    })
      .then(function (response) {
        $scope.books = response.data;
        //$rootScope.book = JSON.parse(localStorage.getItem("fs_web_book"));
        console.log('Libros obtenidos para mi' + $scope.books)
      }, function (error) {
        console.log('Error al obtener los libros: ' + error.data);
      });
    $scope.SearchBook = function () {
      console.log("Buscando Libro *****  " + this.titleBook);
      $http({
        url: API + '/book/search/title/' + this.titleBook,
        method: "GET",
        data: $scope.titleBook
      })
        .then(function (response) {
          if (response.data !== null) {
            $rootScope.title = {};
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

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var Fira = new google.maps.LatLng( 41.35448,  2.12698);
      var ZonaFranca = new google.maps.LatLng(41.365556, 2.141667);
      var CampNou = new google.maps.LatLng(41.379635, 2.124209);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $scope.marker = new google.maps.Marker({
        position: latLng,
        label: "HI, IM HERE!!",
        map: $scope.map
      });

      //ADD Marker

      google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: Fira,
            title: "PUNTO 1"
        });
        var marker2 = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: CampNou,
            title: "PUNTO 2"
        });
        var marker3 = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: ZonaFranca,
            title: "PUNTO 3"
        });


        var infoWindow = new google.maps.InfoWindow({
            content: "Punto de encuentro FIRA"
        });
        var infoWindow2 = new google.maps.InfoWindow({
            content: "Punto de encuentro Camp Nou"
        });
        var infoWindow3 = new google.maps.InfoWindow({
            content: "Punto de encuentro Zona Franca"
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
        });
        google.maps.event.addListener(marker2, 'click', function () {
            infoWindow2.open($scope.map, marker2);
        });
        google.maps.event.addListener(marker3, 'click', function () {
            infoWindow3.open($scope.map, marker3);
        });

      });

 }, function(error){
   console.log("Could not get location");
 });

}])


  .controller('bOOK2SHARECtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
    }])

  .controller('LoginCtrl', ['$scope', '$http', '$state', '$ionicPopup', '$rootScope', 'logout', function ($scope, $http, $state, $ionicPopup, $rootScope, $AuthService, logout) {
    $scope.user = {};
    $scope.login = function () {
      $http({
        url: API + '/users/login',
        method: "POST",
        data: $scope.user

      })
        .then(function (response) {
            if (response.data.success === true) {
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

      var data = {
        user_id: $rootScope.userdata._id,
        token: localStorage.getItem("fs_web_token")
      };

      $http({
        url: API + '/users/logout',
        method: "POST",
        data: data
      });

      localStorage.removeItem("fs_web_token");
      localStorage.removeItem("fs_web_userdata");
      logout.init();
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
            if (response.data.success === true) {
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

  .controller('AddBookCtrl', ['$http', '$state', '$scope', '$rootScope', '$ionicPopup','$cordovaCamera',
   function ($http, $state, $scope, $rootScope, $ionicPopup, $cordovaCamera) {

    $scope.newBook = {};
    //$scope.newBook.propietary = $rootScope.userdata.name;
    console.log('book', $scope.newBook);
    $scope.addbook = function () {
      $http({
        url: API + '/book',
        method: "POST",
        data: $scope.newBook
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data.success === true) {
            $scope.newBook = {};
            var alertPopup = $ionicPopup.alert({
              title: 'Libro añadido',
              template: 'Libro añadido correctamente a tu biblioteca'
            });
            $state.go("tabsController.listTabDefaultPage")
          } else {
            console.log("Ha fallat la publicacio del llibre");
          }
        });
    };
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
  }]);
