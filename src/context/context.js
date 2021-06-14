import React, { useState, useEffect, createContext } from 'react'
import { db } from '../firebase/config'

const API_URL = 'https://api.github.com/users?per_page=100'
const SEARCH_URL = 'https://api.github.com/search/users?q='

const GithubUsersContext = createContext()

const GithubUsersProvider = ({ children }) => {
  const [users, SetUsers] = useState([])
  const [fav, setFav] = useState([])
  const [loading, setLoading] = useState(false)

  const addFavoriteUser = (user) => {
    db.collection('users').add(user)
  }

  const removeFavorite = (docId) => {
    db.collection('users').doc(docId).delete()
  }

  const getFavorite = () => {
    db.collection('users').onSnapshot((snapshot) => {
      const favoriteUser = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setFav(favoriteUser)
    })
  }
  const searchUsers = (query) => {
    if (query.trim() !== '') {
      setLoading(true)
      fetch(`${SEARCH_URL}${query}`)
        .then((res) => res.json())
        .then((data) => {
          SetUsers(data.items)
          setLoading(false)
        })
    } else {
      getUsers()
    }
  }
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
    db.collection('users').onSnapshot((snapshot) => {
      const favoriteUser = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          favorie: true,
          ...doc.data(),
        }
      })
      setFav(favoriteUser)
      getUsers()
      setLoading(false)
    })
  }, [])

  const values = {
    users,
    loading,
    searchUsers,
    addFavoriteUser,
    fav,
    getFavorite,
    removeFavorite,
  }
  return <GithubUsersContext.Provider value={values} children={children} />
}

export { GithubUsersContext, GithubUsersProvider }
