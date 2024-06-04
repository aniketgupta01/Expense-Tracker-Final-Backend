const AWS = require('aws-sdk');

exports.uploadToS3 = (data, filename) =>{ 
    const bucketName = process.env.BUCKET_NAME;
    const userKey = process.env.AWS_IAM_USER_KEY;
    const userSecretKey = process.env.AWS_IAM_USER_SECRET

    let s3bucket = new AWS.S3({
        accessKeyId:userKey,
        secretAccessKey:userSecretKey
    })
    
        var params = {
            Bucket:bucketName,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }

        return new Promise((resolve,reject) => {
            s3bucket.upload(params,(err,s3response) => {
                if(err){
                    console.log("Something went wrong",err)
                    reject(err)
                }
                else{
                    resolve(s3response.Location)
                }
                
            })

        })
        
        
    


}