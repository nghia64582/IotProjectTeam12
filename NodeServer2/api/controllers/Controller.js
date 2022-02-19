const util = require('util')
const mysql = require('mysql')
const db = require('../db');
const mgr = require('../../Manager');

SET_DEVICE = 1;
ADD_TIMER = 2;
GET_SWITCHES_STATE = 3;
GET_TIMER_STATE = 4;
GET_SENSOR_DATA = 5;

module.exports = {
    get: (req, res) => {
        console.log("GET RECEIVED.");
        let data = req.body;
        let st = "";
        let resJson = [];
        switch (data.cmd) {
            case GET_SWITCHES_STATE:
                houseID = data.houseID;
                for (let i = 0; i <= mgr.NUMBER_OF_SWITCH - 1; i++)
                    resJson.push({"deviceID" : i, "value" : mgr.getDeviceState(houseID, i)});
                    // st += mgr.getDeviceState(houseID, i);
                break;
            case GET_TIMER_STATE:
                for (let i = 0; i <= mgr.getTimer().length - 1; i++) {
                    let timer = mgr._timers[i];
                    resJson.push({
                        "deviceID" : timer.getDeviceID(),
                        "value" : timer.getVal(),
                        "time" : timer.getTime()
                    });
                    // st += timer.getDeviceID() + ":" + timer.getVal() + ":" + timer.getTime();
                    // if (i < mgr.getTimer().length - 1)
                    //     st += '|';
                }
                break;
            case GET_SENSOR_DATA:                
                houseID = data.houseID;
                for (let i = 0; i <= mgr.NUMBER_OF_SENSOR - 1; i++)
                    // st += mgr.getSensorByHouseID(houseID).get(i);
                    resJson.push({"sensorID" : i, "value" : mgr.getDeviceState(houseID, i), "unit" : "oC"});
                break;
        }
        console.log(st);
        res.send(resJson);
    },
    post: (req, res) => {
        let data = req.body;
        switch (data.cmd) {
            case SET_DEVICE:
                houseID = data.houseID;
                deviceID = data.deviceID;
                value = data.value;
                mgr.setDeviceState(houseID, deviceID, value);
                console.log("set device : " + houseID + " " + deviceID + " " + value);
                break;
            case ADD_TIMER:
                houseID = data.houseID;
                deviceID = data.deviceID;
                value = data.value;
                time = data.time;
                console.log("Add timer : "  + houseID + " " + deviceID + " " + value + " " + time);
                mgr.addTimer(houseID, deviceID, val, time);
                break;
        }
        // response
        res.send("Success");
    },
}
