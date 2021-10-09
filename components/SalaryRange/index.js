import './index.css'

const SalaryRange = props => {
  const {salaryOption, onChangeSalaryRange} = props

  const onClickSalaryRange = () => {
    onChangeSalaryRange(salaryOption.salaryRangeId)
  }

  return (
    <li className="type-item">
      <div>
        <input
          type="radio"
          value={salaryOption.label}
          id={salaryOption.salaryRangeId}
          onChange={onClickSalaryRange}
          name="salary-range"
        />
        <label className="label-name">{salaryOption.label}</label>
      </div>
    </li>
  )
}

export default SalaryRange
