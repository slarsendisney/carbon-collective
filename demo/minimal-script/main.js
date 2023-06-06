const CarbonCollective = require("carbon-collective");

const carbonCollective = new CarbonCollective("SITE_ID");
// within an async function
await carbonCollective.init();
const isSubscribed = await carbonCollective.isSubscribed();