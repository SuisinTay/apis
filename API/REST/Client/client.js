const axios = require("axios");

const https = require("https");

const Currency = [];

https
  .get("https://api.blockchain.com/v3/exchange/symbols", (resp) => {
    let data = "";
    resp.setEncoding("utf8");
    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      const jsonConvert = JSON.parse(data);
      for (var values in jsonConvert) {
        Currency.push(values);
      }
      console.log(Currency.sort());
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

//get using axios
// axios.get("https://api.blockchain.com/v3/exchange/symbols").then((response) => {
//   console.log(response.data);
//   for (var values in response.data) {
//     let tempCurrency =
//       response.data[values]["base_currency"] +
//       "-" +
//       response.data[values]["counter_currency"];
//     Currency.push(tempCurrency);
//   }
//   //   console.log(response.data);
//   console.log(Currency.sort());
//   //   let tempCurrency = response.data.base_currency
//   //   Currency.push()
// });
