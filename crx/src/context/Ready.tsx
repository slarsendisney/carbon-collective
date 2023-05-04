import { EmptyFrameIllustration } from '../illustrations/EmptyFrame'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { m } from 'framer-motion'
import { useAuth } from './auth-context'

export const Ready = () => {
  const {account} = useAuth()
  return (
    <div className="w-[400px] bg-blue-100 h-full flex flex-col items-center justify-center space-y-2 p-4">
      <EmptyFrameIllustration className="w-full">
        <div className="space-y-2 max-w-[300px] text-center">
          {account?.profileImageUrl && (
            <img src={account.profileImageUrl} className="w-12 h-12 mx-auto rounded-full bg-gray-100" alt="Profile" />
          )}

          <div className='flex space-x-1 w-full justify-center'>
          <m.p
            className="text-xl "
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            👋
          </m.p>
          <p className="text-lg ">
            Hey <span className="font-bold">{account?.fullName}</span>!
          </p>
          </div>
          <p className="pb-2">
            You're ready to start using CreativeCollective! Navigate to a supported site to see it
            in action.
          </p>
          <button
            className="btn-secondary flex items-center space-x-1 mx-auto"
            onClick={() => {
              chrome.tabs.create({ url: '/options.html' })
            }}
          >
            <Cog6ToothIcon className="h-4 w-4" />
            <p>Extension Settings</p>
          </button>
        </div>
      </EmptyFrameIllustration>
    </div>
  )
}
