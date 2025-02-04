import {
  serverTimestamp,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  type FirestoreDataConverter,
} from 'firebase/firestore';

// Generic interface for object with timestamp
interface IFirestoreBase {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Generic converter with timestamp
const genericConverter = <
  T extends IFirestoreBase
>(): FirestoreDataConverter<T> => ({
  // Automatic add of createdAt & updateAt for inserting
  toFirestore: (data: T) => {
    return {
      ...data,
      createdAt: data.createdAt ?? serverTimestamp(), // Define `createdAt` if missing
      updatedAt: serverTimestamp(), // Update `updatedAt` at each save
    };
  },

  // Automatic add of docUid, createdAt & updateAt for reading
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<T>,
    options?: SnapshotOptions
  ): T => {
    const data = snapshot.data(options);

    return {
      ...data,
      docUid: snapshot.id, // Add Firestore document ID
      createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // get just .toDate()?
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(), // get just .toDate()?
    };
  },
});

export const converter = { genericConverter };
