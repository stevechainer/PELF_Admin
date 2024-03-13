import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addGameAction } from "../liveGameSlice";

const INITIAL_GAME_OBJ = {
    title: "",
    description: "",
    openTime: 0,
    closeTime: 0,
    settleTime: 0,
    initialCost: 0,
    approved: 1,
    conclude: 0,
    madeBy: "ADMIN",
};

function AddGameModalBody({ closeModal }) {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [gameObj, setGameObj] = useState(INITIAL_GAME_OBJ);

    const saveNewGame = () => {
        if (gameObj.title.trim() === "")
            return setErrorMessage("Title is required!");
        else if (gameObj.description.trim() === "")
            return setErrorMessage("Description id is required!");
        else {
            dispatch(addGameAction(gameObj));
            dispatch(
                showNotification({ message: "New Game Added!", status: 1 })
            );
            closeModal();
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setGameObj({ ...gameObj, [updateType]: value });
    };

    return (
        <>
            <InputText
                type="text"
                defaultValue={gameObj.title}
                updateType="title"
                containerStyle="mt-4"
                labelTitle="Title"
                updateFormValue={updateFormValue}
            />
            <TextAreaInput
                labelTitle="Description"
                updateType="description"
                defaultValue={gameObj.description}
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                defaultValue={gameObj.openTime}
                updateType="openTime"
                containerStyle="mt-4"
                labelTitle="Open Time"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                defaultValue={gameObj.closeTime}
                updateType="closeTime"
                containerStyle="mt-4"
                labelTitle="Close Time"
                updateFormValue={updateFormValue}
            />
            <InputText
                type="text"
                defaultValue={gameObj.settleTime}
                updateType="settleTime"
                containerStyle="mt-4"
                labelTitle="Settle Time"
                updateFormValue={updateFormValue}
            />
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>
                    Cancel
                </button>
                <button
                    className="btn btn-primary px-6"
                    onClick={() => saveNewGame()}
                >
                    Save & Launch
                </button>
            </div>
        </>
    );
}

export default AddGameModalBody;
