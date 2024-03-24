import React, { useState } from 'react'

function SpinnerSelector({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  min,
  max,
  step,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue)

  const updateSpinnerValue = (val) => {
    setValue(val)
    updateFormValue({ updateType, value: val })
  }

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={'label-text text-base-content ' + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => updateSpinnerValue(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  )
}

export default SpinnerSelector
