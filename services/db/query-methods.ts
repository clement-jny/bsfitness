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

type TFirestoreDocument<T> = {
  docUid: string;
  data: T;
};

// TODO: better error handling
const getDocumentWhere = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  field: keyof T,
  operator: WhereFilterOp,
  value: string | number | boolean
): Promise<TFirestoreDocument<T> | null> => {
  const collectionRef = collection(
    db,
    getCollectionValue(collectionKey)
  ).withConverter(converter.genericConverter<T>());

  const q = query(
    collectionRef,
    where(field as string, operator, value),
    limit(1)
  );

  // How to get only one document?
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];

    return {
      docUid: doc.id,
      data: doc.data() as T,
    };
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
): Promise<TFirestoreDocument<T>[] | null> => {
  // const collectionRef = collection(db, getCollectionValue(collectionKey));
  const collectionRef = collection(
    db,
    getCollectionValue(collectionKey)
  ).withConverter(converter.genericConverter<T>());

  const q = query(collectionRef, where(field as string, operator, value));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    return querySnapshot.docs.map((doc) => ({
      docUid: doc.id,
      data: doc.data() as T,
    }));
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
};

export const queryMethods = {
  getDocumentWhere,
  getDocumentsWhere,
};
