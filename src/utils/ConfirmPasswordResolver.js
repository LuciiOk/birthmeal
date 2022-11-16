import * as Yup from "yup";

export const ConfirmPasswordResolver = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres")
    .matches(/^[a-zA-Z ]*$/, "El nombre solo puede contener letras"),
  email: Yup.string()
    .required("El email es requerido")
    .email("El correo electrónico no es válido")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "El correo electrónico no es válido"
    ),
  birthdate: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .max(
      new Date(),
      "La fecha de nacimiento no puede ser mayor a la fecha actual"
    ),
  conditionTerms: Yup.boolean().oneOf(
    [true],
    "Debes aceptar los términos y condiciones"
  ),
});

// only confirm password
export const RecoverPassword = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("El email es requerido")
    .email("El correo electrónico no es válido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const AddBirthdaySchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener menos de 20 caracteres")
    .matches(/^[a-zA-Z ]*$/, "El nombre solo puede contener letras"),
  birthdate: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .max(
      new Date(),
      "La fecha de nacimiento no puede ser mayor a la fecha actual"
    ),
  remind: Yup.boolean(),
});
