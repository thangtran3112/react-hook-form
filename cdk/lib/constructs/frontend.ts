import { Construct } from "constructs";
import { RemovalPolicy, Stack } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  IBucket,
} from "aws-cdk-lib/aws-s3";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { NodejsBuild } from "deploy-time-build";

export interface FrontendProps {
  readonly accessLogBucket: IBucket;
}

export class Frontend extends Construct {
  readonly cloudFrontWebDistribution: CloudFrontWebDistribution;
  constructor(scope: Construct, id: string, props: FrontendProps) {
    super(scope, id);

    const assetBucket = new Bucket(this, `AssetBucket${id}`, {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      `OriginAccessIdentity${id}`
    );
    const distribution = new CloudFrontWebDistribution(
      this,
      `Distribution${id}`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: assetBucket,
              originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            errorCachingMinTtl: 0,
            responseCode: 200,
            responsePagePath: "/",
          },
          {
            errorCode: 403,
            errorCachingMinTtl: 0,
            responseCode: 200,
            responsePagePath: "/",
          },
        ],
        loggingConfig: {
          bucket: props.accessLogBucket,
          prefix: "Frontend/",
        },
      }
    );

    new NodejsBuild(this, `FrontEndMui${id}`, {
      assets: [
        {
          path: "../frontend-mui",
          exclude: ["node_modules", "dist"],
          commands: ["npm ci"],
          // prevent too frequent frontend deployment, for temporary use
          // assetHash: 'frontend_asset',
        },
      ],
      buildCommands: ["npm run bundle"],
      destinationBucket: assetBucket,
      distribution,
      outputSourceDirectory: "dist",
    });

    this.cloudFrontWebDistribution = distribution;
  }
}
