import { useState } from 'react'

function DateTimeSelector({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [dateTime, setDateTime] = useState(defaultValue)
  console.log('show value:' + defaultValue)
  const updateDateTimeValue = (val) => {
    console.log('SET value:' + val)
    setDateTime(val)
    updateFormValue({ updateType, value: val })
  }

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={`label-text text-base-content ${labelStyle}`}>
          {labelTitle}
        </span>
      </label>
      <input
        type="datetime-local"
        value={dateTime}
        placeholder={placeholder || ''}
        onChange={(e) => updateDateTimeValue(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  )
}

export default DateTimeSelector
