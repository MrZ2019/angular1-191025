angular.module('app')
    .controller('CAngular', function ($scope, $http) {

        $scope.list = [2, 5, 6]
    })

    .directive('bg', function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                this.bg = function (elm) {
                    elm.css('background', 'blue')
                }
            },
            link: function (scope, elm, attrs) {
                //elm.css('background', 'yellow')

            }
        }
    })
    .directive('redLarge', function () {
        return {
            restrict: 'A',
            require: 'bg',
            link: function (scope, elm, attrs, ctrl) {
                elm.css('color', 'red')
                ctrl.bg(elm)
            }
        }
    })
    .directive('tab', function () {
        return {
            restrict: 'E',
            templateUrl: 'tpl-tab',
            transclude: true,
            controller: function ($scope) {
                var tabs = [];
                $scope.tabs = tabs;
                this.addPane = function (pane) {
                    tabs.push(pane);
                }
            }
        }
    })
    .directive('pane', function () {
        return {
            restrict: 'E',
            templateUrl: 'tpl-pane',
            require: '^tab',
            replace: true,
            transclude: true,
            scope: {
                title: '@'
            },
            link: function (scope, elm, attrs, tab) {
                tab.addPane(scope.title);

                $('.mytab').on('click', 'a', function (e) {
                    e.preventDefault()
                    $(this).tab('show')
                })
            }
        }
    })