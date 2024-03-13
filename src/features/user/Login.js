import { useState, useEffect } from "react";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
// import { loginUser } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../app/authReducers";
// import store from "../../app/store";

function Login() {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        email: "",
    };

    const { isAuthenticated, invalid, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (invalid) {
            setErrorMessage("Invalid Credentials");
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/app/dashboard';
        }
    }, [isAuthenticated]);

    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (loginObj.email.trim() === "")
            return setErrorMessage("Email is required! (use any value)");
        if (loginObj.password.trim() === "")
            return setErrorMessage("Password is required! (use any value)");
        else {
            // setLoading(true);
            const userData = {
                email: loginObj.email,
                password: loginObj.password
            };
            dispatch(loginAction(userData));
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto max-w-5xl  shadow-xl">
                <div className="grid grid-cols-1  bg-base-100 rounded-xl">
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">
                            Login
                        </h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <InputText
                                    type="text"
                                    defaultValue={loginObj.email}
                                    updateType="email"
                                    containerStyle="mt-4"
                                    labelTitle="Email"
                                    updateFormValue={updateFormValue}
                                />

                                <InputText
                                    defaultValue={loginObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <ErrorText styleClass="mt-8">
                                {errorMessage}
                            </ErrorText>
                            <button
                                type="submit"
                                className={
                                    "btn mt-2 w-full btn-primary"
                                }
                            >
                                {isLoading ? <span className="loading loading-ring loading-lg"></span> : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
