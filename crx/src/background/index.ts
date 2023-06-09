import { configuration } from '../data/configuration'

chrome.runtime.onMessage.addListener(function message(request, sender, sendResponse) {
  chrome.action.setBadgeBackgroundColor({ color: configuration.bgColor })
  chrome.storage.local.get(['id', 'active'], (result) => {
    if (!result.id) {
      // If user is not logged in, do not track page views
      return
    }
    if (!result.active) {
      chrome.action.setBadgeText({ text: '⏸', tabId: sender.tab?.id })
      // If extension is not active, do not track page views
      return
    }
    switch (request.type) {
      case 'SUPPORTED_SITE':
        chrome.action.setBadgeText({ text: '🔥', tabId: sender.tab?.id })
        chrome.storage.local.get(['viewCounts', 'domainCollectiveIDs'], (result) => {
          const viewCounts = result.viewCounts
          if (viewCounts[request.domain]) {
            viewCounts[request.domain]++
          } else {
            viewCounts[request.domain] = 1
          }

          const domainCollectiveIDs = result.domainCollectiveIDs
          domainCollectiveIDs[request.domain] = request.creatorCollectiveID

          chrome.storage.local.set({
            viewCounts,
            domainCollectiveIDs: {
              ...domainCollectiveIDs,
              'carbon-collective-7c39.vercel.app': 'CARB-72',
            },
            mostRecentSiteId: request.creatorCollectiveID,
          })
        })
        break
      case 'UNSUPPORTED_SITE':
        chrome.action.setBadgeText({ text: '', tabId: sender.tab?.id })
        chrome.storage.local.get(['viewCounts'], (result) => {
          const viewCounts = result.viewCounts
          if (viewCounts[request.domain]) {
            viewCounts[request.domain]++
          } else {
            viewCounts[request.domain] = 1
          }

          chrome.storage.local.set({
            viewCounts,
            mostRecentSiteId: '',
          })
        })
        break
      default:
        break
    }
  })
})

chrome.runtime.onMessageExternal.addListener(function messageExternal(
  request,
  sender,
  sendResponse,
) {
  chrome.action.setBadgeBackgroundColor({ color: configuration.bgColor })

  switch (request.type) {
    // Used to check for extension installation
    case 'PING':
      sendResponse({ type: 'PONG' })
    case 'SITE_SUBSCRIPTION_STATUS':
      chrome.storage.local.get(['subscriptions'], (result) => {
        const isSubscribed = request.value
        const url = new URL(sender.url as string)
        const domain = url.hostname
        const activeSubscriptions = result.subscriptions || {}
        activeSubscriptions[domain] = isSubscribed
        chrome.storage.local.set({
          subscriptions: activeSubscriptions,
        })
      })

    case 'GET_USER_ID':
      chrome.storage.local.get(['id'], (result) => {
        sendResponse({
          type: 'USER_ID',
          userId: result.id,
        })
      })
  }

  // Message past this point should only be accessible from MAIN_SITE_DOMAINS
  // This check is to prevent malicious actors from sending messages to the extension
  const url = new URL(sender.url as string)
  const domain = url.hostname

  if (!configuration.verfiedDomains.includes(domain)) {
    console.error('Message from non-main site domain')
    return
  }

  switch (request.type) {
    // Used to send login info to extension
    case 'OAUTH':
      chrome.storage.local.set({
        id: request.id,
        fullName: request.fullName,
        profileImageUrl: request.profileImageUrl,
      })
      // set chrom extension badge background transparent

      chrome.action.setBadgeText({ text: '👍', tabId: sender.tab?.id })

      setTimeout(() => {
        chrome.action.setBadgeText({ text: '', tabId: sender.tab?.id })
      }, 2000)
      break
    case 'PAGE_WEIGHT':
      chrome.runtime.sendMessage({
        pageWeight: request.pageWeight,
        adFree: request.adFree,
        method: 'pageWeight',
      })

      break
    case 'GET_DOMAINS':
      chrome.storage.local.get(
        ['supported_domains', 'unsupported_domains', 'site_visit_count', 'domainCollectiveIDs'],
        (result) => {
          sendResponse({
            ...result,
            domainCollectiveIDs: {
              ...result.domainCollectiveIDs,
              'carbon-collective-7c39.vercel.app': 'CARB-72',
            },
          })
        },
      )
      break
    case 'SUBSCRIBED':
      const siteId = request.siteId
      chrome.storage.local.get(['subscriptions'], (result) => {
        const activeSubscriptions = result.subscriptions || {}
        activeSubscriptions[siteId] = true
        chrome.storage.local.set({
          subscriptions: activeSubscriptions,
        })
      })

      break

    default:
      break
  }
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    active: true,
    viewCounts: {
      'carboncollective.club': 0,
    },
    domainCollectiveIDs: {
      'carboncollective.club': 'CARB-72',
      'carbon-collective-7c39.vercel.app': 'CARB-72',
    },
  })
})

export {}
