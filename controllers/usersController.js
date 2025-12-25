import { readUsers, writeUsers } from "../utils/utilsFunc.js";

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

