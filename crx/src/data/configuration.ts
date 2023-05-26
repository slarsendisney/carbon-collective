const verfiedDomains = [
  'carbon-collective.vercel.app',
  'carboncollective.club',
  'www.carboncollective.club',
  'localhost',
]

if (process.env.NODE_ENV === 'development') {
  verfiedDomains.push('localhost')
}

export const configuration = {
  verfiedDomains,
  bgColor: '#93c5fd',
}
