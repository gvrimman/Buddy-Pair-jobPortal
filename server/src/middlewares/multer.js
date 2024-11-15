const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");

// Initialize S3 Client
const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

// Configure multer with S3
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.S3_BUCKET_NAME,
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, Date.now().toString() + "-" + file.originalname);
		},
	}),
});

module.exports = { upload };
