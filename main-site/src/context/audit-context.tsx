"use client"
import React, { useState, useContext, useMemo, useEffect } from "react";

interface AuditContextAttributes {
    topSites: string[],
    supportedDomains: string[],
    loadingDetails: boolean,
    detailsRes: any,
    domainCollectiveIDs: {
        [key: string]: string;
    }
}

const AuditContext = React.createContext<AuditContextAttributes>({
  topSites: [],
  supportedDomains: [],
  loadingDetails: true,
  detailsRes: null,
  domainCollectiveIDs: {}
});

export const AuditProvider = ({ ...props }) => {

    const [topSites, setTopSites] = useState<string[]>([]);
    const [supportedDomains, setSupportedDomains] = useState<string[]>([]);
    const [domainCollectiveIDs, setDomainCollectiveIDs] = useState<{
        [key: string]: string;
    }>({});
    const [loadingDetails, setLoadingDetails] = useState<boolean>(true);
    const [detailsRes, setDetailsRes] = useState<any>();

    useEffect(() => {
        if (!chrome?.runtime) return;
        chrome.runtime.sendMessage(
          process.env.NEXT_PUBLIC_EXTENSION_ID,
          { type: "GET_DOMAINS" },
          function (response) {
            const { site_visit_count, supported_domains, domainCollectiveIDs } = response;
            // get top 10 sites
            const newTopSites = Object.keys(site_visit_count)
              .sort((a, b) => site_visit_count[b] - site_visit_count[a])
            console.log(domainCollectiveIDs)
            setTopSites(newTopSites);
            setSupportedDomains(supported_domains);
            setDomainCollectiveIDs(domainCollectiveIDs);
          }
        );
      }, []);
    
      useEffect(() => {
        const gatherData = async () => {
          const res = await fetch("/api/audit", {
            method: "POST",
            body: JSON.stringify({
              sites: topSites,
            }),
          });
          const resJson = await res.json();
          setDetailsRes(resJson);
          setLoadingDetails(false);
        };
    
        if (topSites.length >= 4) {
          gatherData();
        }
      }, [topSites]);

  return (
    <AuditContext.Provider
      value={{
        topSites,
        supportedDomains,
        loadingDetails,
        detailsRes,
        domainCollectiveIDs
      }}
    >
      {props.children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => useContext(AuditContext);

export default AuditContext;
