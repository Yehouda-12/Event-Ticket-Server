import express from "express";
import users from "./routes/usersRoute.js";
import events from './routes/eventsRoute.js'
import ticketsAndSumary from './routes/buyTicketAndSummaryRoute.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/user", users);
app.use('/creator',events)
app.use('/users',ticketsAndSumary)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
