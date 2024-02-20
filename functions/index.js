const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { onRequest } = require("firebase-functions/v2/https");
const camera = require("./camera");
const saveData = require("./save_data");
const switchFunction = require("./switch");

exports.cameraFunction = onRequest((request, response) => {
  camera.handleCameraRequest(request, response);
});

exports.saveDataFunction = onRequest((request, response) => {
  saveData.handleSaveDataRequest(request, response);
});

exports.switchFunction = onRequest((request, response) => {
  switchFunction.handleSwitchRequest(request, response);
});
