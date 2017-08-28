
// This module take a few different date formats and returns an ISO formatted date.
//
// The moment() module handles all kinds of date validation and formatting. It handles
// problems such as not excepting April 31st as a valid date -- date.getTime() will
// treat it as May 1st instead of invalid. It also handles timezones correctly when
// only a date is passed, so March 5th, 1998 doesn't sometimes get treated as 
// March 4th, 1998. The only problem with using moment() is that it now wants dates
// passed as ISO dates (otherwise you get deprecation warnings). Moment() probably 
// has something built in to convert other date formats to ISO date formats, but I 
// wrote this code to practice creating a module that my code can require/export, and 
// to practice using regex.


// The following dates formats all need to work
// ISO Date	    "2015-03-25" (The International Standard)
// Short Date	"03/25/2015"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date 1	"March 25 2015" or "25 March 2015"
// Full Date 2	"Wednesday March 25 2015"
// Date & Time	"03/25/2015 08:12:pm"  <-- only returns 2015-03-25
// Invalid 1    "2015-04-31"  <-- returns 2015-04-31, but moment will catch it as invalid
// Invalid 2    "April 31st, 2015"  <-- returns 2015-04-31, but moment will catch it as invalid
// Invalid 3    "Not a date" <-- returns null
module.exports = {
    convertToISO: function(inputDate) {
        inputDate = inputDate.replace(/,/g, " ");
        inputDate = inputDate.replace(/-/g, " ");
        inputDate = inputDate.replace(/\//g, " ");
        inputDate = inputDate.replace(/\./g, "");
        inputDate = inputDate.replace(/st |nd |rd /gi, " ");
        inputDate = inputDate.replace(/monday |mon /i, "");
        inputDate = inputDate.replace(/tuesday |tues |tue /i, "");
        inputDate = inputDate.replace(/wednesday |wed /i, "");
        inputDate = inputDate.replace(/thursday |thur |thu /i, "");
        inputDate = inputDate.replace(/friday |fri /i, "");
        inputDate = inputDate.replace(/saturday |sat /i, "");
        inputDate = inputDate.replace(/sunday |sun /i, "");
        inputDate = inputDate.replace(/^ */, "");
        inputDate = inputDate.replace(/^(\d+) ([a-zA-Z]+) /, "$2 $1 ");   // This switches 25 Mar 2015 to Mar 25 2015
        inputDate = inputDate.replace(/^january |^jan /i, "01 ");
        inputDate = inputDate.replace(/^february |^feb /i, "02 ");
        inputDate = inputDate.replace(/^march |^mar /i, "03 ");
        inputDate = inputDate.replace(/^april |^apr /i, "04 ");
        inputDate = inputDate.replace(/^may |^may /i, "05 ");
        inputDate = inputDate.replace(/^june |^jun /i, "06 ");
        inputDate = inputDate.replace(/^july |^jul /i, "07 ");
        inputDate = inputDate.replace(/^august |^aug /i, "08 ");
        inputDate = inputDate.replace(/^september |^sep /i, "09 ");
        inputDate = inputDate.replace(/^october |^oct /i, "10 ");
        inputDate = inputDate.replace(/^november |^nov /i, "11 ");
        inputDate = inputDate.replace(/^december |^dec /i, "12 ");
        inputDate = inputDate.replace(/  +/g, " ");
        inputDate = inputDate.replace(/^(\d{1,2}) (\d{1,2}) (\d{4})/, "$3 $1 $2");  // move year to front of string
        inputDate = inputDate.replace(/ /g, "-");
        inputDate = inputDate.replace(/(?:-)(\d)(?=-)/, "-0$1");  // If they put in a single digit month then prepend a zero
        // Note: I'm stripping off any time entries (or garbage entries) as they were not requirements for the project.
        inputDate = inputDate.replace(/(\d{4}-\d{2}-\d{1,2})(.*)/, "$1");  // Strip off everything after the ISO date
        inputDate = inputDate.replace(/(?:-)(\d)(?=$)/, "-0$1");  // If they put in a single digit day then prepend a zero
        if (!/^(\d{4}-\d{2}-\d{2})$/.test(inputDate)) {   // If it's not a valid ISO date then return null
            inputDate = null;
        }
        return inputDate;
    }
}
