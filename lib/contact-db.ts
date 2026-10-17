import { query } from "./db";

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export async function getContactRequests(): Promise<{ available: boolean; requests: ContactRequest[] }> {
  if (!process.env.DATABASE_URL) return { available: false, requests: [] };

  try {
    const result = await query(
      "SELECT id, name, email, message, created_at FROM contact_requests ORDER BY created_at DESC LIMIT 100",
    );

    return {
      available: true,
      requests: result.rows.map((row) => ({
        id: String(row.id),
        name: String(row.name),
        email: String(row.email),
        message: String(row.message),
        createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
      })),
    };
  } catch {
    return { available: false, requests: [] };
  }
}

export async function deleteContactRequest(id: string) {
  await query("DELETE FROM contact_requests WHERE id = $1", [id]);
}
