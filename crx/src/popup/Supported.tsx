import { HandThumbUpIcon, LightBulbIcon } from '@heroicons/react/24/solid'

export const Supported = () => {
  return (
    <div className="flex flex-col w-full space-y-2 pt-1">
      <div className="flex items-center w-full pl-5 pr-2 py-2 bg-gray-400 bg-opacity-10 rounded">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col  col-span-3 justify-center">
            <p className="text-sm font-semibold">This site supports the carbon collective!</p>
            <p>
             You can subscribe to removed ads and help save the planet.{' '}
              <a
                onClick={() => {
                  chrome.tabs.create({ url: 'https://carboncollective.club/dashboard' })
                }}
                className="text-blue-600 cursor-pointer"
              >
                Click here to find out more
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full px-2 py-2 bg-green-400 bg-opacity-30 rounded space-x-2 divide-x divide-green-600 divide-opacity-30">
        <LightBulbIcon className="h-6 w-6 text-green-600 mx-1" />
        <p className="pl-2">By being a subscriber you'll get no adverts, make the page faster and reduce the amount of data required to use the site.!</p>
      </div>
    </div>
  )
}
