import * as yup from "yup";

// TODO: attachments

const newsSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  body: yup.string().min(10, "Too short"),
  date: yup.string().required("Required"),
  links: yup.array().of(yup.string().min(5, "Too short")),
});

const colleagueSchema = yup.object().shape({
  name: yup.string().min(5, "Too short").required("Name is required"),
  position: yup.string().min(5, "Too short").required("Required"),
  phone: yup.string(),
  email: yup.string(),
  photo: yup.mixed().required("File is required"),
});

const publicationSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  year: yup.string().max(4, "Select an year").required("Year is required"),
  source: yup.string().min(5, "Too short").required("Required"),
  source_url: yup.string().min(5, "Too short").required("Required"),
  authors: yup
    .array()
    .of(yup.string().min(5, "Too short").required("Required")),
});

const researchSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
  sourceList: yup.array().of(
    yup.object().shape({
      source: yup.string().min(5, "Too short").required("Required"),
      source_url: yup.string().min(5, "Too short").required("Required"),
    })
  ),
  illustrationList: yup.array().of(
    yup.object().shape({
      description: yup.string().min(5, "Too short").required("Required"),
      schema: yup.mixed().required("File is required"),
    })
  ),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Email required"),
  password: yup.string().required("Password required"),
});

export const validation = {
  newsSchema,
  colleagueSchema,
  publicationSchema,
  researchSchema,
  loginSchema,
};
