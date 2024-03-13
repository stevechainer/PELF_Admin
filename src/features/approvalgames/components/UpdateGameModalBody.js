import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { updateGameAction } from "../approvalGameSlice"

function UpdateGameModalBody({closeModal, extraObject}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [gameObj, setGameObj] = useState(extraObject.game)

    const saveGame = () => {
        if(gameObj.title.trim() === "")return setErrorMessage("Title is required!")
        else if(gameObj.description.trim() === "")return setErrorMessage("Description id is required!")
        else{
            dispatch(updateGameAction(gameObj))
            dispatch(showNotification({message : "Game Updated!", status : 1}))
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setGameObj({...gameObj, [updateType] : value})
    }

    return(
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
                    onClick={() => saveGame()}
                >
                    Save
                </button>
            </div>
        </>
    )
}

export default UpdateGameModalBody