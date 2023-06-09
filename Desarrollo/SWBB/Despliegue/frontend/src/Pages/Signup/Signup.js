import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Agent, Storage, Loading } from "../../Utils/importFiles";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Copyright from "../../Components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  // Estados locales para cada campo del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [eMail, seteMail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const history = useHistory();

  const customer = Storage.GetItem("customer");

  const handleSignUp = () => {
    // Validar que los campos no estén vacíos
    if (firstName.trim() === "" || lastName.trim() === "" || eMail.trim() === "" || password.trim() === "") {
      console.log("Por favor completa todos los campos");
      return;
    }
    setIsLoading(true);

    const requestData = {
      nombre: firstName,
      apellido: lastName,
      correo: eMail,
      pass: password,
    };

    axios
        .post("http://localhost:3000/clientes", requestData)
        .then((response) => {
          setIsLoading(false);
          if (response.data.message) {
            // Registro exitoso
            // Aquí puedes realizar cualquier acción adicional o mostrar un mensaje de éxito
            console.log("Registro exitoso:", response.data.message);
            history.push("/accountcreated");
          } else {
            // Error en el registro
            // Aquí puedes mostrar un mensaje de error o tomar las acciones necesarias
            console.log("Error en el registro:", response.data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          // Manejo de errores en caso de falla en la solicitud
          console.log("Error en la solicitud:", error);
        });
  };

  return !customer ? (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <ConfirmModal
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        confirmMesage={"Confirmar"}
        modalContent={modalContent}
      />
      {isLoading && <Loading />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regístrate
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={eMail}
                onChange={(e) => {
                  seteMail(e.target.value);
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            Regístrate
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tienes una cuenta? Iniciar sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};
export default SignUp;
