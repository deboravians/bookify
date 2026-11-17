const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

export function authenticateAdmin(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
