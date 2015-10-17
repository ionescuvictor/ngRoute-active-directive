
angular.module('ng-route-active',[]);

angular.module('ng-route-active').directive('routeActive', ['$rootScope', '$route', function ($rootScope, $route) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            
            var desiredClass = attrs.routeActive;

            if (desiredClass == '' || typeof desiredClass == 'undefined')
                throw 'You need to specify a desired class for when route is active: ex: <a href="something" route-active="active"></a>'
            

            var href = $(element[0]).find('a').attr('href').replace("/#", "") + '/';
                        
            //this will work for any routes including routes with multiple parameters.
            var onChange = $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {

                var currentPath = "";


                //for route / we get $$route undefined.
                if (typeof current.$$route !== 'undefined') {
                    if (current.$$route.originalPath.indexOf(":") > -1) {
                        currentPath = current.$$route.originalPath.split(":")[0]; // some routes have :params etc.Get only first path.
                    }
                    else {
                        currentPath = current.$$route.originalPath;
                    }
                }
                                
                if (typeof current.$$route !== 'undefined')
                {
                    if (href == currentPath || href == (currentPath + '/')) {
                        element.addClass(desiredClass);
                    }
                    else {
                        element.removeClass(desiredClass);
                    }
                }
                else
                {
                    if (href == '//' && typeof current.$$route === 'undefined') {
                        element.addClass(desiredClass);
                    }
                    else {
                        element.removeClass(desiredClass);
                    }
                }
               
            });

            scope.$on('$destroy', function () {
                onChange();
            });
        }
    };
}]);