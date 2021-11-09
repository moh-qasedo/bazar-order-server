const express = require("express");
const axios = require("axios");

const app = express();

app.listen(5000, () => console.log("Listening on port 5000..."));

app.get("/", (req, res) => {
  res.send("This is the Order Server of Bazar.com ");
});

app.post("/order/purchase/:id", (req, res) => {
  axios
    .get(`http://192.168.255.148:3000/catalog/info/${req.params.id}`)
    .then((response) => {
      if (response.data.quantity > 0) {
        axios
          .put(`http://192.168.255.148:3000/catalog/update/${req.params.id}`)
          .then((updateResponse) => {
            res.status(200).send(`Bought book ${response.data.title}`);
          })
          .catch((error) => res.status(403).send(error.response.data));
      } else {
        res
          .status(403)
          .send(`This "${response.data.title}" book is out of stock`);
      }
    })
    .catch((error) => {
      res.status(403).send(error.response.data);
    });
});
app.post;
