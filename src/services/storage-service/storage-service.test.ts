import { StorageService } from './storage-service';

const createMockStoragee = (): Storage => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: any) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: () => null,
  };
};

describe('[src/services/storage-service]', () => {
  describe('[StorageService]', () => {
    it('should throw an error if no storage is provided', () => {
      // @ts-ignore
      expect(() => new StorageService(undefined)).toThrow(
        '[StorageService][constructor]. There is no `storage` provided in StorageService while initialized.'
      );
    });

    it('should correctly initialized if storage is provided', () => {
      const mockStorage = createMockStoragee();
      const storageService = new StorageService(mockStorage);

      expect(storageService).toBeInstanceOf(StorageService);
    });

    it('should correctly perform all operations: get, set, delete, clear', () => {
      const mockStorage = createMockStoragee();
      const storageService = new StorageService(mockStorage);
      const key = 'test';
      const key2 = 'test2';
      const key3 = 'test3';
      const value = { a: 'test', b: 1, c: [{ d: 1 }, [2, 3], 4] };
      const value2 = { a: 1, b: 2, c: 3 };
      const value3 = { a: 1, b: undefined, c: [{ d: 1 }, [2, 3], 4] };
      const value3Expecter = {
        a: 1,
        c: [{ d: 1 }, [2, 3], 4],
      };

      storageService.set(key, value);
      storageService.set(key2, value2);
      expect(storageService.get(key)).toEqual(value);
      expect(storageService.get(key2)).toEqual(value2);
      expect(storageService.size).toBe(2);

      storageService.delete(key2);
      expect(storageService.get(key2)).toBe(null);
      expect(storageService.size).toBe(1);

      storageService.set(key3, value3);
      expect(storageService.get(key3)).toEqual(value3Expecter);
      expect(storageService.size).toBe(2);

      storageService.clear();
      expect(storageService.get(key)).toBe(null);
      expect(storageService.get(key3)).toBe(null);
      expect(storageService.size).toBe(0);
    });
  });
});
