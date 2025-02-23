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
import { TCollectionsKeys } from '@/types';

// import { FirebaseError } from 'firebase/app';

// const handleFirestoreError = (operation: string, error: unknown) => {
//   console.error(`Firestore ${operation} error:`, error);
//   return null;
// };

// TODO: better error handling
const getDocument = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<T | null> => {
  const docRef = doc(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey),
    docUid
  ).withConverter(firestore.genericConverter<T>());

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());

      return docSnap.data() as T;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    // return handleFirestoreError('getDocument', e);
    console.error('Error getting document:', e);
    return null;
  }
};

// INFO: maybe not needed
// TODO: better error handling
const getDocuments = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys
): Promise<T[] | null> => {
  const collectionRef = collection(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey)
  ).withConverter(firestore.genericConverter<T>());

  const q = query(collectionRef);

  try {
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as T);
  } catch (e) {
    // return handleFirestoreError('getDocuments', e);
    console.error('Error getting documents: ', e);
    return null;
  }
};

// TODO: better error handling
const createDocument = async <T extends DocumentData>(
  collectionKey: TCollectionsKeys,
  data: T
): Promise<string | null> => {
  const collectionRef = collection(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey)
  ).withConverter(firestore.genericConverter<T>());

  try {
    const docRef = await addDoc(collectionRef, data);

    console.log('Document written with UID: ', docRef.id);

    return docRef.id;
  } catch (e) {
    // return handleFirestoreError('createDocument', e);
    console.error('Error adding document: ', e);
    return null;
  }
};

// TODO: better error handling
const updateDocument = async <T>(
  collectionKey: TCollectionsKeys,
  docUid: string,
  data: Partial<T>
): Promise<boolean> => {
  const docRef = doc(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey),
    docUid
  );

  try {
    await updateDoc(docRef, data);

    console.log(data);

    return true;
  } catch (e) {
    // return handleFirestoreError('updateDocument', e);
    console.error('Error updating document: ', e);
    return false;
  }
};

// TODO: better error handling
const removeDocument = async (
  collectionKey: TCollectionsKeys,
  docUid: string
): Promise<boolean> => {
  const docRef = doc(
    firebaseConfig.db,
    firestore.collections.getCollectionValue(collectionKey),
    docUid
  );

  try {
    await deleteDoc(docRef);

    console.log('Document deleted with UID: ', docUid);

    return true;
  } catch (e) {
    // return handleFirestoreError('removeDocument', e);
    console.error('Error deleting document: ', e);
    return false;
  }
};

export const crudMethods = {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  removeDocument,
};
