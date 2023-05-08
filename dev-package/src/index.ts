/// <reference types="chrome"/>

import { AxiosResponse } from "axios";

const axios = require("axios");
const { URLS } = require("./config");

export class Client {
  siteId;
  chromiumExtId: string | undefined;

  constructor(siteId: string) {
    this.siteId = siteId;
  }

  private async fallbackFetch(url: string, options?: any) {
    if (typeof fetch !== "undefined") {
      return await fetch(url, options).then((response) => response.json());
    } else {
      return await axios.get(url, options).then((response: AxiosResponse) => response.data);
    }
  }

  async init() {
    this.fallbackFetch(URLS.EXTENSION_CONFIG).then((data) => {
      this.chromiumExtId = data.chromiumExtId;
    });
    
  }

  async hasChromeExtension() {
    if (typeof chrome === "undefined") {
      return false;
    }
    await chrome.runtime.sendMessage(
      "dokaenhikhgdmjnpcmemgmlncbkdffdl",
      { type: "PING" },
      function (response) {
        if (response && response.type === "PONG") {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  async getExtensionUserId() {
    const hasExt = await this.hasChromeExtension();
    if (!hasExt) {
      return undefined;
    }

    await chrome.runtime.sendMessage(
      "dokaenhikhgdmjnpcmemgmlncbkdffdl",
      { type: "GET_USER_ID" },
      function (response) {
        if (response && response.type === "USER_ID") {
          return response.userId;
        } else {
          return undefined;
        }
      }
    );
  }

  async isSubscribed() {
    const hasExt = await this.hasChromeExtension();
    if (!hasExt) {
      return false;
    }
    const userId = await this.getExtensionUserId();
    if (!userId) {
      return false;
    }
    this.fallbackFetch(URLS.SUBSCRIBED, {
      method: "POST",
      body: JSON.stringify({
        userId,
        siteId: this.siteId,
      }),
    })
      .then((data) => {
        return data.subscribed;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = Client;