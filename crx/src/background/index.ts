console.info('chrome-ext template-react-ts background script')

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.type === 'OAUTH') {
    const { id, fullName, profileImageUrl } = request
    chrome.storage.local.set({
      id,
      fullName,
      profileImageUrl,
    })
  }
  if (request.type === 'PAGE_WEIGHT') {
    chrome.runtime.sendMessage({
      pageWeight: request.pageWeight,
      adFree: request.adFree,
      method: 'pageWeight',
    })
  }
  sendResponse({ received: true })
})

chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {

    if (changeInfo.url) {
      //domain from url
      const domain = changeInfo.url.split('/')[2]
      
    }
  }
);


export {}
