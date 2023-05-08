import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { AnalysingIllustration } from '../illustrations/Analysing'

export const Analysing = () => {
  return (
    <div className="flex flex-col w-full space-y-2 pt-1">
      <div className="flex items-center w-full pl-5 pr-2 py-2 bg-gray-400 bg-opacity-10 rounded">
        <div className="grid grid-cols-3 gap-2">
          <AnalysingIllustration className="w-full" />
          <div className="flex flex-col  col-span-2 justify-center">
            <p className="text-sm font-semibold">We're Gathering Statistics</p>
            <p>
              By learning how you use the web, we can create a personalized subscription plan just
              for you.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full px-2 py-2 bg-yellow-400 bg-opacity-30 rounded space-x-2 divide-x divide-yellow-600 divide-opacity-30">
        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mx-1" />
        <p className='pl-2'>Try and keep your habits as normal as possible, we get the best results that way.</p>
        </div>
    </div>
  )
}
