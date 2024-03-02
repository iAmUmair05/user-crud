import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstName: Yup.string().min(2).max(20).required("Please enter your first name"),
  lastName: Yup.string().min(2).max(20).required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});


export const signInSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });


  export const addNotes = Yup.object({
    title: Yup.string().min(1).max(30).required("Title should not be less than 1 and more than 30 character"),
    description: Yup.string().min(5).max(100).required("Desciption should not be less than 5 and more than 100 character"),
  });

  export const editNotes = Yup.object({
    title: Yup.string().min(2).max(15).required("Title should not be less than 2 and more than 15 character"),
    description: Yup.string().min(5).max(50).required("Desciption should not be less than 5 and more than 50 character"),
  });