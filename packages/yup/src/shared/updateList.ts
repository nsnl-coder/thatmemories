import { array, object, string } from 'yup';

const updateList = object({
  updateList: array()
    .of(string().length(24, 'Invalid objectid'))
    .min(1)
    .required(),
});

export { updateList };
