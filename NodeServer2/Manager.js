// const timer = require('./Timer')
var Timer = require("./Timer")

class Manager {
    constructor() {
        console.log("INITED");
        this.NUMBER_OF_SWITCH = 5;
        this.NUMBER_OF_SENSOR = 5;
        this.last = 0;
        this.state = Array(this.NUMBER_OF_SWITCH).fill(0);
        this._timers = [];
        this.sensorDataByHouseID = new Map();
        this.deviceDataByHouseID = new Map();
        this.addHouse(0);
    }

    getDeviceState(houseID, deviceID) {
        return this.deviceDataByHouseID.get(houseID).get(deviceID);
    }

    setDeviceState(houseID, deviceID, value) {
        this.deviceDataByHouseID.get(houseID).set(deviceID, value);
    }

    addTimer(houseID, deviceID, val, time) {
        var timer1 = new Timer(houseID, deviceID, val, time);
        this._timers.push(timer1);
    }

    getTimer() {
        return this._timers;
    }

    update(dt) {
        let st = "";
        for (let i = 0; i <= this._timers.length - 1; i++) {
            st += ":" + this._timers[i].getTime();
        }
        if (st.length > 0) console.log(st);
        for (let i = 0; i <= this._timers.length - 1; i++) {
            let timer = this._timers[i];
            timer.update(dt);
            if (timer.isActivated()) {
                this.setDeviceState(timer.getHouseID(), timer.getDeviceID(), timer.getVal());
                this._timers.splice(i, 1);
            }
        }
    }

    printSwitchesState() {
        let st = "";
        for (let i = 0; i <= this.NUMBER_OF_SWITCH - 1; i++) {
            st += this.getDeviceState(i);
        }
        console.log("Current state : ", st);
    }

    addHouse(id) {
        this.deviceDataByHouseID.set(id, new Map());
        this.sensorDataByHouseID.set(id, new Map());
        for (let i = 0; i < this.NUMBER_OF_SWITCH; i++) {
            this.deviceDataByHouseID.get(id).set(i, 0);
        }

        for (let i = 0; i < this.NUMBER_OF_SENSOR; i++) {
            this.sensorDataByHouseID.get(id).set(i, 0);
        }
    }

    setDevice(houseID, deviceID, value) {
        this.deviceDataByHouseID.get(houseID).set(deviceID, value);
    }

    getSensor(houseID, sensorID) {
        this.sensorDataByHouseID.get(houseID).get(sensorID);
    }

    getSensorByHouseID(houseID) {
        return this.sensorDataByHouseID.get(houseID);
    }
}

var mgr = new Manager();
module.exports = mgr;