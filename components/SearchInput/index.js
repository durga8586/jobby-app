import {BsSearch} from 'react-icons/bs'

import './index.css'

const SearchInput = props => {
  const {search, changeSearchInput, onClickSearch} = props

  const onClickSearchButton = () => {
    onClickSearch()
  }

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  return (
    <div className="search-input-container">
      <input
        value={search}
        type="search"
        placeholder="Search"
        className="search-input"
        onChange={onChangeSearchInput}
      />
      <button
        type="button"
        testid="searchButton"
        className="search-cont"
        onClick={onClickSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchInput
