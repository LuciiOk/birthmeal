import React from 'react'

const useAuthentication = () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return user
}

export default useAuthentication