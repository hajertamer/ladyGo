const yup = require('yup');

const addUserSchema = yup.object({
  name: yup.string().required("name is required").min(3,"name min char is 3").max(30, "name max char is 30"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
}).required();

module.exports = addUserSchema