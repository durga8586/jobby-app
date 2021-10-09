import './index.css'

const Skills = props => {
  const {skillsList} = props

  return (
    <li className="skill-item">
      <img
        src={skillsList.image_url}
        className="skill-image"
        alt={skillsList.name}
      />
      <p className="skill-name">{skillsList.name}</p>
    </li>
  )
}

export default Skills
