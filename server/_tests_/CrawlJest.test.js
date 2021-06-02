// import Commonwealth from "../src/apiClient/Commonwealth.js";

// import regeneratorRuntime from "regenerator-runtime";

// describe("Tests our crawl functions", () => {
//   test("it's undefined", async () => {
//     const url = "http://www.commonwealthauction.com/auctions.asp?location=1";
//     const Crawl = await Commonwealth(url);
//     console.log(Crawl);
//     expect(Crawl).not.toBe(undefined);
//   });
// });

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

// describe("Crawl Functions", () => {
// it("tests that CommonWealth crawl returns an array with data", () => {
//   Commonwealth({ url: "http://www.commonwealthauction.com/auctions.asp?location=1" })
//     .then((response) => {
//       response.map((data) => {
//         expect(data.date).toEqual(0);
//       });
//       // expect(response.length).not.toEqual(0);
//       // expect(response[0].date.length).not.toEqual(0)
//       // expect(response[0].address.length).not.toEqual(0);
//       // expect(response[0].status.length).not.toEqual(0);
//       // expect(response[0].deposit.length).not.toEqual(0);
//       // expect(response[0].link.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// it("tests that CommonWealth crawl returns an array with data", () => {
//   Commonwealth({ url: "http://www.commonwealthauction.com/auctions.asp?location=1" })
//     .then((response) => {
//       response.map((data) => {
//         expect(data.address.length).toEqual(1);
//       });
//       // expect(response.length).not.toEqual(0);
//       // expect(response[0].date.length).not.toEqual(0)
//       // expect(response[0].address.length).not.toEqual(0);
//       // expect(response[0].status.length).not.toEqual(0);
//       // expect(response[0].deposit.length).not.toEqual(0);
//       // expect(response[0].link.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// it("tests that APG crawl returns an array with data", () => {
//   Apg({ url: "https://apg-online.com/auction-schedule/" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Baystate crawl returns an array with data", () => {
//   Baystate({ url: "https://www.baystateauction.com/auctions/state/ma" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Client crawl returns an array with data", () => {
//   Client({ url: "http://www.auctionmarketinggroup.com/auctions.html" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Dean crawl returns an array with data", () => {
//   Dean({ url: "http://www.deanassociatesinc.com/auctions.htm" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Ri crawl returns an array with data", () => {
//   Ri({ url: "http://www.auctionsri.com/scripts/auctions.asp?category=R" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Tache crawl returns an array with data", () => {
//   Tache({
//     url:
//       "https://docs.google.com/spreadsheets/u/1/d/14nrcaKBhCA61FcnBwU6EbiDbRQtOP-gQVxJVvxg5_o0/pubhtml/sheet?headers=false&gid=0",
//   })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Danielp crawl returns an array with data", () => {
//   Danielp({
//     url: "https://www.re-auctions.com/Auction-Schedule/PropertyAgentName/-1/sortBy/cf11",
//   })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("Harvard crawl return array with data", () => {
//   Harvard({ url: "http://harvardauctioneers.com/" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// it("tests that Towne crawl returns an array with data", () => {
//   Towne({ url: "https://www3.towneauction.com/Auctions_NoNav.aspx" })
//     .then((response) => {
//       expect(response.length).not.toEqual(0);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// });

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

  // it("tests that Baystate returns an array with data", async () => {
  //   const response = await Baystate({
  //     url: "https://www.baystateauction.com/auctions/state/ma",
  //   });

  //   try {
  //     expect(response.length).not.toEqual(0);
  //     response.map((data) => {
  //       expect(data.date).not.toEqual(0);
  //       expect(data.status).not.toEqual(0);
  //       expect(data.address).not.toEqual(0);
  //       expect(data.deposit).not.toEqual(0);
  //     });
  //   } catch (e) {
  //     expect(e).toEqual({
  //       error: "This field is empty",
  //     });
  //   }
  // });

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
});
