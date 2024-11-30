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
import { firebaseConfig, firestore } from '@/utils';

const { db } = firebaseConfig;
const {
  collections: { collectionsKeyValue, getCollectionValue },
  queryMethods: { getDocumentsWhere },
} = firestore;

type TCollectionsKeys = keyof typeof collectionsKeyValue;

// TODO: better error handling
const getDocument = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<T | null> => {
  // const collectionRef = collection(db, getCollectionValue(collectionKey));

  const docRef = doc(db, getCollectionValue(collectionKey), docUid);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      // return docSnap.data() as T;
      return { docUid: docSnap.id, ...(docSnap.data() as T) };
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

// TODO: better error handling
const getDocuments = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys
): Promise<T[] | null> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));
  const q = query(collectionRef);

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

// TODO: check if data already exists before addDoc
// TODO: better error handling
const createDocument = async (
  collectionKey: TCollectionsKeys,
  data: DocumentData
): Promise<void> => {
  const collectionRef = collection(db, getCollectionValue(collectionKey));

  try {
    const existingDocs = await getDocumentsWhere(
      collectionKey,
      'uid',
      '==',
      data.uid
    );

    if (existingDocs && existingDocs.length > 0) {
      console.error('Document already exists with UID: ', data.uid);
      return;
    }

    const docRef = await addDoc(collectionRef, data);

    console.log('Document written with UID: ', docRef.id);

    // return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// TODO: check if data already exists before updateDoc
// TODO: better error handling
const updateDocument = async (
  collectionKey: TCollectionsKeys,
  docUid: string,
  data: Partial<DocumentData>
): Promise<void> => {
  // const collectionRef = collection(db, getCollectionValue(collectionKey));

  const docRef = doc(db, getCollectionValue(collectionKey), docUid);

  try {
    await updateDoc(docRef, data);

    console.log('Document updated with UID: ', docUid);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// TODO: check if data already exists before deleteDoc
// TODO: better error handling
const deleteDocument = async (
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<void> => {
  // const collectionRef = collection(db, getCollectionValue(collectionKey));

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
  deleteDocument,
};
