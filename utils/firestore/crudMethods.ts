import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  query,
  getDocs,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config';
import { collections } from './collections';
import { converter } from './converter';
import { TUser } from '@/types';
// import { FirebaseError } from 'firebase/app';

const { db } = firebaseConfig;
const { collectionsKeyValue, getCollectionValue } = collections;

type TCollectionsKeys = keyof typeof collectionsKeyValue;

// TODO: better error handling
const getDocument = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<T | null> => {
  const docRef = doc(db, getCollectionValue(collectionKey), docUid);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      return { docUid: docSnap.id, ...(docSnap.data() as T) };
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    console.error('Error getting document:', e);
    return null;
  }
};

// INFO: maybe not needed
// TODO: better error handling
const getDocuments = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys
): Promise<T[] | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));
  const q = query(collectionRef);

  try {
    const querySnapshot = await getDocs(q);

    const documents: T[] = querySnapshot.docs.map((docSnap) => ({
      docUid: docSnap.id,
      ...(docSnap.data() as T),
    }));

    return documents;
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
};

// TODO: better error handling
const createDocument = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  data: T
): Promise<string | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));

  try {
    const docRef = await addDoc(collectionRef, data);

    console.log('Document written with UID: ', docRef.id);

    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
};

// TODO: better error handling
// const userConverter = converter.genericConverter<TUser>();
// extends DocumentData
const updateDocument = async <T>(
  collectionKey: TCollectionsKeys,
  docUid: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, getCollectionValue(collectionKey), docUid);
  // .withConverter(userConverter);
  // .withConverter(genericConverter<T>());

  try {
    await updateDoc(docRef, data);
    // console.log(data);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// TODO: better error handling
const removeDocument = async (
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<void> => {
  const docRef = doc(db, getCollectionValue(collectionKey), docUid);

  try {
    await deleteDoc(docRef);

    console.log('Document deleted with UID: ', docUid);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const crudMethods = {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  removeDocument,
};
