const metas = document.getElementsByTagName('meta')

const url = new URL(window.location.href)
const domain = url.hostname

let isSupportedSite = false

console.log(domain)

for (let i = 0; i < metas.length; i++) {
  if (metas[i].getAttribute('name') === 'carbon-collective') {
    console.log('supported site')
    chrome.runtime.sendMessage({
      creatorCollectiveID: metas[i].getAttribute('content'),
      domain,
      type: 'SUPPORTED_SITE',
    })
    isSupportedSite = true
  }
}

if (!isSupportedSite) {
  console.log('unsupported site')
  chrome.runtime.sendMessage({
    domain,
    type: 'UNSUPPORTED_SITE',
  })
}

export {}
