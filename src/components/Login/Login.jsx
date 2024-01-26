import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";

const Login = ({ setIsAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { t } = useTranslation();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(false);
    };

    const handleLogin = () => {

        if (email === "user@test.com" && password === "12345") {

            setIsAuth(true);
            console.log("Login successful!");
        } else {

            setError(true);
        }
    };

    return (
        <Paper classes={{ root: styles.root }} elevation={3}>
            <Typography classes={{ root: styles.title }} variant="h5">
                {t("Log in")}
            </Typography>
            <TextField
                className={styles.field}
                label={t("E-Mail(user@test.com)")}
                error={error}
                helperText={error ? "Wrong data" : ""}
                fullWidth
                value={email}
                onChange={handleEmailChange}
                placeholder={"user@test.com"}
            />
            <TextField
                className={styles.field}
                label={t("Password(12345)")}
                type="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                placeholder={"password"}

            />
            <Button size="large" variant="contained" fullWidth onClick={handleLogin}>
                {t("Log in")}
            </Button>
        </Paper>
    );
};

export default Login;
