console.info('chrome-ext template-react-ts background script')

chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
      if (request.type === "OAUTH") {
        chrome.storage.local.set({
          accountId: request.accountId,
          name: request.privateKey,
        });
      }
      if(request.type === "PAGE_WEIGHT") {
        console.log(request)
        chrome.runtime.sendMessage(
          {
            pageWeight: request.pageWeight,
            adFree: request.adFree,
            method: "pageWeight",
          }
        )
      }
      sendResponse({ received: true });
    }
    
  );

export {}
