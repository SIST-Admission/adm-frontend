import AWS from 'aws-sdk';

//AWS CONFIGURATION
AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: "AKIA25CQWQYOR6V2PMGN",
  secretAccessKey: "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",
  region: "us-east-1",
});

let s3 = new AWS.S3();

export const putFileToAws = (Key, Body, ContentType) => {
  return new Promise((resolve, reject) => {
    try {
      s3.upload(
        {
          Bucket: "sistadm",
          Key,
          Body,
          ContentType,
          ACL: "public-read",
        },
        (err, data) => {
          if (err){
            reject(err);
          }else{
            resolve(data);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
  };