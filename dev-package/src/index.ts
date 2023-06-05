/// <reference types="chrome"/>

import { AxiosResponse } from "axios";

const axios = require("axios");
const { URLS } = require("./config");

export class CarbonCollectiveClient {
  siteId;
  chromiumExtId: string | undefined;
  hasChromeExtension: boolean | undefined;
  userId: string | undefined;
  initialising: boolean = true;

  constructor(public SITE_ID: string) {
    this.siteId = SITE_ID;
  }

  private async fallbackFetch(url: string, options?: any) {
    try {
      if (typeof fetch !== "undefined") {
        return await fetch(url, options).then((response) => response.json());
      } else {
        return await axios
          .get(url, options)
          .then((response: AxiosResponse) => response.data);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Could not fetch data");
    }
  }

  async init() {
    await this.fallbackFetch(URLS.EXTENSION_CONFIG).then((data) => {
      this.chromiumExtId = data.chromiumExtId;
    });
    if (typeof chrome === "undefined") {
      return false;
    }
 
    if (this.chromiumExtId === undefined) {
      throw new Error("Not initialized. Please call init() first.");
    }

    chrome.runtime.sendMessage(
      this.chromiumExtId,
      { type: "PING" },
       (response) => {
        if (response && response.type === "PONG") {
          this.hasChromeExtension = true;
    
        } else {
          this.hasChromeExtension =  false;
        }
      }
    );
    chrome.runtime.sendMessage(
      this.chromiumExtId,
      { type: "GET_USER_ID" },
       (response) => {
        if (response && response.type === "USER_ID") {
          this.userId = response.userId;
        } 
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    this.initialising = false;
  }

  private async communicateSubscriptionStatus(subscribed: boolean) {
    const hasExt = await this.hasChromeExtension;
    if (!hasExt) {
      return undefined;
    }
    await chrome.runtime.sendMessage(
      this.chromiumExtId,
      { type: "SITE_SUBSCRIPTION_STATUS", value: subscribed }
    );
  }


  async isSubscribed() {
    const hasExt = this.hasChromeExtension;
    if (!hasExt) {
      console.error("No extension found");
      return false;
    }
    if (!this.userId) {
      console.error("No user id found");
      return false;
    }
    const subscribed = await this.fallbackFetch(URLS.SUBSCRIBED, {
      method: "POST",
      body: JSON.stringify({
        userId: this.userId,
        siteId: this.siteId,
      }),
    })
      .then((data) => {
        this.communicateSubscriptionStatus(data.subscribed)
        return data.subscribed;
      })
      .catch(() => {
        return false;
      });

    return subscribed;
  }
}

module.exports = CarbonCollectiveClient;
