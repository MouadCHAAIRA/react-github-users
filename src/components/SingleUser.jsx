import React, { useContext, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { GithubUsersContext } from '../context/context'

const SingleUser = ({ user }) => {
  const { docId, login, avatar_url, html_url, node_id } = user
  const { addFavoriteUser, fav, removeFavorite } =
    useContext(GithubUsersContext)
  const nodeIds = fav.map((u) => u.node_id)
  const [isFavorite, setIsFavorite] = useState(nodeIds.includes(node_id))

  return (
    <article className='card'>
      <button
        onClick={() => {
          if (isFavorite) {
            removeFavorite(docId)
          } else {
            addFavoriteUser(user)
          }
          setIsFavorite(!isFavorite)
        }}
        className={isFavorite ? 'star-icon is-favorite' : 'star-icon'}
      >
        {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <img src={avatar_url} alt={login} />
      <h4>@{login}</h4>
      <a href={html_url} target='blank' className='btn' rel='noreferrer'>
        view profiler
      </a>
    </article>
  )
}

export default SingleUser
