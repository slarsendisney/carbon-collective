import { NextResponse } from "next/server";
import kv from "@vercel/kv";
import { conductAudit } from "./audit";

export async function POST(request: Request) {



  // get userId and siteId from request body
  const { sites } = await request.json();

  const auditResults = await Promise.all(
    sites.map(async (site: string) => {
      // use cached audit if available
      const audit = await kv.hgetall(`audit-${site}`);

      console.log(site, audit)

      if (audit) {
        return {
          site,
          audit,
        };
      }

      const {
        lighthouseResult: { audits },
      } = await conductAudit(site);

      const MBWeight = audits["total-byte-weight"].numericValue / 1024 / 1024;

      const auditData = {
        MBWeight,
        cachedMBWeight:
          MBWeight - audits["uses-long-cache-ttl"].numericValue / 1024 / 1024,
        carbon: MBWeight * 10,
      };

      await kv.hset(`audit-${site}`, auditData);

      return {
        site,
        audit: auditData,
      };
    })
  );

  return NextResponse.json({
    audits: auditResults,
  });
}
