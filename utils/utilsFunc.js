import path from "path";
import fs from "fs/promises";

const __dirname = path.resolve();
const USERS_PATH =
  process.env.STUDENTS_PATH || path.join(__dirname, "data", "users.json");
const EVENTS_PATH =
  process.env.COURSES_PATH || path.join(__dirname, "data", "events.json");
const RECEIPTS_PATH =
  process.env.COURSES_PATH || path.join(__dirname, "data", "receipts.json");


const readFromFile = async (path) => {
  try {
    const students = JSON.parse(await fs.readFile(path, "utf-8"));
    return students;
  } catch (error) {
    return [];
  }
};

export async function readUsers() {
  return await readFromFile(USERS_PATH);
}

export async function writeUsers(users) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export async function readEvents() {
  return await readFromFile(EVENTS_PATH);
}

export async function writeEvents(events) {
  await fs.writeFile(EVENTS_PATH, JSON.stringify(events, null, 2), "utf-8");
}
export async function readReceipts() {
  return await readFromFile(RECEIPTS_PATH);
}

export async function writeReceipts(receipts) {
  await fs.writeFile(RECEIPTS_PATH, JSON.stringify(receipts, null, 2), "utf-8");
}