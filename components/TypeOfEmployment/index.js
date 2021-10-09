import './index.css'

const TypeOfEmployment = props => {
  const {employmentOption, onChangeEmployment} = props

  const onClickSelectEmployment = () => {
    onChangeEmployment(employmentOption.employmentTypeId)
  }

  return (
    <li className="type-item">
      <input
        type="checkbox"
        value={employmentOption.label}
        onClick={onClickSelectEmployment}
        id={employmentOption.employmentTypeId}
      />
      <label className="label-name">{employmentOption.label}</label>
    </li>
  )
}

export default TypeOfEmployment
