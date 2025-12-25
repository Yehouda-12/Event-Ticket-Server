
import {
  readEvents,
  readUsers,
  readReceipts,
  writeReceipts,
  writeEvents,
} from "../utils/utilsFunc.js";


export const buyTicket = async (req, res) => {
  try {
    const { username, password, eventName, quantity } = req.body;
    if (!username || !password || !eventName || !quantity) {
      return res.status(400).json({
        error: "You must give  eventName, quantity,username, password,",
      });
    }
    const users = await readUsers();
    const existUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!existUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const events = await readEvents();
    const event = events.find(
      (e) => e.eventName.toLowerCase() === eventName.toLowerCase()
    );
    if (!event) {
      return res.status(404).json({ message: "Event no found" });
    }
    if (event.ticketsAvailable < quantity) {
      return res.status(401).json({ message: "No tickets available" });
    }
    event.ticketsAvailable -= quantity;
    await writeEvents(events);
    const receipts = await readReceipts();
    const newReceipt = {
      username,
      eventName: event.eventName,
      ticketsBought: quantity,
    };
    receipts.push(newReceipt);
    await writeReceipts(receipts);
    res.status(201).json({ message: "Tickets purchased successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server err" });
  }
};
