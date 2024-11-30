import {
  collection,
  DocumentData,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { firebaseConfig, firestore } from '@/utils';
import { type WhereFilterOp } from 'firebase/firestore';

const { db } = firebaseConfig;
const {
  collections: { collectionsKeyValue, getCollectionValue },
} = firestore;

type TCollectionsKeys = keyof typeof collectionsKeyValue;

// TODO: better error handling
const getDocumentsWhere = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  field: string,
  operator: WhereFilterOp,
  value: any
): Promise<T[] | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));
  const q = query(collectionRef, where(field, operator, value));

  try {
    const querySnapshot = await getDocs(q);

    const documents: T[] = querySnapshot.docs.map((doc) => ({
      docUid: doc.id,
      ...(doc.data() as T),
    }));

    return documents;
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
};

export const queryMethods = {
  getDocumentsWhere,
};
