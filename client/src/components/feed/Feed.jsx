import Posts from '../posts/Posts'
import Share from '../share/Share'

const Feed = ({ share }) => {
  return (
    <div className="feed">
      {(share === undefined || share === true) && <Share/>}
      <Posts/>
    </div>
  )
}

export default Feed
