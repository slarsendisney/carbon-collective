import { useAuth } from '../context/auth-context'
import { EmptyFrameIllustration } from '../illustrations/EmptyFrame'
import { LittleSpinner } from './LittleSpinner'
import { Analysing } from './Analysing'
import { useMemo } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Subscriber } from './Subscriber'

export const LittleDashboard = () => {
  const { account, onSubscribedSite, domain } = useAuth()

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
  }, [onSubscribedSite])
  return (
    <div className="w-[400px] bg-blue-100 h-full flex flex-col items-center justify-center space-y-2 p-4">
      <EmptyFrameIllustration className="w-full" center={false}>
        {bodyContent}
      </EmptyFrameIllustration>
    </div>
  )
}
