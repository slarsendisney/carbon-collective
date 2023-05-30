import { AuditProvider } from "@/context/audit-context";

const AuditContextLayout = ({ children }: { children: JSX.Element }) => (
  <AuditProvider>{children}</AuditProvider>
);

export default AuditContextLayout;
