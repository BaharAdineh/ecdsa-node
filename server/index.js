const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "043a7c730909bf212437ef7b17e28807c7fb79abc3e3dd58b6fb9bd9dea9f0dccd5b98d9bd8d35e1d63835fb4b5f5d0d5e57475ccfd8eac82cc1cd20b4b379129b": 100,
  "04ecaeeec8389cb7eba769f9ac43f807e61c51a01ee84a7dbc509b7d070b342b49e6cc784ff3f0ee24191d0e8a07f3a19b873fcd5946b7b86225601f223f4d27ea": 50,
  "04978d05231e7b55dfacd829b5a964c8d5200017d6bf8bd5df69240a716248523ec2085064a4b768cfd6f40e4945477e0056b13a5771aacb587c6114ce14fa3bb7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
