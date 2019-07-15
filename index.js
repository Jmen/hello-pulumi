"use strict";
const awsx = require("@pulumi/awsx");

const helloWorldHandler = () => async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({hello: "from aws api"}),
    };
};

let endpoint = new awsx.apigateway.API("aws-api", {
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

exports.aws_url = endpoint.url;





const cloud = require("@pulumi/cloud");
const api = new cloud.API("cloud-api");

api.get("/", (request, result) => {
    result.json({ hello: "from cloud api" });
});

api.get("/{route+}", (request, result) => {
    result.json({ hello: "from cloud api" });
});

exports.cloud_url = api.publish().url;