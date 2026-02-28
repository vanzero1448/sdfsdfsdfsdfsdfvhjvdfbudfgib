import fs from "fs/promises";
import path from "path";
import { User } from "@/types/auth";

const DB_PATH = path.join(process.cwd(), "data/users.json");

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH as string), { recursive: true });
    await fs.writeFile(DB_PATH, "[]");
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

export async function findUser(login: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.login === login) || null;
}

export async function createUser(
  login: string,
  password: string,
): Promise<User> {
  const users = await getUsers();
  const uuid = crypto.randomUUID();

  const newUser: User = {
    id: Date.now().toString(),
    uuid,
    login,
    password: await hashPassword(password),
  };

  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
