const CarbonCollective = require("carbon-collective");

const carbonCollective = new CarbonCollective("SITE_ID");
await carbonCollective.init();
const isSubscribed = await carbonCollective.isSubscribed();