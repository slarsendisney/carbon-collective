import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'

import { Login } from './Login'
import { Ready } from './Ready'
import { LoggedOutPage } from '../options/LoggedOutPage'
import { Loading } from './Loading'

export type Account = {
  id: string
  fullName: string
  profileImageUrl: string
}

export const AuthContext = createContext({
  logout: () => {},
  account: undefined as Account | undefined,
  active: true,
})

export const AuthProvider = ({
  children,
  isOptions,
}: {
  children: React.ReactNode
  isOptions?: boolean
}) => {
  const [account, setAccount] = useState<Account>()
  const [onCreativeCollectiveSite, setOnCreativeCollectiveSite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(true)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      var activeTab = tabs[0]
      var activeTabURL = activeTab.url
      if (
        activeTabURL?.includes('localhost:3000') ||
        (!isOptions && activeTabURL?.includes('dokaenhikhgdmjnpcmemgmlncbkdffdl'))
      ) {
        setOnCreativeCollectiveSite(true)
      }
    })
  })

  useEffect(() => {
    chrome.storage.local.get(['id', 'fullName', 'profileImageUrl'], async (result) => {
      console.log(result)
      if (result.id) {
        setAccount({
          id: result.id,
          fullName: result.fullName,
          profileImageUrl: result.profileImageUrl,
        })
      } else {
        console.log('no account found')
      }
      setLoading(false)
      return
    })
  }, [])

  const logout = useCallback(() => {
    chrome.storage.local.remove(['id'], () => {
      setAccount(undefined)
    })
  }, [])

  const isSignedIn = useMemo(() => {
    console.log(account)
    return !!account
  }, [account])

  if (loading) {
    return <Loading />
  }
  if (!isSignedIn) {
    if (isOptions) {
      return <LoggedOutPage />
    }
    return <Login />
  }
  console.log(account)
  if (onCreativeCollectiveSite) {
    return (
      <AuthContext.Provider
        value={{
          account,
          logout,
          active,
        }}
      >
        <Ready />
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        account,
        logout,
        active,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
