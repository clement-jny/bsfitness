const collectionsKeyValue = {
  USER_COLLECTION: 'user',
} as const;

const getCollectionValue = (key: keyof typeof collectionsKeyValue): string =>
  collectionsKeyValue[key];

export const collections = { collectionsKeyValue, getCollectionValue };
