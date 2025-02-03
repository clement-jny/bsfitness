import {
  collection,
  DocumentData,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { firebaseConfig } from '@/utils';
import { firestore } from '@/utils';
import { type WhereFilterOp, limit } from 'firebase/firestore';

const { db } = firebaseConfig;
const { collections, converter } = firestore;
const { collectionsKeyValue, getCollectionValue } = collections;

type TCollectionsKeys = keyof typeof collectionsKeyValue;

// TODO: better error handling
const getDocumentWhere = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  field: keyof T,
  operator: WhereFilterOp,
  value: string | number | boolean
): Promise<T | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));
  const q = query(
    collectionRef,
    where(field as string, operator, value),
    limit(1)
  );

  // How to get only one document?
  try {
    const querySnapshot = await getDocs(q);

    // How to add the key 'data' ?
    const documents: T[] = querySnapshot.docs.map((doc) => ({
      docUid: doc.id,
      ...(doc.data() as T),
    }));

    return documents[0];
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
};

// TODO: better error handling
const getDocumentsWhere = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  field: keyof T,
  operator: WhereFilterOp,
  value: string | number | boolean
): Promise<T[] | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));
  const q = query(collectionRef, where(field as string, operator, value));

  try {
    const querySnapshot = await getDocs(q);

    // How to add the key 'data' ?
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
  getDocumentWhere,
  getDocumentsWhere,
};
