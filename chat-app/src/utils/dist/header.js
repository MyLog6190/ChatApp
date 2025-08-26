"use strict";
exports.__esModule = true;
exports.removeHeader = exports.setHeader = void 0;
var axios_1 = require("../api/axios");
exports.setHeader = function (key, value) {
    axios_1["default"].defaults.headers.common[key] = value;
};
exports.removeHeader = function (key) {
    if (!axios_1["default"].defaults.headers.common[key]) {
        return;
    }
    delete axios_1["default"].defaults.headers.common[key];
};
