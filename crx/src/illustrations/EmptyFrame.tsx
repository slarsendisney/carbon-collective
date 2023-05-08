import { BoltIcon, Cog6ToothIcon, PauseIcon } from '@heroicons/react/24/solid'
import { Logo } from '../logo/Logo'
import { useAuth } from '../context/auth-context'

export const EmptyFrameIllustration = ({
  className,
  children,
  center = true
}: {
  className: string
  children: React.ReactNode,
  center?: boolean
}) => {
  const { active, toggleActive } = useAuth()
  return (
    <div className={`${className} relative overflow-hidden`}>
      <div className="absolute top-0 h-8 w-full px-3.5 left-0 flex items-center justify-between z-50">
        <div className="flex items-center space-x-1">
          <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
            <Logo className="w-5 mt-0.5 text-blue-600" />
          </a>
          {active ? (
            <button onClick={toggleActive} className="flex items-center bg-green-300  text-green-900 rounded-full pl-1 pr-2 py-0.5">
              <BoltIcon className="h-3 w-3" />
              <p className="p-0 m-0" style={{ fontSize: 9 }}>
                ACTIVE
              </p>
            </button>
          ) : (
            <button onClick={toggleActive} className="flex items-center bg-red-300  text-red-700 rounded-full pl-1 pr-2 py-0.5">
              <PauseIcon className="h-3 w-3" />
              <p className="p-0 m-0" style={{ fontSize: 9 }}>
                PAUSED
              </p>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              chrome.tabs.create({ url: '/options.html' })
            }}
          >
            <Cog6ToothIcon className="h-4 w-4 hover:text-blue-600" />
          </button>
        </div>
      </div>
      <div className={`absolute pt-10 pb-1 top-0 w-full h-full left-0 flex ${center ? "items-center justify-center": "items-start justify-center"}`}>
        {children}
      </div>
      <svg viewBox="0 0 1456 1039" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1414.91 3H40.12C19.6192 3 3 19.6192 3 40.12V997.94C3 1018.44 19.6192 1035.06 40.12 1035.06H1414.91C1435.41 1035.06 1452.03 1018.44 1452.03 997.94V40.12C1452.03 19.6192 1435.41 3 1414.91 3Z"
          fill="#F4F1ED"
          stroke="#070707"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 122.8799H1452.03"
          stroke="#070707"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M218.69 38.3701H211.35C205.557 38.3701 200.86 43.0666 200.86 48.8601V56.2001C200.86 61.9936 205.557 66.6901 211.35 66.6901H218.69C224.483 66.6901 229.18 61.9936 229.18 56.2001V48.8601C229.18 43.0666 224.483 38.3701 218.69 38.3701Z"
          fill="#FFEFF0"
        />
        <path
          d="M170.38 38.3701H163.04C157.247 38.3701 152.55 43.0666 152.55 48.8601V56.2001C152.55 61.9936 157.247 66.6901 163.04 66.6901H170.38C176.173 66.6901 180.87 61.9936 180.87 56.2001V48.8601C180.87 43.0666 176.173 38.3701 170.38 38.3701Z"
          fill="#FFEFF0"
        />
        <path
          d="M122.07 38.3701H114.73C108.937 38.3701 104.24 43.0666 104.24 48.8601V56.2001C104.24 61.9936 108.937 66.6901 114.73 66.6901H122.07C127.863 66.6901 132.56 61.9936 132.56 56.2001V48.8601C132.56 43.0666 127.863 38.3701 122.07 38.3701Z"
          fill="#FFEFF0"
        />
      </svg>
    </div>
  )
}
