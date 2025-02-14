import { firestore } from '@/utils';

type TCollectionsKeys = keyof typeof firestore.collections.collectionsKeyValue;

export { TCollectionsKeys };
