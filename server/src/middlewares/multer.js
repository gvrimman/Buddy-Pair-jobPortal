const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

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
		acl: "public-read",
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname, originalname: file.originalname });
		},
		key: (req, file, cb) => {
			const userId = req.user._id;
			const randomString = crypto.randomBytes(6).toString("hex");
			const currentDate = new Date().toISOString().replace(/:/g, "-"); // Format date to avoid issues with colons
			const uniqueName = `${file.fieldname}/${userId}_${randomString}_${currentDate}${path.extname(
				file.originalname
			)}`;
			cb(null, uniqueName);
		},
	}),
});

module.exports = { upload };
