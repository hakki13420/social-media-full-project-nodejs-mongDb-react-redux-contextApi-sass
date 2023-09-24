import { useSelector } from 'react-redux'
import './_searchComp.scss'
import SearchItem from './SearchItem'

const SearchComp = () => {
  const { users } = useSelector(state => state.users)
  return (
    <div className="search">
      {
        users?.map(user => <SearchItem key={user._id}
          user={user}
        />)
      }
    </div>
  )
}

export default SearchComp
