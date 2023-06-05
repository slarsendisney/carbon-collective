import { useAuth } from '../context/auth-context'
import { EmptyFrameIllustration } from '../illustrations/EmptyFrame'
import { LittleSpinner } from './LittleSpinner'
import { Analysing } from './Analysing'
import { useMemo } from 'react'
import { CheckCircleIcon, EyeIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'
import { Subscriber } from './Subscriber'
import { Supported } from './Supported'
import { NotSupported } from './NotSupported'

export const LittleDashboard = () => {
  const { account, onSubscribedSite, domain, siteSupported, hasSubscriptions } = useAuth()

  const bodyContent = useMemo(() => {
    if (onSubscribedSite) {
      return (
        <div className="flex flex-col w-full px-4 space-y-2">
          <div className="col-span-2 flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
              <CheckCircleIcon className="text-green-500 h-6 w-6" />
              <p className="text-sm font-semibold">{domain} subscriber</p>
            </div>
          </div>
          <Subscriber />
        </div>
      )
    } else if (siteSupported) {
      return (
        <div className="flex flex-col w-full px-4 space-y-2">
          <div className="col-span-2 flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
              <EyeIcon className="text-green-500 h-6 w-6" />
              <p className="text-sm font-semibold">{domain} supported</p>
            </div>
          </div>
          <Supported />
        </div>
      )
    } else if (hasSubscriptions) {
      return (
        <div className="flex flex-col w-full px-4 space-y-2">
          <div className="col-span-2 flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
              <HandThumbDownIcon className="text-red-500 h-6 w-6" />
              <p className="text-sm font-semibold">{domain} not supported</p>
            </div>
          </div>
          <NotSupported />
        </div>
      )
    }

    return (
      <div className="flex flex-col w-full px-4 space-y-2">
        <div className="col-span-2 flex  items-center justify-between w-full">
          <div className="flex items-center space-x-1">
            <LittleSpinner className="text-blue-600" />
            <p className="text-sm font-semibold">Analyzing Web Usage</p>
          </div>
          {account?.profileImageUrl && (
            <img
              src={account.profileImageUrl}
              className="w-6 h-6 rounded-full bg-blue-600"
              alt="Profile"
            />
          )}
        </div>
        <Analysing />
      </div>
    )
  }, [onSubscribedSite, hasSubscriptions, siteSupported, domain, account?.profileImageUrl])
  return (
    <div className="w-[400px] bg-blue-100 h-full flex flex-col items-center justify-center space-y-2 p-4">
      <EmptyFrameIllustration className="w-full" center={false}>
        {bodyContent}
      </EmptyFrameIllustration>
    </div>
  )
}
