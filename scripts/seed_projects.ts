import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set. Create .env.local with DATABASE_URL.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function run() {
  const client = await pool.connect();
  try {
    const samplePath = path.resolve(__dirname, "..", "lib", "data.json");
    if (!fs.existsSync(samplePath)) {
      console.error("Sample data not found at", samplePath);
      process.exit(1);
    }

    const sample = JSON.parse(fs.readFileSync(samplePath, "utf-8"));

    for (const item of sample) {
      await client.query(
        `INSERT INTO projects (id, title, category, description, accent, tags) VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO NOTHING`,
        [item.id || null, item.title, item.category, item.description, item.accent, item.tags],
      );
    }

    console.log("Seed completed");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
