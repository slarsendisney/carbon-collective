import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'

import { Login } from './Login'
import { Ready } from './Ready'
import { LoggedOutPage } from '../options/LoggedOutPage'
import { Loading } from './Loading'
import { configuration } from '../data/configuration'

export type Account = {
  id: string
  fullName: string
  profileImageUrl: string
}

export const AuthContext = createContext({
  logout: () => {},
  account: undefined as Account | undefined,
  active: true,
  toggleActive: () => {},
  onSubscribedSite: false,
  domain: '',
  siteSupported: false,
  hasSubscriptions: false,
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
  const [onSubscribedSite, setOnSubscribedSite] = useState(false)
  const [domain, setDomain] = useState('')
  const [subscriptions, setSubscriptions] = useState({})
  const [siteSupported, setSiteSupported] = useState(false)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      var activeTab = tabs[0]
      var activeTabURL = activeTab.url
      const url = new URL(activeTabURL as string)
      const domain = url.hostname
      if (
        configuration.verfiedDomains.some((domain) => activeTabURL?.includes(domain)) ||
        (!isOptions && activeTabURL?.includes('dokaenhikhgdmjnpcmemgmlncbkdffdl'))
      ) {
        setOnCreativeCollectiveSite(true)
      }
      setDomain(domain)
     
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.get(
      ['id', 'fullName', 'profileImageUrl', 'active', 'subscriptions', 'mostRecentSiteId'],
      async (result) => {
        if (result.id) {
          setAccount({
            id: result.id,
            fullName: result.fullName,
            profileImageUrl: result.profileImageUrl,
          })
          if (result.active !== undefined) {
            setActive(result.active)
          }
        } 
        if(result.mostRecentSiteId){
          setSiteSupported(true)
        } else {
          setSiteSupported(false)
        }
        if (result.subscriptions) {
          setSubscriptions(result.subscriptions)
          console.log(result.subscriptions, result.mostRecentSiteId)
          if (result.mostRecentSiteId && result.subscriptions[result.mostRecentSiteId]) {
            setOnSubscribedSite(true)
          } else {
            setOnSubscribedSite(false)
          }
        } else {
          setOnSubscribedSite(false)
        }

        setLoading(false)
        return
      },
    )
  }, [])

  const logout = useCallback(() => {
    chrome.storage.local.clear(() => {
      setAccount(undefined)
    })
  }, [])

  const hasSubscriptions = useMemo(() => {
    return Object.keys(subscriptions).length > 0
  }, [subscriptions, domain])


  const toggleActive = useCallback(() => {
    chrome.action.setBadgeBackgroundColor({ color: configuration.bgColor })
    const newVal = !active
    setActive(newVal)
    chrome.storage.local.set({
      active: newVal,
    })
    if (newVal) {
      chrome.action.setBadgeText({ text: '' })
    } else {
      chrome.action.setBadgeText({ text: '⏸' })
    }
  }, [active])

  const isSignedIn = useMemo(() => {
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

  if (onCreativeCollectiveSite && !onSubscribedSite) {
    return (
      <AuthContext.Provider
        value={{
          account,
          logout,
          active,
          toggleActive,
          onSubscribedSite,
          domain,
          siteSupported,
          hasSubscriptions,
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
        toggleActive,
        onSubscribedSite,
        domain,
        siteSupported,
        hasSubscriptions
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
