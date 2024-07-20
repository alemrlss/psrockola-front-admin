import { useState, useRef, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import api from "../../api/api";
import ReCaptcha from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Image from "/logo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../features/authSlice";
import { Typography } from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const captcha = useRef(null);

  const [codeSendend, setcodeSendend] = useState(false);
  const [codeSendendText, setcodeSendendText] = useState("");

  const goTo = useNavigate();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Detectar idioma del navegador
  useEffect(() => {
    const userLanguages = navigator.languages;
    const supportedLanguages = ["es", "en", "pt"];

    const foundLanguage = userLanguages.find((language) =>
      supportedLanguages.includes(language.split("-")[0])
    );

    if (foundLanguage) {
      setSelectedLanguage(foundLanguage.split("-")[0]);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setError("");
    dispatch({ type: "auth/clearError" }); // Limpiar el error al cambiar el formulario

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "auth/clearError" }); // Limpiar el error al cambiar el formulario

    if (!captcha.current.getValue()) {
      setError(translations[selectedLanguage].captchaError);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError(translations[selectedLanguage].invalidEmail);
      return;
    }

    if (formData.password.length < 8) {
      setError(translations[selectedLanguage].invalidPassword);
      return;
    }

    // Agregar lógica para manejar el envsío del código por correo electrónico
    if (formData.code) {
      console.log(`Código enviado a ${formData.email}: ${formData.code}`);
    }

    try {
      dispatch(loginAdmin(formData))
        .then((result) => {
          if (result.payload && result.payload.token) {
            goTo("/dashboard");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("test");
        });
    } catch (error) {
      console.log(error);
      if (typeof error.response.data.message === "string") {
        setError(`* - ${error.response.data.message}`);
      } else if (Array.isArray(error.response.data.message)) {
        setError(`* - ${error.response.data.message[0]}`);
      } else {
        setError(translations[selectedLanguage].somethingWentWrong);
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onChange = () => {
    setError("");
  };

  const handleSendCode = async () => {
    try {
      if (!validateEmail(formData.email)) {
        setError(translations[selectedLanguage].invalidEmail);
        return;
      }

      const response = await api.post("/auth/send-code-admin", {
        email: formData.email,
      });
      setcodeSendend(true);
      setcodeSendendText(response.data.data);

      console.log(`Código enviado a ${formData.email}`);
    } catch (error) {
      console.log(error);
      setError("* - " + error.response.data.message);
    }
  };

  const translations = {
    en: {
      login: "Log in",
      signIn: "Sign in as an Admin",
      email: "Email",
      password: "Password",
      adminCode: "Admin Code",
      submit: "Log in",
      sendCode: "Send Code",
      loading: "Loading...",
      completeFields: "Please complete all fields.",
      invalidEmail: "Please, enter a valid email",
      invalidPassword: "Please, enter a valid password (min 8 characters)",
      captchaError: "Please, check the captcha",
      somethingWentWrong: "Something went wrong!",
      start: "Let's get started!",
      codeSent: "Code sent to",
    },
    es: {
      login: "Iniciar sesión",
      signIn: "Iniciar sesión como Administrador",
      email: "Correo electrónico",
      password: "Contraseña",
      adminCode: "Código del Administrador",
      submit: "Iniciar sesión",
      sendCode: "Enviar Código",
      loading: "Cargando...",
      completeFields: "Por favor, complete todos los campos.",
      invalidEmail: "Por favor, introduce un correo electrónico válido",
      invalidPassword: "Por favor, introduce una contraseña válida (mín 8 caracteres)",
      captchaError: "Por favor, verifica el captcha",
      somethingWentWrong: "¡Algo salió mal!",
      start: "¡Empecemos!",
      codeSent: "Código enviado a",
    },
    pt: {
      login: "Entrar",
      signIn: "Entrar como Administrador",
      email: "E-mail",
      password: "Senha",
      adminCode: "Código do Administrador",
      submit: "Entrar",
      sendCode: "Enviar Código",
      loading: "Carregando...",
      completeFields: "Por favor, preencha todos os campos.",
      invalidEmail: "Por favor, insira um e-mail válido",
      invalidPassword: "Por favor, insira uma senha válida (mín 8 caracteres)",
      captchaError: "Por favor, verifique o captcha",
      somethingWentWrong: "Algo deu errado!",
      start: "Vamos começar!",
      codeSent: "Código enviado para",
    }
  };

  const currentTranslations = translations[selectedLanguage];

  return (
    <main className="flex h-screen">
      <div className="w-full lg:w-2/6 flex flex-col items-center justify-center bg-[#555CB3] shadow-[0_0px_20px_10px_rgba(0,0,0,0.6)] z-10">
        <div className="w-8/12">
          <div className="flex justify-center items-center text-4xl space-x-4 mb-10">
            <img src={Image} className="w-auto h-16 text-white" />
            <h2
              style={{ textShadow: "2px 2px 1px #B45946", color: "white" }}
              className="font-semibold text-white text-3xl tracking-widest text-shadow-lg"
            >
              PSROCKOLA
            </h2>
          </div>
          <p className="text-white font-bold text-lg my-4">{currentTranslations.start}</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-6">
              <TextField
                id="email"
                name="email"
                type="email"
                label={currentTranslations.email}
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="relative mb-6">
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange}
                label={currentTranslations.password}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  endAdornment: (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className=" text-white hover:text-gray-100"
                    >
                      {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </button>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="mb-6">
              <TextField
                id="adminCode"
                name="adminCode"
                label={currentTranslations.adminCode}
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff", // color del borde predeterminado
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffffff", // color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffffff", // color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#ffffff", // color de la etiqueta predeterminado
                    "&.Mui-focused": {
                      color: "#ffffff", // color del label cuando está enfocado
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#ffffff", // color del texto
                  },
                }}
              />
            </div>
            <div className="flex justify-center my-6">
              <ReCaptcha
                ref={captcha}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={onChange}
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  bgcolor: "#F66E0C",
                  borderRadius: "20px",
                  height: "40px",
                  "&:hover": {
                    bgcolor: "#FF6B00",
                  },
                }}
              >
                {currentTranslations.submit}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSendCode}
                sx={{
                  bgcolor: "#1E40AF",
                  borderRadius: "20px",
                  height: "40px",
                  "&:hover": {
                    bgcolor: "#1C3FAA",
                  },
                }}
              >
                {currentTranslations.sendCode}
              </Button>
            </div>
            {auth.status === "failed" && (
              <Typography
                variant="body2"
                sx={{ marginTop: "12px", fontWeight: "bold", color: "red" }}
              >
                {auth.error}
              </Typography>
            )}
          </form>
        </div>
        <div className="w-8/12 h-24 flex justify-center">
          <p className="text-red-400  font-bold relative text-2xl my-6">
            {error}
          </p>
          <p className="text-green-400  font-bold relative text-2xl my-6">
            {codeSendendText}
          </p>
        </div>
      </div>
      <div
        className="lg:w-4/6 bg-white"
        style={{
          backgroundImage: `url(/background_login.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </main>
  );
}

export default Login;
