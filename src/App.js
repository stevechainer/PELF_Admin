import React, { lazy, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    // Switch,
    Routes,
    Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import initializeApp from "./app/init";

import "./App.css";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

// Initializing different libraries
initializeApp();


function App() {
    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false);
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/app/*" element={<Layout />} />
                    <Route
                        path="*"
                        element={<Navigate to={"/login"} replace />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
