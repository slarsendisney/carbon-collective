console.info('chrome-ext template-react-ts background script')

const MAIN_SITE_DOMAINS = ['localhost', 'carboncollective.club']

const BG_COLOR = '#93c5fd'

chrome.runtime.onMessage.addListener(function message(request, sender, sendResponse) {
  chrome.action.setBadgeBackgroundColor({ color: BG_COLOR })
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
    console.log(request.domain)
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
            domainCollectiveIDs,
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
  chrome.action.setBadgeBackgroundColor({ color: BG_COLOR })
  // Message past this point should only be accessible from MAIN_SITE_DOMAINS
  // This check is to prevent malicious actors from sending messages to the extension
  const url = new URL(sender.url as string)
  const domain = url.hostname

  if (!MAIN_SITE_DOMAINS.includes(domain)) {
    console.error('Message from non-main site domain')
    return
  }

  switch (request.type) {
    // Used to check for extension installation
    case 'PING':
      sendResponse({ type: 'PONG' })

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
      chrome.storage.local.get(['domains'], (result) => {
        sendResponse(result.domains)
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
      'carboncollective.club': 'DUMMY_ID',
    },
  })
})

// on tab update
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'loading') {
//     chrome.action.setBadgeText({ text: '', tabId })
//   }
// })

export {}
