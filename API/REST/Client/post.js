const axios = require("axios");

axios
  .get("http://localhost:8000/list_users")
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });

axios
  .post("http://localhost:8000/post-test", {
    username: "catt",
    password: "vaaa",
    website: "vaaaa.com",
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
