/*
| -------------------------------------------------------------------------
| Tablesorter Parsers
| -------------------------------------------------------------------------
| CREATED 10/2008 by Joshua Priddle <josh.priddle@hostrocket.com>
|
| Various jQuery functions to accurately sort tabledata using the tablesorter plugin
|
*/

// ------------------------------------------------------------------------

/**
 * Converts timestamp 'hours:minutes:seconds' to seconds
 */
$.tablesorter.addParser({
    id: 'timestamp', 
    is: function(s) { 
        return false; 
    }, 
    format: function(s) {
		var date_array = s.split(':');
		if (date_array.length == 3)
		{
			var seconds = (date_array[0] * 3600) + (date_array[1] * 60) + date_array[2];
		}
		else
		{
			var seconds = (date_array[0] * 60) + date_array[1];
		}
        return seconds
    }, 
    type: 'numeric' 
});

// ------------------------------------------------------------------------

/**
 * Converts human time 'hour:minute[am|pm]' to # of seconds since midnight
 */
$.tablesorter.addParser({ 
    id: 'sort_human_time', 
    is: function(s) { 
        return false; 
    }, 
    format: function(s) {
		if (s.indexOf('pm') > 0)
		{
			var t = s.replace(/pm/, '');
			var the_time = t.split(':');
			var hour = the_time[0] * 1;
			var mins = the_time[1] * 1;
			
			if (hour < 12) hour += 12;
		}
		else if (s.indexOf('am') > 0)
		{
			var t = s.replace(/am/, '');
			var the_time = t.split(':');
			var hour = the_time[0] * 1;
			var mins = the_time[1] * 1;
		}
		return (hour * 60 * 60) + (mins * 60);
		
    }, 
    type: 'numeric' 
});