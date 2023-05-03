import packageJson from '../../package.json'
import { Plant1 } from '../illustrations/Plant1'
import { Plant2 } from '../illustrations/Plant2'
import { Squiggle } from '../illustrations/Squiggle'
import { Logo } from '../logo/Logo'
import { m } from 'framer-motion'

export const FullPageContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center space-y-4 justify-center grow bg-blue-100 text-gray-700 min-h-screen relative overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Logo className="w-10 text-blue-600" />
      </m.div>
      <m.div
        initial={{ y: 30 }}
        animate={{ y: 0, scale: [1, 1.05, 1, 1] }}
        className="bg-white rounded-lg p-6 relative z-30 shadow-lg"
      >
        {children}
      </m.div>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-blue-800 bg-white px-2 py-1 rounded relative z-30 md:bg-transparent">
          Version {packageJson.version}
        </p>
      </m.div>
     
      <m.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-0 flex w-full justify-end items-end md:p-2"
      >
        <Plant1 className="w-32 " />
        <Plant2 className="w-48 -ml-12 z-40" />
      </m.div>
    </div>
  )
}
