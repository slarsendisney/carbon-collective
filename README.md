# 🌳 CarbonCollective.club

> Using Square to offer dynamic subscriptions that supports small creators while helping you browse sustainably.

## ⚡️ Quick Links:

- [Try the site](carboncollective.club)
- [DevPost]()

## 🔨 Our Team

- **Carlota Veal-Baschwitz ( The Energy Geek ⚡️ )**: Energy Analyst acting as Designer.
- **Sam Larsen-Disney ( The Tech Guy 💻 )**: Software Engineer with a Front-end Focus.

## The Problem

The internet is responsible for [3.7% of all global CO2 emissions.](https://www.bbc.com/future/article/20200305-why-your-internet-habits-are-not-as-clean-as-you-think#:%7E:text=The%20carbon%20footprint%20of%20our,a%20researcher%20at%20Lancaster%20University)\*\* This is the same amount as the aviation industry. The larger a webpage, the more energy it requires to send, and as a result, the more carbon it emits. One easy way we can reduce a webpage impact on the environment is to remove advertising. Adverts can account for 18 to 70% of a webpage's size but, if you use an adblocker, it harms the creator as the money they would have made from that advert is now gone.

But what if there was an alternative? What if we could use Square and a sprinkle of Javascript to reduce a websites carbon impact while still allowing us to support the creators who's sites we value most - this was our mission!

After hundreds of post-it notes, a handful of figma files and thousands of lines of code, we're pleased to introduce our hackathon submission - the Carbon Collective.

## How it works

The Carbon Collective is a website, chrome extension and javascript package that serve two main personas:

### Site Fans

As a site fan, I can subscribe to my favourite sites in exchange for ad-free browsing. But the best bit is that their subscription plan is dynamic and customizable. They work out what is a fair amount to charge me for my site visits based on my browsing activity.

_It works in a few easy steps:_

- Visit CarbonCollective and login
- Download our chrome extension
- Browse the web as normal
- Return to CarbonCollective and read your carbon report
- Subscribe to the sites you care most about
- Enjoy ad-free visits to your favourite sites while also reducing your carbon impact

### Site Owners

As a site owner, the Carbon Collective makes it easy to switch from an advertising model to a subscription model. I can start accepting payments via square without having to do any legwork and their handy npm package makes it easy to understand a site visitors subscription status.

_To get started:_

- Visit CarbonCollective and login
- Visit the Sites page
- Connect your Square account and webhook
- Use the developer package to identify carbon collective subscribers
- Watch the money roll in.

## Tech Overview

The code base is split into four sections:

- `main-site` which contains the code for the main website. The website can be visited at [carboncollective.club](carboncollective.club).
- `crx` which contains the code for the accompanying chrome extension
- `dev-package` which contains the npm installable package for use on carbon collective onboarded sites.
- `demo` which contains code for a few dummy websites and scripts that were used to demo the chrome extension usage once it is installed.

### 💻 Under the hood

The application was built with:

- **square APIs** for all things square.
- **NextJS** as our blazing fast React framework for performance, scalability, security and accessibility
- **Vercel Serverless Functions** to bring an entire backend to EarthBound - without managing a backend.
- **Vercel KV Storate** for blazing fast read and writes.
- **TailwindCSS** to leverage the benefits and speed of the utility first CSS framework.

## 💸 Monetisation Strategy

While not incorporated in this version, we believe we could take a very small percentage of each subscription 
to cover our operating costs. 


## 💰 Value to square.com

Using our platform square.com site owners can switch monetization strategies with ease.

## ⭐️ Square features used:

- Checkout
- Webhooks
- OAuth
- API
  - Subscription creation
  - Subscription management

## Challenges we ran into
- **New Technology**: Hackathons are a great place to try out new technologies and during this event, we saw that Vercel had released their new storage options. We decided we could benefit from using the new KV storage. But It caused many headaches as it was brand new with limited documentation.
- **Chrome Extensions**: Though we're experienced with the world of Javascript, chrome extensions are a little unique. They have their own language and framework that we had to learn in order to create what we wanted. We wish we had started the extension sooner as there was a lot of learning too and not enough time. We got it done but it was a stress.

## Accomplishments that we're proud of

Carlota - _"Creating an onboarding flow for a chrome extension and website together was a challenge. But the hard work paid off and I am super pleased with how it flows now!"_

Sam - _"I have never written this much code for a hackathon submission - I fell in love with this project as I built it. I think its very close to being production ready!"_


## 💪 Extra Submission details

Our Square APP ID is 