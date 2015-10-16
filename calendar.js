var Calendar = (function($) {

    // globally head date object for the month shown
    var date = new Date();
    var currentMonth = date.getMonth();

    date.setDate(1);
    date.setMonth( currentMonth );

    // initialize the calendar
    function initialize() {

        createMonth();
        registerEventHandlers();

    }

    // converts day ids to the relevant string
    function dayOfWeekAsString(dayIndex) {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[dayIndex];
    }

    // converts month ids to the relevant string
    function monthsAsString(monthIndex) {
        var months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    // creates a day element
    function createCalendarDay(num, day, mon, year) {

        var newDay  = '<span id="' + num + '-' + mon + '-' + year + '">';
            newDay += '<span>' + day + ' </span>';
            newDay += '<span>' + num + '</span>';
            newDay += '</span>';
            newDay += '<br>';

        $('#calendar').append(newDay);

    }

    // clears all days from the calendar
    function clearCalendar() {

        $('#calendar').html('');

    }

    // clears the calendar and shows the next month
    function nextMonth() {

        clearCalendar();

        date.setMonth(date.getMonth() + 1);

        createMonth(date.getMonth());

    }

    // clears the calendar and shows the previous month
    function previousMonth() {

        clearCalendar();
        date.setMonth(date.getMonth() - 1);
        var val = date.getMonth();
        createMonth(date.getMonth());

    }

    // creates and populates all of the days to make up the month
    function createMonth() {

        var dateObject = new Date();
        dateObject.setDate(date.getDate());
        dateObject.setMonth(date.getMonth());
        dateObject.setYear(date.getFullYear());

        createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), monthsAsString(dateObject.getMonth()).toLowerCase(), dateObject.getFullYear());

        dateObject.setDate(dateObject.getDate() + 1);

        while (dateObject.getDate() != 1) {
            createCalendarDay(dateObject.getDate(), dayOfWeekAsString(dateObject.getDay()), monthsAsString(dateObject.getMonth()).toLowerCase(), dateObject.getFullYear());
            dateObject.setDate(dateObject.getDate() + 1);
        }

        // set the text to the correct month
        $('#current-month').html( monthsAsString(date.getMonth()).toLowerCase() + ' ' + date.getFullYear() );

        getCurrentDay();

    }

    function getCurrentDay() {

        // create a new date that will set as default time
        var todaysDate   = new Date();
        var today        = todaysDate.getDate();
        var thisMonth    = monthsAsString(currentMonth);
        var currentYear  = todaysDate.getFullYear();
        var currentMonth = todaysDate.getMonth();

        // find element with the ID for today
        currentDay = document.getElementById(today + '-' + monthsAsString(currentMonth).toLowerCase() + '-' + currentYear);
        $(currentDay).addClass('today');

    }

    function registerEventHandlers() {

        // change month with...

        // left and right clicks
        $(document).on('keydown', function(event) {
            switch (event.keyCode) {
                case 37:
                    previousMonth();
                    break;
                case 39:
                    nextMonth();
                    break;
            }
        });

        // next and previous buttons
        $(document).on('click', function(event) {

            var el = event.target;

            if ( el.id == 'calendar-prev' ) {
                previousMonth();
            }

            if ( el.id == 'calendar-next' ) {
                nextMonth();
            }

        });

    }

    initialize();

})(jQuery);