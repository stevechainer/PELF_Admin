import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { Provider } from "react-redux";
import SuspenseContent from "./containers/SuspenseContent";
import checkAuth from "./app/auth";
import { jwtDecode } from "jwt-decode";
import { logined, logouted } from "./app/authReducers";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    checkAuth(token);
    const decoded = jwtDecode(token);
    store.dispatch(logined());
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        store.dispatch(logouted());
        window.location.href = "./login";
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
