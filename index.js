// This is a simple challenge from FCC
// Give an API a date or a number and it will return json with a unix date, 
// i.e. time in seconds since Jan 1st, 1970, and a long form natural date. 
// Note: Handling times was not part of the projact -- dates only.

const express = require("express");
const moment = require('moment');
const isoUtil = require('./isoUtil');

var app = express();

app.get("/*", (req, res) => {
    var origDate = req.originalUrl.substring(1, req.originalUrl.length);  // remove leading backslash
    origDate = decodeURIComponent(origDate);                              // decode the encoded date passed in the Url
    var isoDate = null;
    var naturalDate = null;
    var unixDate = null;

    try {
        isoDate = isoUtil.convertToISO(origDate);
        if (moment(isoDate, 'YYYY-MM-DD').isValid()) {
            unixDate = moment(isoDate).unix();
            naturalDate = moment(isoDate).format('MMMM DD, YYYY');
        } else {
            unixDate = Number(origDate);
            naturalDate = new Date(unixDate*1000);
            naturalDate = moment(naturalDate).format('MMMM DD, YYYY');
            if (naturalDate === "Invalid date") {
                naturalDate = null;
                unixDate = null;
            }
        }
    } catch (error) {
        naturalDate = null;
        unixDate = null;
    }
    
    res.send({
        FCC: "Timestamp Microservice",
        unix: unixDate,
        natural: naturalDate
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);