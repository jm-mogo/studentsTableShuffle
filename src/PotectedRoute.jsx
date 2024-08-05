import { useAuth } from "./context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <h1
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Loading...
            </h1>
        );

    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
