import * as yup from "yup";

// TODO: validate array items, attachments

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
});

const publicationSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Title is required"),
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

export const validation = {
  newsSchema,
  colleagueSchema,
  publicationSchema,
  researchSchema,
};
