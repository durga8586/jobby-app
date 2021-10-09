import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const SimilarJob = props => {
  const {similarJobOption} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobOption

  return (
    <li className="similar-job-item">
      <div className="logo-title-rate-container">
        <img
          src={companyLogoUrl}
          className="com-logo"
          alt="similar job company logo"
        />
        <div className="title-rate-container">
          <h1 className="title">{title}</h1>
          <div className="star-rate">
            <AiOutlineStar className="icon" />
            <p className="rate">{rating}</p>
          </div>
        </div>
      </div>
      <div className="desc-cont1">
        <h1 className="description">Description</h1>
        <p className="para">{jobDescription}</p>
      </div>
      <div className="loc-type">
        <div className="star-rate">
          <GoLocation className="icon" />
          <p className="rate">{location}</p>
        </div>
        <div className="star-rate">
          <BsFillBriefcaseFill className="icon" />
          <p className="rate">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
