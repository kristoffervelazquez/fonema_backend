import db from "../../config/db/sqlite";
import { Transcript } from "./transcriptTypes";

export class TranscriptRepository {
  public create(data: Transcript): Transcript {
    const stmt = db.prepare(`
      INSERT INTO transcripts (original_json, summary, sentiment, action_items)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      JSON.stringify(data.original_json),
      data.summary ?? null,
      data.sentiment ? JSON.stringify(data.sentiment) : null,
      data.action_items ? JSON.stringify(data.action_items) : null
    );

    return { ...data, id: Number(result.lastInsertRowid) };
  }

  public findAll(): Transcript[] {
    const stmt = db.prepare(
      `SELECT * FROM transcripts ORDER BY created_at DESC`
    );
    const rows = stmt.all() as Transcript[];
    return rows.map((row) => ({
      ...row,
      original_json: safeParseJSON(row.original_json),
      sentiment: safeParseJSON(row.sentiment),
      action_items: safeParseJSON(row.action_items),
    })) as Transcript[];
  }

  public findById(id: number): Transcript | undefined {
    const stmt = db.prepare(`SELECT * FROM transcripts WHERE id = ?`);
    const row = stmt.get(id) as any;
    if (!row) return undefined;
    return {
      ...row,
      original_json: safeParseJSON(row.original_json),
      sentiment: safeParseJSON(row.sentiment),
      action_items: safeParseJSON(row.action_items),
    } as Transcript;
  }
}

function safeParseJSON<T = any>(value: unknown): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
}
