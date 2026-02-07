require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
