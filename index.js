"use strict";
const awsx = require("@pulumi/awsx");

const helloWorldHandler = () => async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({hello: "world"}),
    };
};

let endpoint = new awsx.apigateway.API("hello-world", {
    routes: [{
        path: "/",
        method: "GET",
        eventHandler: helloWorldHandler(),
    },{
        path: "/{route+}",
        method: "GET",
        eventHandler: helloWorldHandler(),
    }],
});

exports.endpoint = endpoint.url;
