import * as yup from "yup";

export const editProductSchema = yup.object().shape({
  img: yup.string().required("Image path is required"),
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must have at least 3 characters")
    .max(50, "Name can't have more than 50 characters"),
  brand: yup
    .string()
    .required("Brand is required")
    .min(3, "Brand must have at least 3 characters")
    .max(20, "Brand can't have more than 30 characters"),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Please add at least one product"),
  description: yup
    .string()
    .required("Description is required")
    .min(15, "Description must have at least 15 characters")
    .max(1200, "Description can't have more than 1200 characters"),
});
