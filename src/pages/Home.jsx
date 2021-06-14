/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { GithubUsersContext } from '../context/context'
import SingleUser from '../components/SingleUser'

// SingleUser component
// import SingleUser from '../components/SingleUser'

const Home = () => {
  const { users, loading, searchUsers } = useContext(GithubUsersContext)
  const [shearch, setSherarch] = useState('')

  return (
    <>
      <div className='center'>
        <h1>Home {loading && 'loading...'} </h1>
      </div>
      <form
        style={{ marginBottom: '100px' }}
        onSubmit={(e) => {
          e.preventDefault()
          searchUsers(shearch)
        }}
      >
        <input
          type='search'
          className='search-input'
          placeholder='what are you looking for'
          value={shearch}
          onChange={(e) => setSherarch(e.target.value)}
        />
      </form>

      <section className='followers'>
        <div className='center'>
          <h3>
            {!loading &&
              users.length === 0 &&
              ` No Github Found under the name (${shearch})`}
          </h3>
        </div>
        <div className='container'>
          {!loading &&
            users.map((user) => {
              return <SingleUser user={user} key={user.node_id} />
            })}
        </div>
      </section>
    </>
  )
}

export default Home
