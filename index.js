"use strict";
//const pulumi = require("@pulumi/pulumi");

const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

let endpoint = new awsx.apigateway.API("hello-world", {
    routes: [{
        path: "/{route+}",
        method: "GET",
        eventHandler: async (event) => {
            return {
                statusCode: 200,
                body: JSON.stringify({ hello: "world" }),
            };
        }
    }]
});

exports.endpoint = endpoint.url;
