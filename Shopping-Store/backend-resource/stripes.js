const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Parse JSON request bodies
app.use(express.json()); // or use bodyParser.json()

// Handle CORS with preflight requests

app.options("*", cors()); // Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // No content, but request OK
});
app.get("/", (req, res) => {
  console.log("Hello");
  res.json({ message: "Bismillah" });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { amount, currency } = req.body;
  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,

        // email,
        automatic_payment_methods: { enabled: true },
      });

      const payment_id = paymentIntent.id;
      console.log(paymentIntent, "pp")

      res.status(200).json({ client_secret: paymentIntent.client_secret });

    } catch (e) {
      res.status(500).json({ message: e.message });
      console.log(e);

    }
  }


});

app.listen(PORT, () => {
  console.log(`Sandbox listening on port ${PORT}`);
});