import { PartMaster } from '../entities/PartMaster';
import { JsonDatabase } from '../db/JsonDatabase';

export class PartMasterRepository {
  private db: JsonDatabase;
  private collectionName = 'partMasters';

  constructor(db: JsonDatabase) {
    this.db = db;
  }

  public async findAll(): Promise<PartMaster[]> {
    return this.db.getCollection<PartMaster>(this.collectionName);
  }

  public async findById(id: string): Promise<PartMaster | undefined> {
    const items = await this.findAll();
    return items.find((item) => item.id === id);
  }

  public async create(item: PartMaster): Promise<PartMaster> {
    const items = await this.findAll();
    items.push(item);
    await this.db.setCollection(this.collectionName, items);
    return item;
  }

  public async update(id: string, updates: Partial<PartMaster>): Promise<PartMaster | undefined> {
    const items = await this.findAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return undefined;

    items[index] = { ...items[index], ...updates };
    await this.db.setCollection(this.collectionName, items);
    return items[index];
  }

  public async delete(id: string): Promise<boolean> {
    const items = await this.findAll();
    const filtered = items.filter((item) => item.id !== id);

    if (items.length === filtered.length) return false;

    await this.db.setCollection(this.collectionName, filtered);
    return true;
  }
}
