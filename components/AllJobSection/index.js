import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import SearchInput from '../SearchInput'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    search: '',
    activeSalaryRangeId: '',
    activeEmploymentTypeList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {search, activeEmploymentTypeList, activeSalaryRangeId} = this.state
    console.log(activeEmploymentTypeList)
    const selectedList = activeEmploymentTypeList.join()

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedList}&minimum_package=${activeSalaryRangeId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        rating: job.rating,
        packagePerAnnum: job.package_per_annum,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getProducts)
  }

  onChangeEmployment = activeEmploymentTypeId => {
    let {activeEmploymentTypeList} = this.state

    const isInList = activeEmploymentTypeList.some(
      eachItem => eachItem === activeEmploymentTypeId,
    )

    if (isInList) {
      activeEmploymentTypeList = activeEmploymentTypeList.filter(
        each => each !== activeEmploymentTypeId,
      )
    } else {
      activeEmploymentTypeList = [
        ...activeEmploymentTypeList,
        activeEmploymentTypeId,
      ]
    }

    this.setState({activeEmploymentTypeList}, this.getProducts)
  }

  onClickSearch = () => {
    this.getProducts()
  }

  changeSearchInput = search => {
    this.setState({search})
  }

  retryJob = () => {
    this.getProducts()
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

      <button type="button" className="retry-button" onClick={this.retryJob}>
        Retry
      </button>
    </div>
  )

  renderProductsListView = () => {
    const {jobsList} = this.state
    const shouldShowProductsList = jobsList.length > 0

    return shouldShowProductsList ? (
      <ul className="job-list-container">
        {jobsList.map(job => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchInput = () => {
    const {search} = this.state
    return (
      <SearchInput
        changeSearchInput={this.changeSearchInput}
        search={search}
        onClickSearch={this.onClickSearch}
      />
    )
  }

  renderTypeOfEmployment = () => (
    <>
      <h1 className="employment-filter-heading">Type of Employment</h1>
      <ul className="type-of-employment-container">
        {employmentTypesList.map(employmentType => (
          <TypeOfEmployment
            key={employmentType.employmentTypeId}
            employmentOption={employmentType}
            onChangeEmployment={this.onChangeEmployment}
          />
        ))}
      </ul>
    </>
  )

  renderSalaryRange = () => (
    <>
      <h1 className="employment-filter-heading">Salary Range</h1>
      <ul className="salary-range-container">
        {salaryRangesList.map(salaryRange => (
          <SalaryRange
            key={salaryRange.salaryRangeId}
            salaryOption={salaryRange}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
        ))}
      </ul>
    </>
  )

  render() {
    return (
      <div className="all-products-section">
        <div className="main-job-container">
          <div className="mobile-view-container">
            <div className="search-bar-container">
              {this.renderSearchInput()}
            </div>
            <div className="profile-container">
              <Profile />
            </div>
            <div>
              <hr />
            </div>
            <div className="employment-type-container">
              {this.renderTypeOfEmployment()}
            </div>
            <div>
              <hr />
            </div>
            <div className="salary-range-container">
              {this.renderSalaryRange()}
            </div>
            {this.renderAllProducts()}
          </div>
          <div className="laptop-view-container">
            <div className="filter-profile-container">
              <div className="profile-container">
                <Profile />
              </div>
              <div>
                <hr />
              </div>
              <div className="employment-type-container">
                {this.renderTypeOfEmployment()}
              </div>
              <div>
                <hr />
              </div>
              <div className="salary-range-container">
                {this.renderSalaryRange()}
              </div>
            </div>
            <div className="search-job-list-container">
              <div className="search-bar-container">
                {this.renderSearchInput()}
              </div>
              {this.renderAllProducts()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobSection
