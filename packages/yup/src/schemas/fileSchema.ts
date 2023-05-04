import { InferType, number, object, string } from 'yup';

const MAX_IMAGE_SIZE = Number(process.env.MAX_IMAGE_SIZE || 1);
const MAX_VIDEO_SIZE = Number(process.env.MAX_VIDEO_SIZE || 50);

const createFileUrlSchema = object({
  type: string()
    .oneOf([
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/bmp',
      'video/mp4',
      'video/quicktime',
      'video/x-ms-wmv',
      'video/x-msvideo',
      'video/mpeg',
    ])
    .label('File type')
    .required(),
  size: number()
    .moreThan(0)
    .label('File size')
    .when('type', {
      is: (type: string) => type && type.startsWith('image'),
      then: (schema) =>
        schema.max(
          MAX_IMAGE_SIZE * 1024 * 1024,
          `Image size should be smaller than ${MAX_IMAGE_SIZE}mb`,
        ),
      otherwise: (schema) =>
        schema.max(
          MAX_VIDEO_SIZE * 1024 * 1024,
          `Video size should be smaller than ${MAX_VIDEO_SIZE}mb`,
        ),
    })
    .required(),
});

interface CreateFileUrlPayload extends InferType<typeof createFileUrlSchema> {}

interface CreateFileUrlFullResponse {
  status: 'success';
  data: {
    url: string;
    key: string;
    size: string;
    type: string;
  };
}

interface GetManyFilesFullReponse {
  status: 'success';
  data: {
    IsTruncated: boolean;
    results: number;
    lastKey: string;
    keys: {
      key: string;
      size: number;
    };
  };
}

export { createFileUrlSchema };
export type {
  CreateFileUrlPayload,
  CreateFileUrlFullResponse,
  GetManyFilesFullReponse,
};
