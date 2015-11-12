
angular.module('ng-route-active',[]);

angular.module('ng-route-active').directive('routeActive', ['$rootScope', '$route', function ($rootScope, $route) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
          
            var desiredClass = attrs.routeActive;

            if (desiredClass == '' || typeof desiredClass == 'undefined')
                throw 'You need to specify a desired class for when route is active: ex: <a href="something" route-active="active"></a>'
            
            var href = "";

            if (element.tagName != "A")
            {
                href = $(element[0]).find('a').attr('href').replace("/#", "") + '/';
            }
            else{
                href = $(element[0]).attr('href').replace("/#", "") + '/';
            }

            console.log(href);

            if (href.split('/').length >= 3)
            {
                href = '/' + href.split('/')[1];
            }

            console.log(href);
           
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

                console.log(currentPath)
                if (currentPath.split('/').length >= 3) // if we have something like /dashboard/
                {
                    currentPath = currentPath.substring(0, currentPath.length - 1); // remove last character aka the '/'
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

                console.log(currentPath)

               
            });

            scope.$on('$destroy', function () {
                onChange();
            });
          
        }
    };
}]);
