const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

app.use(express.json());

// Route to create an order
app.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required." });
  }

  try {
    // Call Viva Wallet API to create an order
    const response = await fetch("https://demo-api.vivapayments.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer <YOUR_ACCESS_TOKEN>`, // Replace with your Viva Wallet token
      },
      body: JSON.stringify({
        amount: amount, // Amount in cents
        customerTrns: "Payment for order",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Send the orderCode back to the frontend
      res.json({ orderCode: data.orderCode });
    } else {
      res.status(500).json({ error: data.message || "Failed to create order." });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
