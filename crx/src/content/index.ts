const metas = document.getElementsByTagName('meta')

const url = new URL(window.location.href)
const domain = url.hostname

let isSupportedSite = false

for (let i = 0; i < metas.length; i++) {
  if (metas[i].getAttribute('name') === 'carbon-collective') {
    chrome.runtime.sendMessage({
      creatorCollectiveID: metas[i].getAttribute('content'),
      domain,
      type: 'SUPPORTED_SITE',
    })
    isSupportedSite = true
  }
}

if (!isSupportedSite) {
  chrome.runtime.sendMessage({
    domain,
    type: 'UNSUPPORTED_SITE',
  })
}

chrome.storage.local.get(['supported_domains', 'unsupported_domains', 'site_visit_count'], (result) => {

  if(domain === 'localhost'){
    return
  }
  
  const { supported_domains = [], unsupported_domains=[], site_visit_count={} } = result

  if(site_visit_count[domain]){
    site_visit_count[domain]++
  } else {
    site_visit_count[domain] = 1
  }
  
  if(isSupportedSite && !supported_domains.includes(domain)){
    supported_domains.push(domain)
  }

  if(!isSupportedSite && !unsupported_domains.includes(domain)){
    unsupported_domains.push(domain)
  }

  chrome.storage.local.set({
    supported_domains,
    unsupported_domains,
    site_visit_count
  })
})

export {}
