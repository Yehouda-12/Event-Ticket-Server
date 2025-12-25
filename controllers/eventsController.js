import { readUsers, readEvents, writeEvents } from "../utils/utilsFunc.js";
// ● One role can create events - “admin” 
// ● Another role can only buy tickets - “user”
export const createEvent = async (req, res) => {
  try {
    const { eventName, ticketsForSale, username, password } = req.body;
    if (!eventName || !ticketsForSale || !username || !password) {
      return res.status(400).json({
        error: "you must give eventName, ticketsForSale, username , password",
      });
    }

    const users = await readUsers();
    const existUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!existUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    if(existUser.role !== "admin"){
        return res.status(401).json({ message: "Only users 'admin' can creat event" });}


    const events = await readEvents();
    const existEvent = events.find(
      (event) => event.eventName.toLowerCase() === eventName.toLowerCase()
    );
    if (existEvent) {
      return res.status(400).json({ message: "Event  already exist" });
    }

    const newEvent = {
      eventName,
      ticketsAvailable: ticketsForSale,
      createdBy: username,
    };
    events.push(newEvent);
    await writeEvents(events);

    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
