import { EmptyFrameIllustration } from '../illustrations/EmptyFrame'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { m } from 'framer-motion'

export const Loading = () => {
  return (
    <div className="w-[400px] bg-blue-100 h-full flex flex-col items-center justify-center space-y-2 p-4">
      <EmptyFrameIllustration className="w-full">
        <div className="space-y-2 max-w-[300px] text-center flex-col items-center justify-center">
          <m.div
            className="mx-auto h-12 w-12"
            initial={{ rotate: 0 }}
            animate={{ rotate: [
              0, 360
            ] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowPathIcon className="h-12 w-12" />
          </m.div>
          <p className='text-xl'>Loading...</p>
        </div>
      </EmptyFrameIllustration>
    </div>
  )
}
