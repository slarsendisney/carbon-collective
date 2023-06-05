import { LightBulbIcon } from '@heroicons/react/24/solid'

export const NotSupported = () => {
  return (
    <div className="flex flex-col w-full space-y-2 pt-1">
      <div className="flex items-center w-full pl-5 pr-2 py-2 bg-gray-400 bg-opacity-10 rounded">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col  col-span-3 justify-center">
            <p className="text-sm font-semibold">Carbon collective disabled</p>
            <p>
             Why not reach out and see if you can convince them to join? You'd be helping save the planet.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full px-2 py-2 bg-yellow-400 bg-opacity-30 rounded space-x-2 divide-x divide-yellow-600 divide-opacity-30">
        <LightBulbIcon className="h-6 w-6 text-yellow-600 mx-1" />
        <p className="pl-2">
          Sites that support the carbon collective allow their users to reduce their carbon emissions by up to 70% when visiting!
        </p>
      </div>
    </div>
  )
}
