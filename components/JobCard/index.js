import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    packagePerAnnum,
    title,
  } = jobData

  return (
    <li className="job-list">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="top-cont">
          <div className="logo-title-rate-container">
            <img src={companyLogoUrl} className="com-logo" alt="company logo" />
            <div className="title-rate-container">
              <h1 className="title">{title}</h1>
              <div className="star-rate">
                <AiOutlineStar className="icon" />
                <p className="rate">{rating}</p>
              </div>
            </div>
          </div>
          <div className="type-loc-pack">
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
            <div className="pack-cont">
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <div>
          <hr className="line" />
        </div>
        <div className="desc-cont2">
          <h1 className="description">Description</h1>
          <p className="para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
