import React, { useContext, useEffect } from 'react'
import SingleUser from '../components/SingleUser'
import { GithubUsersContext } from '../context/context'

const Favorite = () => {
  const { fav } = useContext(GithubUsersContext)

  return (
    <>
      <section className='followers'>
        <div className='container'>
          {fav &&
            fav.map((d) => {
              return <SingleUser user={d} key={d.node_id} />
            })}
        </div>
      </section>
    </>
  )
}

export default Favorite
