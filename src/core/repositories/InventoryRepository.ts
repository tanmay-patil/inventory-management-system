import { InventoryItem } from '../entities/InventoryItem';
import { JsonDatabase } from '../db/JsonDatabase';

export class InventoryRepository {
  private db: JsonDatabase;
  private collectionName = 'inventoryItems';

  constructor(db: JsonDatabase) {
    this.db = db;
  }

  public async findAll(): Promise<InventoryItem[]> {
    return this.db.getCollection<InventoryItem>(this.collectionName);
  }

  public async findById(id: string): Promise<InventoryItem | undefined> {
    const items = await this.findAll();
    return items.find((item) => item.id === id);
  }

  public async findByPartMasterId(partMasterId: string): Promise<InventoryItem[]> {
    const items = await this.findAll();
    return items.filter((item) => item.partMasterId === partMasterId);
  }

  public async create(item: InventoryItem): Promise<InventoryItem> {
    const items = await this.findAll();
    items.push(item);
    await this.db.setCollection(this.collectionName, items);
    return item;
  }

  public async update(
    id: string,
    updates: Partial<InventoryItem>
  ): Promise<InventoryItem | undefined> {
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
