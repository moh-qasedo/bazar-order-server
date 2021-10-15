const express = require("express");
const axios = require("axios");

const app = express();

app.listen(5000, () => console.log("Listening on port 5000..."));

app.get("/", (req, res) => {
  res.send("This is the Order Server of Bazar.com ");
});

app.post("/order/purchase/:id", (req, res) => {
  axios
    .get(`http://192.168.1.114:3000/catalog/info/${req.params.id}`)
    .then((response) => {
      if (response.data.quantity > 0) {
        axios
          .put(`http://192.168.1.114:3000/catalog/update/${req.params.id}`)
          .then((updateResponse) => {
            res.status(200).send(`Bought book ${response.data.title}`);
          })
          .catch((error) =>
            res
              .status(JSON.parse(JSON.stringify(error)).status)
              .send("Something went wrong while updating book quantity")
          );
      } else {
        res
          .status(410)
          .send(`This "${response.data.title}" book is out of stock`);
      }
    })
    .catch((error) => {
      res
        .status(JSON.parse(JSON.stringify(error)).status)
        .send(`Book with id: ${req.params.id} Not Found`);
    });
});
app.post;
