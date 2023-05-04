const getS3FileUrl = (key: string) => {
  return `${process.env.NEXT_PUBLIC_S3_BUCKET}/${key}`;
};

export default getS3FileUrl;
