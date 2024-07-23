import { S3Client } from '@aws-sdk/client-s3';

export const S3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_pUBLIC_AMAZON_S3_ACCESS_KEY as string,
        secretAccessKey: process.env.NEXT_pUBLIC_AMAZON_S3_SECRET_KEY as string
    }
})