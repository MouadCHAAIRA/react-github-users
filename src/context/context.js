import React, { useState, useEffect, createContext } from 'react'
import { db } from '../firebase/config'

const API_URL = 'https://api.github.com/users?per_page=100'

const GithubUsersContext = createContext()

const GithubUsersProvider = ({ children }) => {
  const [users, SetUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const getUsers = () => {
    setLoading(true)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        SetUsers(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const values = { users, loading }
  return <GithubUsersContext.Provider value={values} children={children} />
}

export { GithubUsersContext, GithubUsersProvider }
