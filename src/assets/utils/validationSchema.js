import * as yup from "yup";

const newsSchema = yup.object().shape({
  title: yup.string().min(2, "Too short").required("Required"),
  body: yup.string().min(2, "Too short"),
  date: yup.string().required("Required"),
  link: yup.string(),
});

const colleagueSchema = yup.object().shape({
  name: yup.string().min(2, "Too short").required("Required"),
  position: yup.string().min(2, "Too short").required("Required"),
  phone: yup.string(),
  email: yup.string(),
});

export const validation = {
  newsSchema,
  colleagueSchema,
};
