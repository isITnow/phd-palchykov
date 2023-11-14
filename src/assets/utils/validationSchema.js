import * as yup from "yup";

// TODO: attachments

const colleagueSchema = yup.object().shape({
  name: yup.string().min(5, "Too short").required("Name is required"),
  position: yup.string().min(5, "Too short").required("Position is required"),
  phone: yup.string(),
  email: yup.string(),
  // photo: yup.mixed().required("File is required"),
});

const commentSchema = yup.object().shape({
  author: yup.string().min(4, "Too short").max(25, "Max 25 characters"),
  body: yup
    .string()
    .min(5, "Too short")
    .max(700, "Max 700 characters")
    .required("Text is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const newsSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  body: yup.string().min(10, "Too short"),
  date: yup.string().required("Date is required"),
  links: yup.array().of(yup.string().min(5, "Too short")),
});

const photoAlbumSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "To short")
    .max(80, "Max 80 characters")
    .required("Title is required"),
});

const postSchema = yup.object().shape({
  body: yup.string().min(5, "To short").required("Text is required"),
});

const publicationSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  year: yup.string().required("Year is required"),
  sequence_number: yup
    .number()
    .required("Sequence number is required")
    .test(
      "Is positive?",
      "Number must be greater than 0",
      (value) => value > 0
    ),
  source: yup.string().min(5, "Too short").required("Source is required"),
  source_url: yup.string().min(5, "Too short").required("URL is required"),
  authors: yup
    .array()
    .of(yup.string().min(5, "Too short").required("Author is required")),
});

const researchSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  sourceList: yup.array().of(
    yup.object().shape({
      source: yup.string().min(5, "Too short").required("Source is required"),
      source_url: yup.string().min(5, "Too short").required("URL is required"),
    })
  ),
  illustrationList: yup.array().of(
    yup.object().shape({
      description: yup
        .string()
        .min(5, "Too short")
        .required("Description is required"),
      sequence_number: yup
        .number()
        .required("Sequence number is required")
        .test(
          "Is positive?",
          "Number must be greater than 0",
          (value) => value > 0
        ),
      // schema: yup.mixed().required("File is required"),
    })
  ),
});

const editResearchSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  sourceList: yup.array().of(
    yup.object().shape({
      source: yup.string().min(5, "Too short").required("Source is required"),
      source_url: yup.string().min(5, "Too short").required("URL is required"),
    })
  ),
});

const editIllustrationSchema = yup.object().shape({
  description: yup
    .string()
    .min(5, "Too short")
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
