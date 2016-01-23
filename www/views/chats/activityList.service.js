(function () {

    angular
        .module('clinpharm')
        .factory('ActivityList', ActivityList);

    ActivityList.$inject = [];

    function ActivityList() {

        var activityList = [
            {
                text: "Chart Review",
                value: "Chart review"
            },
            {
                text: "Discharge",
                value: "Discharge"
            },
            {
                text: "Drug Monitorng",
                value: "Drug monitoring"
            },
            {
                text: "Other",
                value: "Dther"
            }
        ];
        return activityList;
    }
})();
