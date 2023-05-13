# CarbonCollective

- Must be run client side.


Minimal Usage:

```jsx
import CarbonCollective from "carbon-collective-js";


const carbonCollective = new CarbonCollective("SLD");
await carbonCollective.init();
const isSubscribed = await carbonCollective.isSubscribed();
console.log("isSubscribed", isSubscribed);
```
