import * as yup from "yup";

// TODO: attachments

const MAX_IMAGE_SIZE = 1048576; //1MB
const MAX_PHOTO_SIZE = 5242880; //5MB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const colleagueSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Name is required"),
  position: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Position is required"),
  phone: yup.string(),
  email: yup.string(),
  photo: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) =>
      value ? isValidFileType(value.name.toLowerCase(), "image") : true
    )
    .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const commentSchema = yup.object().shape({
  author: yup
    .string()
    .min(4, "Too short. Min 4 characters")
    .max(25, "Max 25 characters"),
  body: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .max(700, "Max 700 characters")
    .required("Text is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const newsSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Title is required"),
  body: yup.string().min(10, "Too short. Min 10 characters"),
  date: yup.string().required("Date is required"),
  links: yup.array().of(yup.string().min(5, "Too short. Min 5 characters")),
  image: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) =>
      value ? isValidFileType(value.name.toLowerCase(), "image") : true
    )
    .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const photoAlbumSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .max(80, "Max 80 characters")
    .required("Title is required"),
  cover: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) =>
      value ? isValidFileType(value.name.toLowerCase(), "image") : true
    )
    .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
  photos: yup.array().of(
    yup
      .mixed()
      .test("is-valid-type", "Not a valid image type", (value) =>
        value ? isValidFileType(value.name.toLowerCase(), "image") : true
      )
      .test("is-valid-size", "Max allowed size is 5MB", (value) =>
        value ? value.size <= MAX_PHOTO_SIZE : true
      )
  ),
});

const postSchema = yup.object().shape({
  body: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Text is required"),
});

const publicationSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Title is required"),
  year: yup.string().required("Year is required"),
  sequence_number: yup
    .number()
    .required("Sequence number is required")
    .test(
      "Is positive?",
      "Number must be greater than 0",
      (value) => value > 0
    ),
  source: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Source is required"),
  source_url: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("URL is required"),
  authors: yup
    .array()
    .of(
      yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("Author is required")
    ),
  cover: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) =>
      value ? isValidFileType(value.name.toLowerCase(), "image") : true
    )
    .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
  abstract: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", (value) =>
      value ? isValidFileType(value.name.toLowerCase(), "image") : true
    )
    .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : true
    ),
});

const researchSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Title is required"),
  sourceList: yup.array().of(
    yup.object().shape({
      source: yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("Source is required"),
      source_url: yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("URL is required"),
    })
  ),
  illustrationList: yup.array().of(
    yup.object().shape({
      description: yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("Description is required"),
      sequence_number: yup
        .number()
        .required("Sequence number is required")
        .test(
          "Is positive?",
          "Number must be greater than 0",
          (value) => value > 0
        ),
      //     schema: yup
      //       .mixed()
      //       .test("is-valid-type", "Not a valid image type", (value) =>
      //         value ? isValidFileType(value.name.toLowerCase(), "image") : true
      //       )
      //       .test("is-valid-size", "Max allowed size is 1MB", (value) =>
      //         value ? value.size <= MAX_IMAGE_SIZE : true
      //       ),
    })
  ),
});

const editResearchSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Title is required"),
  sourceList: yup.array().of(
    yup.object().shape({
      source: yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("Source is required"),
      source_url: yup
        .string()
        .min(5, "Too short. Min 5 characters")
        .required("URL is required"),
    })
  ),
});

const editIllustrationSchema = yup.object().shape({
  description: yup
    .string()
    .min(5, "Too short. Min 5 characters")
    .required("Description is required"),
  sequence_number: yup
    .number()
    .required("Sequence number is required")
    .test(
      "Is positive?",
      "Number must be greater than 0",
      (value) => value > 0
    ),
});

export const validation = {
  colleagueSchema,
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
