const {extractExpensiveClicks, getExpensiveIp, clubIpToSegments, createMapOfIps} = require('../main');
const fs = require('fs');


let mockData;
let mockIps;
let mockResultSet;
let mockEligibleIp;

describe('main', () => {
    beforeAll(() => {
        mockData = fs.readFileSync('clicks.json');
        mockData = JSON.parse(mockData);
        mockEligibleIp = {
            period1: [],
            period2: [],
            period3: [
              { ip: '11.11.11.11', timestamp: '3/11/2016 02:12:32', amount: 6.5 },
              {
                ip: '11.11.11.11',
                timestamp: '3/11/2016 02:13:11',
                amount: 7.25
              },
              {
                ip: '44.44.44.44',
                timestamp: '3/11/2016 02:13:54',
                amount: 8.75
              }
            ],
            period4: [],
            period5: [],
            period6: [],
            period7: [
              { ip: '44.44.44.44', timestamp: '3/11/2016 06:32:42', amount: 5 },
              { ip: '11.11.11.11', timestamp: '3/11/2016 06:45:01', amount: 12 },
              {
                ip: '11.11.11.11',
                timestamp: '3/11/2016 06:59:59',
                amount: 11.75
              }
            ],
            period8: [
              { ip: '11.11.11.11', timestamp: '3/11/2016 07:02:54', amount: 4.5 },
              {
                ip: '33.33.33.33',
                timestamp: '3/11/2016 07:02:54',
                amount: 15.75
              },
              {
                ip: '66.66.66.66',
                timestamp: '3/11/2016 07:02:54',
                amount: 14.25
              }
            ],
            period9: [],
            period10: [],
            period11: [],
            period12: [],
            period13: [],
            period14: [
              { ip: '55.55.55.55', timestamp: '3/11/2016 13:02:40', amount: 8 },
              { ip: '44.44.44.44', timestamp: '3/11/2016 13:02:55', amount: 8 },
              { ip: '55.55.55.55', timestamp: '3/11/2016 13:33:34', amount: 8 },
              { ip: '55.55.55.55', timestamp: '3/11/2016 13:42:24', amount: 8 },
              {
                ip: '55.55.55.55',
                timestamp: '3/11/2016 13:47:44',
                amount: 6.25
              }
            ],
            period15: [
              {
                ip: '55.55.55.55',
                timestamp: '3/11/2016 14:02:54',
                amount: 4.25
              },
              {
                ip: '55.55.55.55',
                timestamp: '3/11/2016 14:03:04',
                amount: 5.25
              }
            ],
            period16: [
              {
                ip: '55.55.55.55',
                timestamp: '3/11/2016 15:12:55',
                amount: 6.25
              }
            ],
            period17: [
              { ip: '55.55.55.55', timestamp: '3/11/2016 16:22:11', amount: 8.5 }
            ],
            period18: [
              {
                ip: '55.55.55.55',
                timestamp: '3/11/2016 17:18:19',
                amount: 11.25
              }
            ],
            period19: [ { ip: '55.55.55.55', timestamp: '3/11/2016 18:19:20', amount: 9 } ],
            period20: [],
            period21: [],
            period22: [],
            period23: [],
            period24: []
          };
        mockIps = {
            '11.11.11.11': 5,
            '44.44.44.44': 3,
            '33.33.33.33': 1,
            '66.66.66.66': 1,
            '55.55.55.55': 10
          };
        mockResultSet = [
            { ip: '44.44.44.44', timestamp: '3/11/2016 02:13:54', amount: 8.75 },
            { ip: '11.11.11.11', timestamp: '3/11/2016 06:45:01', amount: 12 },
            { ip: '33.33.33.33', timestamp: '3/11/2016 07:02:54', amount: 15.75 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 13:02:40', amount: 8 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 14:03:04', amount: 5.25 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 15:12:55', amount: 6.25 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 16:22:11', amount: 8.5 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 17:18:19', amount: 11.25 },
            { ip: '55.55.55.55', timestamp: '3/11/2016 18:19:20', amount: 9 }
          ];
    })
    describe('function createMapOfIps', () => {
        test('should iterate clicks and create a map of all unique ips and there total count',()=>{
            expect(createMapOfIps(mockData)).toEqual(mockIps);
        })
    })
    describe('function getExpensiveIp', () => {
        test('should all clubbed expensive ips and create a list of most expensive clicks',()=>{
            clubIpToSegments(mockData, mockEligibleIp, mockIps);
            extractExpensiveClicks();
            expect(getExpensiveIp(mockEligibleIp)).toEqual(mockResultSet);
        })
    })
   
  });