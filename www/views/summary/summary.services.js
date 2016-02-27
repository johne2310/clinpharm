//summary.services.js

/*global angular */
/*global Firebase */
/*global moment */
/*global _ */

(function () {
    'user strict';

    angular

        .module('clinpharm')
        .factory('Summary', Summary);

    function Summary($firebaseArray, $q) {

        //set variables

        var ref = new Firebase('https://clinpharm.firebaseio.com/activity');
        var siteArray = [1, 2, 3, 4];
        var newCount = [];
        var siteCount = {};
        var siteCountArray = [];

        //variables for date calculations
        var today = moment(Date.parse('today')).format('X');
        var unixToday = moment().unix();
        var lastSunday = moment(Date.parse('last sunday')).format('X');
        var firstOfMonth = moment(new Date.today().moveToFirstDayOfMonth()).format('X');
        var dayOfMonth = new Date().getDate();
        var unixToDays = 60 * 60 * 24;
        var daysSinceLastSunday = Math.round((unixToday - lastSunday) / unixToDays);

        console.log('today:', unixToday);
        console.log('lastSunday:', lastSunday);
        console.log('dayOfMonth:', dayOfMonth);
        console.log('daysSinceLastSunday:', daysSinceLastSunday);
        console.log('firstOfMonth:', firstOfMonth);


        var exports = {
            getSiteActivityCount: getSiteActivityCount,
            siteArray: siteArray,
            today: today
        };

        return exports;
        /////////////////////




        //function to siteCount object for counting activity per site
        function getSiteActivityCount() {

            newCount = [];
            var newMonthCount = [];

            return $q(function (resolve) {
                //load firebase ref in firebaseArray
                siteArray = $firebaseArray(ref);
                //ensure siteArray is loaded (deal with async)
                siteArray.$loaded().then(function () {

                    console.log('SiteArray from Summary factory', siteArray);
                    //iterate through array and add  site name to a new array (from which we can then count instances)
                    angular.forEach(siteArray, function (value) {
                        if (value.site === undefined) { //TODO remove from final version
                            value.site = 'Not recorded';
                        }

                        //convert activty date to unix
                        var activityDate = moment(Date.parse(value.date)).unix();
                        console.log('Date:', activityDate);
                        var thisWeek = Math.round((activityDate - lastSunday) / unixToDays);
                        console.log('thisWeek:', thisWeek);

                        if (thisWeek >= 0 && thisWeek < 7) {
                            console.log('This week');
                            //add site names to newCount array (in preparation for counting)

                            //FIXME: use 'this week' counter in this section then push to array after if/else
                            newCount.push(
                                value.site
                            );
                        } else {
                            //FIXME: use 'this week' counter in this section then push to array after if/else

                            console.log('Not This week');
                            newMonthCount.push({
                                site: value.site,
                                name: value.name
                            });
                        }


                    });
                    //iterate newCount array using lodash to count activities per site
                    siteCount = _.countBy(newCount, _.identity);
                    var monthCount = _.countBy(newMonthCount, function (obj) {
                        return obj.site;
                    });
                    siteCountArray = _.toArray(newMonthCount);
                    console.log('Site count: ', siteCount);
                    console.log('monthCount:', monthCount);
                    console.log('siteCountArray:', siteCountArray);
                    resolve(siteCount, monthCount); //siteCount

                });

            });
        } //end getSiteActivityCount

    } //end factory
})();
