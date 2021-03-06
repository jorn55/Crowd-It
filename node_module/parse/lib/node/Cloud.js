"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
exports.getJobsData = getJobsData;
exports.startJob = startJob;
exports.getJobStatus = getJobStatus;

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _decode = _interopRequireDefault(require("./decode"));

var _encode = _interopRequireDefault(require("./encode"));

var _ParseError = _interopRequireDefault(require("./ParseError"));

var _ParseQuery = _interopRequireDefault(require("./ParseQuery"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Contains functions for calling and declaring
 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
 * <p><strong><em>
 *   Some functions are only available from Cloud Code.
 * </em></strong></p>
 *
 * @class Parse.Cloud
 * @static
 * @hideconstructor
 */

/**
  * Makes a call to a cloud function.
  * @method run
  * @name Parse.Cloud.run
  * @param {String} name The function name.
  * @param {Object} data The parameters to send to the cloud function.
  * @param {Object} options
  * @return {Promise} A promise that will be resolved with the result
  * of the function.
  */


function run(name
/*: string*/
, data
/*: mixed*/
, options
/*: { [key: string]: mixed }*/
)
/*: Promise*/
{
  options = options || {};

  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud function name must be a string.');
  }

  const requestOptions = {};

  if (options.useMasterKey) {
    requestOptions.useMasterKey = options.useMasterKey;
  }

  if (options.sessionToken) {
    requestOptions.sessionToken = options.sessionToken;
  }

  return _CoreManager.default.getCloudController().run(name, data, requestOptions);
}
/**
  * Gets data for the current set of cloud jobs.
  * @method getJobsData
  * @name Parse.Cloud.getJobsData
  * @return {Promise} A promise that will be resolved with the result
  * of the function.
  */


function getJobsData()
/*: Promise*/
{
  return _CoreManager.default.getCloudController().getJobsData({
    useMasterKey: true
  });
}
/**
  * Starts a given cloud job, which will process asynchronously.
  * @method startJob
  * @name Parse.Cloud.startJob
  * @param {String} name The function name.
  * @param {Object} data The parameters to send to the cloud function.
  * @return {Promise} A promise that will be resolved with the result
  * of the function.
  */


function startJob(name
/*: string*/
, data
/*: mixed*/
)
/*: Promise*/
{
  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud job name must be a string.');
  }

  return _CoreManager.default.getCloudController().startJob(name, data, {
    useMasterKey: true
  });
}
/**
  * Gets job status by Id
  * @method getJobStatus
  * @name Parse.Cloud.getJobStatus
  * @param {String} jobStatusId The Id of Job Status.
  * @return {Parse.Object} Status of Job.
  */


function getJobStatus(jobStatusId
/*: string*/
)
/*: Promise*/
{
  const query = new _ParseQuery.default('_JobStatus');
  return query.get(jobStatusId, {
    useMasterKey: true
  });
}

const DefaultController = {
  run(name, data, options) {
    const RESTController = _CoreManager.default.getRESTController();

    const payload = (0, _encode.default)(data, true);
    const request = RESTController.request('POST', 'functions/' + name, payload, options);
    return request.then(res => {
      if (typeof res === 'object' && Object.keys(res).length > 0 && !res.hasOwnProperty('result')) {
        throw new _ParseError.default(_ParseError.default.INVALID_JSON, 'The server returned an invalid response.');
      }

      const decoded = (0, _decode.default)(res);

      if (decoded && decoded.hasOwnProperty('result')) {
        return Promise.resolve(decoded.result);
      }

      return Promise.resolve(undefined);
    });
  },

  getJobsData(options) {
    const RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'cloud_code/jobs/data', null, options);
  },

  startJob(name, data, options) {
    const RESTController = _CoreManager.default.getRESTController();

    const payload = (0, _encode.default)(data, true);
    return RESTController.request('POST', 'jobs/' + name, payload, options);
  }

};

_CoreManager.default.setCloudController(DefaultController);