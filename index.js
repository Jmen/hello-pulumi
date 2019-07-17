"use strict";
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

const regions = ['eu-west-1', 'us-east-1', 'ap-southeast-2']

for (const region of regions) {

    const provider = new aws.Provider(`provider-${region}`, { region });


    const helloWorldHandler = () => async (event) => {
        return {
            statusCode: 200,
            body: JSON.stringify({hello: "from aws api"}),
        };
    };

    let endpoint = new awsx.apigateway.API(`aws-api-${region}`, {
        routes: [{
            path: "/",
            method: "GET",
            eventHandler: helloWorldHandler(),
        },{
            path: "/{route+}",
            method: "GET",
            eventHandler: helloWorldHandler(),
        }],
    }, { provider });

    exports["aws_url" + region] = endpoint.url;

}

const cloud = require("@pulumi/cloud");
const api = new cloud.API("cloud-api");

api.get("/", (request, result) => {
    result.json({ hello: "from cloud api" });
});

api.get("/{route+}", (request, result) => {
    result.json({ hello: "from cloud api" });
});

exports.cloud_url = api.publish().url;