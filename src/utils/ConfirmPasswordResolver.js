import * as Yup from "yup";

export const ConfirmPasswordResolver = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  name: Yup.string().required("El nombre es requerido"),
  email: Yup.string()
    .required("El email es requerido")
    .email("El correo electrónico no es válido"),
  birthdate: Yup.date().required("La fecha de nacimiento es requerida"),
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
