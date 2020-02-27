'use strict';

const fs = require('fs');
const moment = require('moment');
const { timePeriodSlots } = require('./constant/constant');


/** function for iterating all clicks and and preparing
 a map of counts for each ip and pruning ip which count
 excedding 10**/

const createMapOfIps = function (clicks) {
    let uniqueIps = {};
    for (let count = 0; count < clicks.length; count++) {
        if (uniqueIps[clicks[count]['ip']] > 0) {
            uniqueIps[clicks[count]['ip']] = uniqueIps[clicks[count]['ip']] + 1
        }
        else {
            uniqueIps[clicks[count]['ip']] = 1;
        }
    }
    // deleting those ip whose count is more than 10 in overall array of clicks
    for (let ip in uniqueIps) {
        if (uniqueIps[ip] > 10)
            delete uniqueIps[ip];
    }
    return uniqueIps;
}

// function containing logic for clubbing ips into 24 segments of 1 hour each to get map of eligibleIps
const clubIpToSegments = function (clicks, eligibleIps, ips) {

    for (let count = 0; count < clicks.length; count++) {
        if (typeof ips[clicks[count].ip] === 'undefined') {
            continue;
        }
        let day = moment(clicks[count].timestamp, 'DD/MM/YYYY').format('YYYY-MM-DD');
        let timestamp = moment(moment(clicks[count].timestamp, 'DD/MM/YYYY hh:mm:ss a').format('YYYY-MM-DD hh:mm:ss a'));
        switch (true) {
            case (timestamp.isBetween(day.concat(' 00:00:00'), day.concat(' 00:59:59'), null, [])):
                eligibleIps['period1'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 01:00:00'), day.concat(' 01:59:59'), null, [])):
                eligibleIps['period2'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 02:00:00'), day.concat(' 02:59:59'), null, [])):
                eligibleIps['period3'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 03:00:00'), day.concat(' 03:59:59'), null, [])):
                eligibleIps['period4'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 04:00:00'), day.concat(' 04:59:59'), null, [])):
                eligibleIps['period5'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 05:00:00'), day.concat(' 05:59:59'), null, [])):
                eligibleIps['period6'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 06:00:00'), day.concat(' 06:59:59'), null, [])):
                eligibleIps['period7'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 07:00:00'), day.concat(' 07:59:59'), null, [])):
                eligibleIps['period8'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 08:00:00'), day.concat(' 08:59:59'), null, [])):
                eligibleIps['period9'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 09:00:00'), day.concat(' 09:59:59'), null, [])):
                eligibleIps['period10'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 10:00:00'), day.concat(' 10:59:59'), null, [])):
                eligibleIps['period11'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 11:00:00'), day.concat(' 11:59:59'), null, [])):
                eligibleIps['period12'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 12:00:00'), day.concat(' 12:59:59'), null, [])):
                eligibleIps['period13'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 13:00:00'), day.concat(' 13:59:59'), null, [])):
                eligibleIps['period14'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 14:00:00'), day.concat(' 14:59:59'), null, [])):
                eligibleIps['period15'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 15:00:00'), day.concat(' 15:59:59'), null, [])):
                eligibleIps['period16'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 16:00:00'), day.concat(' 16:59:59'), null, [])):
                eligibleIps['period17'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 17:00:00'), day.concat(' 17:59:59'), null, [])):
                eligibleIps['period18'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 18:00:00'), day.concat(' 18:59:59'), null, [])):
                eligibleIps['period19'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 19:00:00'), day.concat(' 19:59:59'), null, [])):
                eligibleIps['period20'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 20:00:00'), day.concat(' 20:59:59'), null, [])):
                eligibleIps['period21'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 21:00:00'), day.concat(' 21:59:59'), null, [])):
                eligibleIps['period22'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 22:00:00'), day.concat(' 22:59:59'), null, [])):
                eligibleIps['period23'].push(clicks[count])
                break;
            case (timestamp.isBetween(day.concat(' 23:00:00'), day.concat(' 23:59:59'), null, [])):
                eligibleIps['period24'].push(clicks[count])
                break;
            default:
                console.error("invalid input");
                break;
        }
    }
}

// logic for extracting most expensive ip in case amount is same than based on earliest timestamp for each segment
const getExpensiveIp = function (eligibleIps) {
    let resultSet = [];
    for (let period in eligibleIps) {

        let eligibleClicks;
        if (eligibleIps[period].length > 0) {
            eligibleClicks = eligibleIps[period].sort(function (a, b) {
                return b.amount - a.amount;
            });

            if (eligibleClicks.length > 1) {
                let maxAmount = eligibleClicks[0].amount;
                let sortedClicks = eligibleClicks.filter(function (click) {
                    return click.amount === maxAmount;
                });
                if (sortedClicks.length > 1) {
                    eligibleClicks = sortedClicks.sort(function (a, b) {
                        return new Date(a.timestamp) - new Date(b.timestamp);
                    });
                }
                else {
                    eligibleClicks = sortedClicks;
                }
            }
            resultSet.push(eligibleClicks[0]);

        }
    }
    return resultSet;
}


const extractExpensiveClicks = function () {
    let clicks = fs.readFileSync('clicks.json');
    clicks = JSON.parse(clicks);

    let ips = {}; // @ips to store all ip with their respective counts
    let resultSet = []; // @resultSet to store final result of most expensive clicks
    let eligibleIps = timePeriodSlots; // @eligibleIps object which holds all ip segmented by 1 hour durations total 24 segments

    ips = createMapOfIps(clicks);

    clubIpToSegments(clicks, eligibleIps, ips);

    resultSet = getExpensiveIp(eligibleIps);
    return resultSet;


}

let finalResult = JSON.stringify(extractExpensiveClicks());
// writing the extracted ip into final resultset file
fs.writeFileSync('resultset.json', finalResult);
module.exports = { extractExpensiveClicks, getExpensiveIp, clubIpToSegments, createMapOfIps };



