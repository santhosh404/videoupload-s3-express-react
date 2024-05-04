const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const app = express();

const s3Client = new S3Client({
    region: "us-east-1"
});


app.use(cors());
const upload = multer();

app.post("/upload", upload.single('file'), async (req, res) => {

    try {
        const file = req.file;

        if (!file) {
            res.status(500).json({
                status: "Error",
                message: "File upload failed",
            });
        }

        const uploadParams = {
            Bucket: "videosupload0405",
            Key: file.originalname,
            Body: file.buffer
        };

        const data = await s3Client.send(new PutObjectCommand(uploadParams));

        // Construct S3 URL
        const s3Url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

        res.status(200).json({
            status: "Success",
            message: "File uploaded successfully",
            data: {
                fileUrl: s3Url,
                fileName: uploadParams.Key
            }
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Error",
            message: "File upload failed",
        });
    }
})


app.get('/hello', (req, res) => {
    res.status(200).json({ message: "hello" })
})



app.listen(4000, () => {
    console.log('server started');
})
