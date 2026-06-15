import * as fs from 'fs/promises';
import * as path from 'path';

export class JsonDatabase {
  private filePath: string;

  constructor(filePath: string = 'db.json') {
    const isVercel = process.env.VERCEL === '1';
    this.filePath = isVercel ? path.join('/tmp', filePath) : path.resolve(process.cwd(), filePath);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify({}), 'utf-8');
    }
  }

  public async read(): Promise<Record<string, unknown>> {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, 'utf-8');
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  public async write(data: Record<string, unknown>): Promise<void> {
    await this.ensureFileExists();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  public async getCollection<T>(collection: string): Promise<T[]> {
    const data = await this.read();
    return (data[collection] as T[]) || [];
  }

  public async setCollection<T>(collection: string, items: T[]): Promise<void> {
    const data = await this.read();
    data[collection] = items;
    await this.write(data);
  }
}
