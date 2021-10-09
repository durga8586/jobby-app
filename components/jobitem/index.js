import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'

import SimilarJob from '../SimilarJob'
import Skills from '../Skills'

import Header from '../header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    skills: data.job_details.skills,
    lifeAtCompany: data.job_details.life_at_company,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => ({
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          id: eachSimilarJob.id,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        }),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      title,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobData

    return (
      <div className="bg-container">
        <div className="job-item">
          <div className="top-cont">
            <div className="logo-title-rate-container">
              <img
                src={companyLogoUrl}
                className="com-logo"
                alt="job details company logo"
              />
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
          <div className="desc-cont3">
            <h1 className="description">Description</h1>
            <Link className="url-link" target="_blank" to={companyWebsiteUrl}>
              Visit
            </Link>
          </div>
          <p className="para">{jobDescription}</p>

          <div className="skills-cont">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skill-list">
              {skills.map(skill => (
                <Skills key={skill.id} skillsList={skill} />
              ))}
            </ul>
          </div>
          <h1 className="life-at-company-name">Life at Company</h1>
          <div className="life-cont">
            <p className="life-para">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              className="life-image"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-job-cont">
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-job-list">
            {similarJobsData.map(similarJob => (
              <SimilarJob key={similarJob.id} similarJobOption={similarJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryJobItem = () => {
    this.getProductData()
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button
        type="button"
        className="retry-button"
        onClick={this.retryJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
