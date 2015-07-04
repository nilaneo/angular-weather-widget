(function() {
    'use strict';

    angular.module('nnWeather', [])

        .factory('nnWeatherService', ['$http', function($http) {
            function getForecast(city) {
                return $http
                    .get('http://api.openweathermap.org/data/2.5/forecast/daily', {
                        params: {
                            q: city,
                            units: 'metric',
                            cnt: 7
                        }
                    })
                    .then(function(resp) {
                        return _prepareDateToRender(resp.data);
                    });
            }

            function _prepareDateToRender (data) {
                return {
                    cityName: data.city.name,
                    forecast: data.list.map(_prepareDataListItem)
                };
            }

            function _prepareDataListItem (listItem) {
                return {
                    day: _getDayByTimestamp(listItem.dt * 1000),
                    minTemp: Math.round(listItem.temp.min),
                    maxTemp: Math.round(listItem.temp.max),
                    dayTemp: Math.round(listItem.temp.day),
                    iconClass: _replaceIconWithIconClass(listItem.weather[0].icon)
                };
            }

            function _getDayByTimestamp (timestamp) {
                return new Date(timestamp).toString().match(/^\w*/)[0];
            }

            function _replaceIconWithIconClass (iconName) {
                switch (iconName) {
                    case '01d':
                    case '01n':
                        return 'nn-icon-clear-sky';
                    case '02d':
                    case '02n':
                        return 'nn-icon-few-clouds';
                    case '03d':
                    case '03n':
                        return 'nn-icon-scattered-clouds'
                    case '04d':
                    case '04n':
                        return 'nn-icon-broken-clouds '
                    case '09d':
                    case '09n':
                        return 'nn-icon-shower-rain '
                    case '10d':
                    case '10n':
                        return 'nn-icon-rain'
                    case '11d':
                    case '11n':
                        return 'nn-icon-thunderstorm'
                    case '13d':
                    case '13n':
                        return 'nn-icon-snow'
                    case '50d':
                    case '50n':
                        return 'nn-icon-mist'
                    default:
                        return '';
                }
            }

            return {
                getForecast: getForecast
            };
        }])

        .directive('nnWeatherWidget', [function() {
            return {
                scope: {
                    city: '@'
                },
                templateUrl: '../dist/templates/weather-widget.tpl.min.html',
                controller: ['$scope', 'nnWeatherService', function($scope, nnWeatherService) {
                    $scope.cityName = null;
                    $scope.forecast = null;

                    nnWeatherService
                        .getForecast($scope.city)
                        .then(function(data) {
                            $scope.cityName = data.cityName;
                            $scope.forecast = data.forecast;
                        });
                }]
            };
        }]);
}());