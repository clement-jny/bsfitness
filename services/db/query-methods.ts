import {
  collection,
  DocumentData,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { firebaseConfig, firestore } from '@/utils';
import { type WhereFilterOp, limit } from 'firebase/firestore';
import { TCollectionsKeys } from '@/types';

// TODO: better error handling
const getDocumentWhere = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  field: keyof T,
  operator: WhereFilterOp,
  value: string | number | boolean
): Promise<T | null> => {
  const collectionRef = collection(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey)
  ).withConverter(firestore.genericConverter<T>());

  const q = query(
    collectionRef,
    where(field as string, operator, value),
    limit(1)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];

    return doc.data() as T;
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
  const collectionRef = collection(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey)
  ).withConverter(firestore.genericConverter<T>());

  const q = query(collectionRef, where(field as string, operator, value));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    return querySnapshot.docs.map((doc) => doc.data() as T);
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
};

export const queryMethods = {
  getDocumentWhere,
  getDocumentsWhere,
};
