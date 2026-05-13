# Study data
This is the data generated for the final study. Settings used detailed below:

The same JSON is used for both (seed of 1). The generated data uses normal distribution and is created via ContextFreeGrammar.
privacy.resistFingerprinting is set to false in Firefox about:config to enable more precise timing measurements. The data appear to not be as exact as Chrome however, in which I did not find a similar setting.

Every set is run four times, twice on Firefox (Gecko) comparing Rust/JS and twice on Chrome (V8) comparing Rust/JS.
A set consists of 10 runs of n amount of elements created and then added to the DOM.
Each set is performed on a fresh incognito window. This makes sure that no caching between sets happen while giving time for
interpreter optimization.

All tests have been performed on the same machine during similar cirumstances to make the result as fair as possible.

The data have been divided between Low (1-500), Medium (600-1000) and High (1000-1500) according to number of elements created. 

