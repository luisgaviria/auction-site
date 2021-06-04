import Commonwealth from "../src/apiClient/Commonwealth.js";
import Apg from "../src/apiClient/crawlApg.js";
import Baystate from "../src/apiClient/crawlBaystate.js";
import Client from "../src/apiClient/crawlClient.js";
import Dean from "../src/apiClient/crawlDean.js";
import Ri from "../src/apiClient/crawlRi.js";
import Tache from "../src/apiClient/crawlTache.js";
import Danielp from "../src/apiClient/Danielp.js";
import Harvard from "../src/apiClient/Harvard.js";
import Towne from "../src/apiClient/Towne.js";
import auctionControl from "../src/controllers/auctionControl.js";

describe("Tests Crawl Functions", () => {
  it("tests that HarvardCrawl returns an array with data", async () => {
    const response = await Harvard({ url: "http://harvardauctioneers.com/" });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });
  it("tests that Commonwealth returns an array with data", async () => {
    const response = await Commonwealth({
      url: "http://www.commonwealthauction.com/auctions.asp?location=1",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Towne returns an array with data", async () => {
    const response = await Towne({
      url: "https://www3.towneauction.com/Auctions_NoNav.aspx",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Apg returns an array with data", async () => {
    const response = await Apg({
      url: "https://apg-online.com/auction-schedule/",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Dean returns an array with data", async () => {
    const response = await Dean({
      url: "http://www.deanassociatesinc.com/auctions.htm",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Tache returns an array with data", async () => {
    const response = await Tache({
      url:
        "https://docs.google.com/spreadsheets/u/1/d/14nrcaKBhCA61FcnBwU6EbiDbRQtOP-gQVxJVvxg5_o0/pubhtml/sheet?headers=false&gid=0",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Ri returns an array with data", async () => {
    const response = await Ri({
      url: "http://www.auctionsri.com/scripts/auctions.asp?category=R",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Baystate returns an array with data", async () => {
    jest.setTimeout(10000);
    const response = await Baystate({
      url: "https://www.baystateauction.com/auctions/state/ma",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that Client returns an array with data", async () => {
    const response = await Client({
      url: "http://www.auctionmarketinggroup.com/auctions.html",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that DanielP returns an array with data", async () => {
    const response = await Danielp({
      url: "https://www.re-auctions.com/Auction-Schedule/PropertyAgentName/-1/sortBy/cf11",
    });

    try {
      expect(response.length).not.toEqual(0);
      response.map((data) => {
        expect(data.date).not.toEqual(0);
        expect(data.status).not.toEqual(0);
        expect(data.address).not.toEqual(0);
        expect(data.deposit).not.toEqual(0);
      });
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });

  it("tests that the dates are in order", async () => {
    let sorted = true;
    try {
      jest.setTimeout(10000);

      const res = {
        statusCode: 0,
        allAuctions: {},
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.allAuctions = data.allAuctions;
        },
      };
      await auctionControl({}, res);
      for (let i = 0; i < res.allAuctions.length - 1; i++) {
        if (new Date(res.allAuctions[i].date) > new Date(res.allAuctions[i + 1].date)) {
          console.log(res.allAuctions[i], res.allAuctions[i + 1]);
          sorted = false;
          break;
        }
      }
      expect(sorted).toEqual(true);
    } catch (e) {
      expect(e).toEqual({
        error: "This field is empty",
      });
    }
  });
});
