/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }


    // extract endpoint and path from url
    var invokeUrl = 'https://15f0h4dk32.execute-api.us-east-1.amazonaws.com/KKR_DEV';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



    apigClient.createuserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'user_name'], ['body']);

        var createuserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/createuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'user_name']),
            body: body
        };


        return apiGatewayClient.makeRequest(createuserPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.createuserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var createuserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/createuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(createuserOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.dataloadshowanddeleteGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'load_time', 'file_name'], ['body']);

        var dataloadshowanddeleteGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/dataloadshowanddelete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'load_time', 'file_name']),
            body: body
        };


        return apiGatewayClient.makeRequest(dataloadshowanddeleteGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.dataloadshowanddeleteOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var dataloadshowanddeleteOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataloadshowanddelete').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(dataloadshowanddeleteOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.dataloadstatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName'], ['body']);

        var dataloadstatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/dataloadstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName']),
            body: body
        };


        return apiGatewayClient.makeRequest(dataloadstatusGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.dataloadstatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var dataloadstatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dataloadstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(dataloadstatusOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.etljobstatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var etljobstatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/etljobstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(etljobstatusGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.etljobstatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var etljobstatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/etljobstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(etljobstatusOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.etljobstatusJobrunstatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['jobName'], ['body']);

        var etljobstatusJobrunstatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/etljobstatus/jobrunstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['jobName']),
            body: body
        };


        return apiGatewayClient.makeRequest(etljobstatusJobrunstatusGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.etljobstatusJobrunstatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var etljobstatusJobrunstatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/etljobstatus/jobrunstatus').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(etljobstatusJobrunstatusOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.getApplicationNameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var getApplicationNameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/getApplicationName').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(getApplicationNameGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.getApplicationNameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var getApplicationNameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/getApplicationName').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(getApplicationNameOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.reportGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'year', 'qtr'], ['body']);

        var reportGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/report').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'year', 'qtr']),
            body: body
        };


        return apiGatewayClient.makeRequest(reportGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.reportOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var reportOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/report').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(reportOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.reportusagedetailsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName'], ['body']);

        var reportusagedetailsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/reportusagedetails').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName']),
            body: body
        };


        return apiGatewayClient.makeRequest(reportusagedetailsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.reportusagedetailsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var reportusagedetailsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/reportusagedetails').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(reportusagedetailsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spRoleManagementGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName'], ['body']);

        var spRoleManagementGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sp-role-management').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName']),
            body: body
        };


        return apiGatewayClient.makeRequest(spRoleManagementGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spRoleManagementOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var spRoleManagementOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sp-role-management').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(spRoleManagementOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spUsageDetailsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'loggedin_user_name', 'last_usage_date'], ['body']);

        var spUsageDetailsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/sp-usage-details').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'loggedin_user_name', 'last_usage_date']),
            body: body
        };


        return apiGatewayClient.makeRequest(spUsageDetailsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spUsageDetailsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var spUsageDetailsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sp-usage-details').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(spUsageDetailsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spcreatebtnvisibilityGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'loggedin_user_name'], ['body']);

        var spcreatebtnvisibilityGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/spcreatebtnvisibility').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'loggedin_user_name']),
            body: body
        };


        return apiGatewayClient.makeRequest(spcreatebtnvisibilityGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spcreatebtnvisibilityOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var spcreatebtnvisibilityOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/spcreatebtnvisibility').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(spcreatebtnvisibilityOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spdeleteuserPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'user_to_delete'], ['body']);

        var spdeleteuserPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/spdeleteuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'user_to_delete']),
            body: body
        };


        return apiGatewayClient.makeRequest(spdeleteuserPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.spdeleteuserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var spdeleteuserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/spdeleteuser').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(spdeleteuserOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.triggerjobPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['TriggerJob'], ['body']);

        var triggerjobPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/triggerjob').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['TriggerJob']),
            body: body
        };


        return apiGatewayClient.makeRequest(triggerjobPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.triggerjobOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var triggerjobOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/triggerjob').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(triggerjobOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usermanagementroleGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName'], ['body']);

        var usermanagementroleGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/usermanagementrole').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName']),
            body: body
        };


        return apiGatewayClient.makeRequest(usermanagementroleGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.usermanagementroleOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var usermanagementroleOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/usermanagementrole').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(usermanagementroleOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userroleGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['SPName', 'user'], ['body']);

        var userroleGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/userrole').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['SPName', 'user']),
            body: body
        };


        return apiGatewayClient.makeRequest(userroleGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userroleOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var userroleOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/userrole').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userroleOptionsRequest, authType, additionalParams, config.apiKey);
    };


    return apigClient;
};
