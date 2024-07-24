'use server'

import { auth } from "@/auth";
import { S3 } from "@/storage/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export async function getSignedURL(){
    const session = await auth();
    if(!session){
        return { failure: "Not authenticated" }
    }

    const img_key = generateFileName();

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: img_key,
    });

    const signedURL = await getSignedUrl(S3, putObjectCommand, {
        expiresIn: 60,
    });

    return { success: { url: signedURL, img_key } };
};

export const deleteImage = async (img_key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: img_key,
    });

    try {
        const response = await S3.send(command);
    } catch (error) {
        console.error(error);
        return { error: 'failed to delete' };
    }

    return { success: "Deleted successfully" };
}