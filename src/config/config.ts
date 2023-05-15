/* eslint-disable prettier/prettier */
import { registerAs } from "@nestjs/config";

export const config = registerAs('database', ()=>({
    mongoDB_Uri: process.env.MONGODB_URI || 'mongodb+srv://adewunmi:ELYDEV@auth.xzfasts.mongodb.net/?retryWrites=true&w=majority',
  Jwt_Secret: process.env.JWT_SECRET,
  port: process.env.PORT || 8080,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_s3_region: process.env.AWS_S3_REGION,
  aws_s3_bucket_name: process.env.AWS_S3_BUCKET_NAME
  

}))