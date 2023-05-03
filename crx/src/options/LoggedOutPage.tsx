import { FullPageContentWrapper } from './FulPageContentWrapper'

export const LoggedOutPage = () => {
  return (
    <FullPageContentWrapper>
      <div className="w-72 px-4 text-center flex flex-col justify-center space-y-2">
        <p className="text-lg ">
          <span className="font-bold">You are logged out.</span>
        </p>
        <p className="text-gray-500">To use this page you must be authenticated.</p>
        <div className="grid gap-1 w-full">
          <a href="http://localhost:3000/sync" className="btn-primary-medium text-center">
            Login
          </a>
          <a href="http://localhost:3000" className="btn-secondary-medium text-center">
            Visit Site
          </a>
        </div>
      </div>
    </FullPageContentWrapper>
  )
}
