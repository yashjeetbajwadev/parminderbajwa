import PocketBase from 'pocketbase';

let instance: PocketBase | null = null;

export function getPocketBaseInstance(): PocketBase {
  if (instance === null) {
    instance = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_API_URL);
  }
  return instance;
}