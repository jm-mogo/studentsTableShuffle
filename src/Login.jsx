import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Container, Divider } from "@mui/material";
import { setUserProperties } from "firebase/analytics";
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { id, value } }) => {
        setUser({ ...user, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "100vw",
                    marginTop: "15vh",
                    gap: 8,
                    // height: "100vh",
                }}
            >
                <div
                    style={{
                        width: 400,
                        margin: "auto",
                    }}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                </div>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    height={400}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ border: "1px solid grey" }}
                >
                    <Button variant="contained" onClick={handleGoogleSignin}>
                        Google Login
                    </Button>
                    <div style={{ width: "200px" }}>
                        <Divider size="large" variant="">
                            OR
                        </Divider>
                    </div>

                    <TextField
                        onChange={handleChange}
                        id="email"
                        label="email"
                        type="email"
                    />
                    <TextField
                        onChange={handleChange}
                        id="password"
                        label="Password"
                        type="password"
                    />

                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>

                    <Link
                        to="/register"
                        style={{
                            textDecoration: "none",
                            fontSize: ".9rem",
                        }}
                    >
                        CREATE NEW ACCOUNT
                    </Link>

                    {/* <a href="#!">Forgot password?</a> */}
                </Box>
            </div>
        </>
    );
};

export default Login;
