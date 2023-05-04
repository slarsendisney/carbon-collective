import { useAuth } from '../context/auth-context'
import { EmptyFrameIllustration } from '../illustrations/EmptyFrame'

export const LittleDashboard = () => {
  const { account } = useAuth()
  return (
    <div className="w-[400px] bg-blue-100 h-full flex flex-col items-center justify-center space-y-2 p-4">
      <EmptyFrameIllustration className="w-full">
        <div className="grid grid-cols-2 gap-2  w-80">
          <div className="col-span-2 flex space-x-2 items-center justify-start w-full">
            {account?.profileImageUrl && (
              <img
                src={account.profileImageUrl}
                className="w-8 h-8 rounded-full bg-blue-600"
                alt="Profile"
              />
            )}
            <p className='text-lg'>{account?.fullName}</p>
          </div>
          <div className=" text-blue-600 border-2 border-blue-600 rounded p-1 flex flex-col items-center justify-center">
              <p className="text-2xl">65</p>
              <p>Site's visited</p>
            </div>
            <div className="text-blue-600 border-2 border-blue-600 rounded p-1 flex flex-col items-center justify-center">
              <p className="text-2xl">32</p>
              <p>Site's Supporting</p>
            </div>
            <div className="col-span-2 text-green-600 border-2 border-green-600 rounded p-1 flex flex-col items-center justify-center">
              <p className="text-2xl">12.04g</p>
              <p>Carbon Saved</p>
            </div>
     
        </div>
      </EmptyFrameIllustration>
    </div>
  )
}
