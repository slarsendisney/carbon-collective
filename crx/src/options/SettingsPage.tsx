import { useState } from 'react'
import { useAuth } from '../context/auth-context'
import { FullPageContentWrapper } from './FulPageContentWrapper'

export const SettingsPage = () => {
  const { logout, account, active, toggleActive } = useAuth()

  return (
    <FullPageContentWrapper>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="md:w-64 px-6 text-center flex flex-col justify-center space-y-2 md:border-r">
          {account && (
            <div className="flex flex-col items-center space-x-2">
              {account.profileImageUrl && (
                <img
                  src={account.profileImageUrl}
                  className="w-12 h-12 mx-auto rounded-full"
                  alt="Profile"
                />
              )}

              <p className="text-lg ">
                <span className="font-bold">{account.fullName}</span>
              </p>
              <p className="text-gray-500">Signed in since 05/02/2023.</p>
            </div>
          )}
          <div>To manage your subscription please visit your dashboard.</div>
          <div className="grid gap-1 w-full">
            <a href="https://www.carboncollective.club/dashboard" className="btn-primary-medium text-center">
              Visit Dashboard
            </a>
            <button className="btn-secondary-medium" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col w-96 h-full px-6 space-y-2">
       
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={() => toggleActive()}
              type="checkbox"
              checked={active}
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Tracking {active ? 'Enabled' : 'Disabled'}
            </span>
          </label>
          <p>
            We use tracking to customize your subscription plan, though you can turn this off at any
            time.
          </p>

          <div className="grid grid-cols-2 w-full gap-2">
            <div className=" text-blue-600 border-2 border-blue-600 rounded p-2 flex flex-col items-center justify-center">
              <p className="text-2xl">65</p>
              <p>Site's visited</p>
            </div>
            <div className="text-blue-600 border-2 border-blue-600 rounded p-2 flex flex-col items-center justify-center">
              <p className="text-2xl">32</p>
              <p>Site's Supporting</p>
            </div>
            <div className="col-span-2 text-green-600 border-2 border-green-600 rounded p-2 flex flex-col items-center justify-center">
              <p className="text-2xl">12.04g</p>
              <p>Carbon Saved</p>
            </div>
          </div>
        </div>
      </div>
    </FullPageContentWrapper>
  )
}
