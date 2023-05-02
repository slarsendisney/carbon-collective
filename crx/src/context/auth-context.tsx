import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";

import { Login } from "./Login";
  
  export const AuthContext = createContext({});
  
  export const AuthProvider = ({ children }: {
    children: React.ReactNode
  }) => {
    const [account, setAccount] = useState(null);
    const [onCreativeCollectiveSite, setOnCreativeCollectiveSite] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          var activeTab = tabs[0];
          var activeTabURL = activeTab.url;
          if (activeTabURL?.includes("localhost:3000")) {
            setOnCreativeCollectiveSite(true);
          }
        }
      );
    });
  
    useEffect(() => {
        console.log("got account")
      chrome.storage.local.get(["accountId"], async (result) => {
      
        console.log(result);
        if (result.accountId && result.privateKey) {
          setAccount(result.accountId);
    
        } else {
          console.log("no account found");
        }
        setLoading(false);
        return;
      });
    }, []);
  
  
    const logout = useCallback(() => {
      chrome.storage.local.remove(
        ["accountId"],
        () => {
          setAccount(null);
        }
      );
    }, []);
  
    const isSignedIn = useMemo(() => {
      console.log(account);
      return !!account;
    }, [account]);
  
    if (loading) {
      return <div className="login card">Loading...</div>;
    }
    if (!isSignedIn) {
      return <Login />;
    }
  
    if (onCreativeCollectiveSite) {
      return (
        <AuthContext.Provider
          value={{
            account,
            logout,
          }}
        >
          <div className="px-2 pt-2 ">
            <div className="login card">
              <div className="flex flex-col items-center justify-center space-y-3">
           
                <p className="bg-gray-100 rounded -mx-6 -mb-6 p-2">
                  👋 Hey <span className="font-bold">{account}</span>, you're ready to start using
                  CreativeCollective! Navigate to a supported site to see it in action.
                </p>
              </div>
            </div>
          </div>
        </AuthContext.Provider>
      );
    }
  
    return (
      <AuthContext.Provider
        value={{
          account,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
  };