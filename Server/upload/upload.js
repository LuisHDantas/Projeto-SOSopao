import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";

const accessKeyId = process.env["MINIO_ACCESS_KEY"];
const secretAccessKey = process.env["MINIO_SECRET_KEY"];

const minioUrl = "http://localhost:9000/";
const bucket = "image-bucket"

const s3 = new S3Client({
    endpoint: minioUrl,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
});

const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        acl: "public-read",
        key: function (request, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),
});

async function getFileUrl(fileName) {
    return minioUrl + bucket + "/" + fileName;
}

export default { uploadFile, getFileUrl };