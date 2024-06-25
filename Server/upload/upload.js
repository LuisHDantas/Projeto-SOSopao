import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multer from "multer";
import multerS3 from "multer-s3";

const accessKeyId = process.env["MINIO_ACCESS_KEY"];
const secretAccessKey = process.env["MINIO_SECRET_KEY"];

const minioUrl = "http://127.0.0.1:9000/";
const bucket = "image-bucket"

const s3 = new S3Client({
    endpoint: minioUrl,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    region: 'us-east-1',
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

function getFileUrl(fileName) {
    return minioUrl + bucket + "/" + fileName;
}

function getFileNameFromUrl(fileUrl) {
    const prefix = `${minioUrl}${bucket}/`;
    if (fileUrl.startsWith(prefix)) {
        return fileUrl.substring(prefix.length);
    } else {
        throw new Error('URL da imagem inválida');
    }
}

async function deleteFile(fileUrl) {
    let fileName = getFileNameFromUrl(fileUrl);
    
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileName
    });

    try {
        await s3.send(command);
        console.log(`Arquivo ${fileName} deletado com sucesso`);
    } catch (error) {
        console.error(`Erro ao deletar arquivo ${fileName}:`, error);
        throw new Error('Erro ao apagar a imagem');
    }
}

export default { uploadFile, getFileUrl, deleteFile };