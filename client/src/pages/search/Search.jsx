import LeftBar from '../../components/leftBar/LeftBar'
import RightBar from '../../components/rightBar/RightBar'
import SearchComp from '../../components/search/SearchComp'
import TopBar from '../../components/topbar/TopBar'

const Search = () => {
  return (
    <div className="searchPage">
      <TopBar/>
      <div className="layout">
        <LeftBar/>
        <SearchComp />
        <RightBar/>
      </div>
    </div>
  )
}

export default Search
