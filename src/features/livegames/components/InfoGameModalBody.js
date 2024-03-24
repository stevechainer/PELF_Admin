import { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputText from '../../../components/Input/InputText'
import DateTimeSelector from '../../../components/Input/DateTimeSelector'
import SpinnerSelector from '../../../components/Input/SpinnerSelector'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from '../../common/headerSlice'
import { addGameAction } from '../liveGameSlice'

function InfoGameModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const [gameObj, setGameObj] = useState(extraObject.game)

  const saveNewGame = () => {
    if (gameObj.title.trim() === '')
      return setErrorMessage('Title is required!')
    else if (gameObj.description.trim() === '')
      return setErrorMessage('Description id is required!')
    else {
      dispatch(addGameAction(gameObj))
      dispatch(showNotification({ message: 'New Game Added!', status: 1 }))
      closeModal()
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('')
    setGameObj({ ...gameObj, [updateType]: value })
  }

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
      <DateTimeSelector
        labelTitle="Start Date"
        containerStyle="mt-4"
        defaultValue={gameObj.startDate}
        updateFormValue={updateFormValue}
        updateType="startDate"
      />
      <DateTimeSelector
        labelTitle="End Date"
        containerStyle="mt-4"
        defaultValue={gameObj.endDate}
        updateFormValue={updateFormValue}
        updateType="endDate"
      />
      <SpinnerSelector
        labelTitle="Owner Percent"
        containerStyle="mt-4"
        defaultValue={gameObj.ownerPercent}
        min={1}
        max={10}
        step={1}
        updateFormValue={updateFormValue}
        updateType="ownerPercent"
      />
      <SpinnerSelector
        labelTitle="Burning Percent"
        containerStyle="mt-4"
        defaultValue={gameObj.burnPercent}
        min={1}
        max={10}
        step={1}
        updateFormValue={updateFormValue}
        updateType="burnPercent"
      />
      <InputText
        type="text"
        defaultValue={gameObj.maxAmountPerUser}
        updateType="maxAmountPerUser"
        containerStyle="mt-4"
        labelTitle="User Maxium Amount "
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={gameObj.minAmountPerUser}
        updateType="minAmountPerUser"
        containerStyle="mt-4"
        labelTitle="User Minimum Amount "
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-outline" onClick={() => closeModal()}>
          Close
        </button>
      </div>
    </>
  )
}

export default InfoGameModalBody
