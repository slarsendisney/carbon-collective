import { WelcomeIllustration } from '../illustrations/Welcome'
import { Logo } from '../logo/Logo'

export const Login = () => {
  return (
    <div className="w-[600px] h-full flex flex-col items-center justify-center space-y-2">
      <WelcomeIllustration className="w-full">
        <div className='space-y-2 max-w-[300px]'>
          <Logo className="w-12 h-12 mx-auto text-blue-600" />
          <p className="text-md text-center w-full px-2">
          You're moments away from supporting your favorite creators while avoiding those
          pesky ads. <br/> 
        </p>
        <button
          className="btn-primary-large w-full"
          onClick={() => chrome.tabs.create({ url: 'https://www.carboncollective.club/sync' })}
        >
          <div className="flex space-x-2 items-center justify-center">
            <p>Sign in</p>
          </div>
        </button>
        <button
          className="btn-secondary-large w-full"
          onClick={() => chrome.tabs.create({ url: 'https://www.carboncollective.club' })}
        >
          How it works
        </button>
       
        </div>
      </WelcomeIllustration>
      
    </div>
  )
}
