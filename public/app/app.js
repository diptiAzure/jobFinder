angular.module('app',[]);

angular.module('app').controller('testCtrl',function($scope){
    $scope.jobs = [{title:'Bank Manager',desc:'U need to dance in the Bank'},
                    {title:'Software Developer',desc:'U need to scratch ur Head '}];
});