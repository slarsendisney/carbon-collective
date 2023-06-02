import { HandThumbUpIcon } from '@heroicons/react/24/solid'

export const Subscriber = () => {
  return (
    <div className="flex flex-col w-full space-y-2 pt-1">
      <div className="flex items-center w-full pl-5 pr-2 py-2 bg-gray-400 bg-opacity-10 rounded">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col  col-span-3 justify-center">
            <p className="text-sm font-semibold">You're a carbon collective member!</p>
            <p>
              This website has recognized your subscription status and has removed ads. Click here to manage your subscription.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full px-2 py-2 bg-green-400 bg-opacity-30 rounded space-x-2 divide-x divide-green-600 divide-opacity-30">
        <HandThumbUpIcon className="h-6 w-6 text-green-600 mx-1" />
        <p className='pl-2'>By being a subscriber you are helping save the planet. Thankyou!</p>
        </div>
    </div>
  )
}
