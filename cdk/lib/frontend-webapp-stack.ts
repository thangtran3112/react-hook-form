import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Frontend } from "./constructs/frontend";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";

export class ReactHookFormWebappStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      description: "ReactHookForm webapp stack",
      ...props,
    });

    const accessLogBucket = new Bucket(this, "ReactHookForm", {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      autoDeleteObjects: true,
    });

    const frontend = new Frontend(this, "ReactHookFormFrontEnd", {
      accessLogBucket,
    });
    new CfnOutput(this, "FrontendDomainName", {
      value: `https://${frontend.cloudFrontWebDistribution.distributionDomainName}`,
    });
  }
}
