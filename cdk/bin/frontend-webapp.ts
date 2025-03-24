#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ReactHookFormWebappStack } from "../lib/frontend-webapp-stack";

const app = new cdk.App();

const AWS_ACCOUNT = "654654352356";
const AWS_REGION = "us-west-2";
new ReactHookFormWebappStack(app, "ReactHookFormApp", {
  env: {
    account: AWS_ACCOUNT,
    region: AWS_REGION,
  },
});

// import { Aspects } from 'aws-cdk-lib';
// import { AwsSolutionsChecks } from 'cdk-nag';
// Aspects.of(app).add(new AwsSolutionsChecks());
