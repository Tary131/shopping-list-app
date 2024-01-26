
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from "./Registration.module.css";
import { useTranslation } from "react-i18next";


export const Registration = () => {
    const { t } = useTranslation();
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                {t("Create account")}
            </Typography>
            <TextField className={styles.field} label="Name" fullWidth />
            <TextField className={styles.field} label="E-Mail" fullWidth />
            <TextField className={styles.field} label={t("Password")} fullWidth />
            <Button size="large" variant="contained" fullWidth>
               {t("Register")}
            </Button>
        </Paper>
    );
};