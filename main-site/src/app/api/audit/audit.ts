const addProtocolIfMissing = (url: string) => {
  if(url === "carboncollective.club"){
    return `https://www.${url}`
  }
  if (!url.startsWith("http")) {
    return `https://${url}`;
  }
  return url;
};

export const conductAudit = async (url: string) => {
  const APIKEY = process.env.GOOGLEPAGESPEED_APIKEY;
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${addProtocolIfMissing(
      url
    )}&key=${APIKEY}`
  );
  const data = await response.json();
  console.log(data)
  return { ...data };
};
