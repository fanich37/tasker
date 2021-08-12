export class StorageService {
  constructor(private storage: Storage) {
    if (!storage) {
      throw new Error(
        '[StorageService][constructor]. There is no `storage` provided in StorageService while initialized.'
      );
    }

    this.storage = storage;
  }

  public get<T = any>(key: string): T | null {
    try {
      const string = this.storage.getItem(key);

      return string === null ? null : JSON.parse(string);
    } catch (error) {
      throw new Error(`[StorageService][get]. Error: ${error.message}`);
    }
  }

  public set(key: string, value: any): void {
    const stringified = JSON.stringify(value);

    this.storage.setItem(key, stringified);
  }

  public delete(key: string): void {
    this.storage.removeItem(key);
  }

  public clear() {
    this.storage.clear();
  }

  get size(): number {
    return this.storage.length;
  }
}

export const storageService = new StorageService(window.sessionStorage);
