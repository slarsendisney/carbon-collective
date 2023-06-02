const CarbonCollective = require("carbon-collective-js");

async function main() {
  const carbonCollective = new CarbonCollective("SITE_ID");
  await carbonCollective.init();
  const isSubscribed = await carbonCollective.isSubscribed();
  console.log("isSubscribed", isSubscribed);
}

main();
