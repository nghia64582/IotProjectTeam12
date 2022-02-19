// export default class Timer {
module.exports = class Timer{
    constructor(houseID, deviceID, val, time) {
        this.houseID = houseID;
        this.deviceID = deviceID;
        this.val = val;
        this.time = time;
        this.activated = false;
    }

    update(dt) {
        this.time -= dt;
        if (this.time < 0) {
            this.activated = true;
        }
    }

    isActivated() {
        return this.activated;
    }

    getDeviceID() {
        return this.deviceID;
    }

    getHouseID() {
        return this.houseID;
    }

    getVal() {
        return this.val;
    }

    getTime() {
        return this.time;
    }

    setAllValue(deviceID, val, time) {
        console.log("SET", deviceID, val, time);
        this.deviceID = deviceID;
        this.val = val;
        this.time = time;
        this.activated = false;
        return this;
    }

}
