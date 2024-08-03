import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Container } from "@mui/material";

const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { id, value } }) => {
        setUser({ ...user, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signup(user.email, user.password);
            navigate("/");
        } catch (error) {
            console.log(error);
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
                    width: "100vh",
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
                    width={340}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={4}
                    p={2}
                    sx={{ border: "1px solid grey" }}
                    noValidate
                >
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
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                    <Link
                        to="/login"
                        style={{
                            textDecoration: "none",
                            fontSize: ".9rem",
                        }}
                    >
                        HAVE AN ACCOUNT
                    </Link>
                </Box>
            </div>
        </>
    );
};

export default Register;
