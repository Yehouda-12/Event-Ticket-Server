import { readReceipts, readUsers, writeUsers } from "../utils/utilsFunc.js";

export const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if ((username && !password) || (!username && password)) {
      return res.status(400).json({
        error: "You must give username AND password",
      });
    }
    const users = await readUsers();

    const existUser = users.find((user) => user.username === req.body.username);
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    users.push(newUser);

    await writeUsers(users);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userSummary = async (req, res) => {
  try {
    const { username } = req.params;
    const users = await readUsers();

    const existUser = users.find((user) => user.username === username);
    if (!existUser) {
      return res.status(400).json({ message: "User not exists" });
    }
    const receipts = await readReceipts();
    const userReceipts = receipts.filter(
      (receipt) => receipt.username === username
    );
    if (userReceipts.length === 0) {
      return res.status(200).json({
        totalTicketsBought: 0,
        events: [],
        averageTicketsPerEvent: 0,
      });
    }
    const totalTicketsBought = userReceipts.reduce(
      (total, receipt) => total + receipt.ticketsBought,
      0
    );
    const eventUser = userReceipts.map((receipt) => receipt.eventName);
    const events = [...new Set(eventUser)];
    const averageTicketsPerEvent = totalTicketsBought / events.length;
    const sumary = {
      totalTicketsBought,
      events,
      averageTicketsPerEvent,
    };
    res.status(200).json(sumary);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
