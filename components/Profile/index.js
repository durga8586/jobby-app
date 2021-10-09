import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiProStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    name: '',
    profileImageUrl: '',
    shortBio: '',
    apiStatus: apiProStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiProStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
        apiStatus: apiProStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiProStatusConstants.failure,
      })
    }
  }

  renderProfileDetailsView = () => {
    const {name, profileImageUrl, shortBio} = this.state

    return (
      <div className="profile-cont">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryProfile = () => {
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="profile-failure">
      <button
        className="retry-button"
        type="button"
        onClick={this.retryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiProStatusConstants.success:
        return this.renderProfileDetailsView()
      case apiProStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiProStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="product">{this.renderProfileDetails()}</div>
      </>
    )
  }
}

export default Profile
