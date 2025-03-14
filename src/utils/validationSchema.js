import { object, string, number, array, mixed } from 'yup';
import { collaboratorsCategories } from '@/pages/collaborators/helpers/constants';

// TODO: validate illustration attachments

const MAX_IMAGE_SIZE = 1048576; //*1MB
const MAX_SMALL_IMAGE_SIZE = 512000; //*500KB
const MAX_PHOTO_SIZE = 5242880; //*5MB

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

const collaboratorSchema = object().shape({
  name: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Name is required'),
  position: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Position is required'),
  link: string().nullable(),
  category: string()
    .oneOf(Object.values(collaboratorsCategories), 'Invalid category')
    .required('Category is required'),
  photo: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 1MB', (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const commentSchema = object().shape({
  author: string()
    .min(4, 'Too short. Min 4 characters')
    .max(25, 'Max 25 characters'),
  body: string()
    .min(5, 'Too short. Min 5 characters')
    .max(700, 'Max 700 characters')
    .required('Text is required'),
  commentImage: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 500KB', (value) =>
      value ? value.size <= MAX_SMALL_IMAGE_SIZE : true
    ),
});

const loginSchema = object().shape({
  email: string().required('Email is required'),
  password: string().required('Password is required'),
});

const newsSchema = object().shape({
  title: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Title is required'),
  body: string().min(10, 'Too short. Min 10 characters'),
  date: string()
    .required('Date is required')
    .matches(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/,
      'Invalid date format. Format should be Month Day, Year'
    ),
  links: array().of(string().min(5, 'Too short. Min 5 characters')),
  image: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 1MB', (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const photoAlbumSchema = object().shape({
  title: string()
    .min(5, 'Too short. Min 5 characters')
    .max(80, 'Max 80 characters')
    .required('Title is required'),
  cover: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 1MB', (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
  photos: array().of(
    mixed()
      .test('is-valid-type', 'Not a valid image type', (value) =>
        value ? isValidFileType(value.name.toLowerCase(), 'image') : true
      )
      .test('is-valid-size', 'Max allowed size is 5MB', (value) =>
        value ? value.size <= MAX_PHOTO_SIZE : true
      )
  ),
});

const postSchema = object().shape({
  body: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Text is required'),
});

const publicationSchema = object().shape({
  title: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Title is required'),
  year: string().required('Year is required'),
  sequence_number: number()
    .required('Sequence number is required')
    .test(
      'Is positive?',
      'Number must be greater than 0',
      (value) => value > 0
    ),
  source: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Source is required'),
  source_url: string()
    .min(5, 'Too short. Min 5 characters')
    .required('URL is required'),
  authors: array().of(
    string()
      .min(5, 'Too short. Min 5 characters')
      .required('Author is required')
  ),
  cover: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 1MB', (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
  abstract: mixed()
    .test('is-valid-type', 'Not a valid image type', (value) =>
      value ? isValidFileType(value.name.toLowerCase(), 'image') : true
    )
    .test('is-valid-size', 'Max allowed size is 1MB', (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const researchSchema = object().shape({
  title: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Title is required'),
  sourceList: array().of(
    object().shape({
      source: string()
        .min(5, 'Too short. Min 5 characters')
        .required('Source is required'),
      source_url: string()
        .min(5, 'Too short. Min 5 characters')
        .required('URL is required'),
    })
  ),
  illustrationList: array().of(
    object().shape({
      description: string()
        .min(5, 'Too short. Min 5 characters')
        .required('Description is required'),
      sequence_number: number()
        .required('Sequence number is required')
        .test(
          'Is positive?',
          'Number must be greater than 0',
          (value) => value > 0
        ),
      //     schema: mixed()
      //       .test("is-valid-type", "Not a valid image type", (value) =>
      //         value ? isValidFileType(value.name.toLowerCase(), "image") : true
      //       )
      //       .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      //         value ? value.size <= MAX_IMAGE_SIZE : true
      //       ),
    })
  ),
});

const editResearchSchema = object().shape({
  title: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Title is required'),
  sourceList: array().of(
    object().shape({
      source: string()
        .min(5, 'Too short. Min 5 characters')
        .required('Source is required'),
      source_url: string()
        .min(5, 'Too short. Min 5 characters')
        .required('URL is required'),
    })
  ),
});

const editIllustrationSchema = object().shape({
  description: string()
    .min(5, 'Too short. Min 5 characters')
    .required('Description is required'),
  sequence_number: number()
    .required('Sequence number is required')
    .test(
      'Is positive?',
      'Number must be greater than 0',
      (value) => value > 0
    ),
});

export const validation = {
  collaboratorSchema,
  commentSchema,
  editResearchSchema,
  editIllustrationSchema,
  loginSchema,
  newsSchema,
  photoAlbumSchema,
  postSchema,
  publicationSchema,
  researchSchema,
};
