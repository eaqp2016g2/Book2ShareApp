// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngCordova'])

  .factory('api', function ($http) {
    return {
      init: function () {
        console.log("Entra TOKENS");
        $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_web_token');
        $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_web_token');
      }
    };
  })
  .factory('logout', function ($http) {
    return {
      init: function () {
        console.log("Surt TOKENS");
        $http.defaults.headers.common['X-Access-Token'] = undefined;
        $http.defaults.headers.post['X-Access-Token'] = undefined;
      }
    };
  })

.config(function($ionicConfigProvider, $sceDelegateProvider){


  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})
.constant('ApiEndpoint', {
  url: 'http://localhost:3001/api'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(['$rootScope', '$state','$stateParams', 'api', 'logout',
function($rootScope, $state, $stateParams, api, logout){
    $rootScope.$state=$state;
    $rootScope.$stateParams= $stateParams;
    console.log('state', $state);
    if (localStorage.getItem('fs_web_token')) {
        console.log('L\'usuari ha iniciat sessió, redirigint al portal');
        $rootScope.logged = true;
        $rootScope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
        api.init();
        $state.go("login")
    }
    else {
        console.log('L\'usuari no ha iniciat sessió');
        localStorage.removeItem('fs_web_userdata');
        $rootScope.logged = false;
        logout.init();
        $state.go("login")

    }
}])

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])
/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });

      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});
