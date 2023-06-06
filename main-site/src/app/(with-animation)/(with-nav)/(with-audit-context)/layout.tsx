import { AuditProvider } from "@/context/audit-context";

import kv from "@vercel/kv";

const AuditContextLayout = async ({ children }: { children: JSX.Element }) => {
  const domainCollectiveIDs = await kv.get("domainCollectiveIDs") || {};

  return (
  <AuditProvider domainCollectiveIDs={domainCollectiveIDs}>{children}</AuditProvider>
)};

export default AuditContextLayout;
