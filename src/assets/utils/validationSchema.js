import * as yup from "yup";

const newsSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Required"),
  body: yup.string().min(10, "Too short"),
  date: yup.string().required("Required"),
  link: yup.string(),
});

const colleagueSchema = yup.object().shape({
  name: yup.string().min(5, "Too short").required("Required"),
  position: yup.string().min(5, "Too short").required("Required"),
  phone: yup.string(),
  email: yup.string(),
});

const publicationSchema = yup.object().shape({
  title: yup.string().min(5, "Too short").required("Required"),
  source: yup.string().min(5, "Too short").required("Required"),
  source_url: yup.string().min(5, "Too short").required("Required"),
  // author: yup.string().min(5, "Too short").required("Required"),
});

const researchSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  source: yup.string().required("Required"),
  source_url: yup.string().required("Required"),
});

export const validation = {
  newsSchema,
  colleagueSchema,
  publicationSchema,
  researchSchema,
};
