import * as yup from "yup";

const newsSchema = yup.object().shape({
  title: yup.string().min(2, "Too short").required(true, "Required"),
  body: yup.string().min(2, "Too short"),
  date: yup.string().required("Required"),
  link: yup.string(),
});

export const validation = {
  newsSchema,
};
