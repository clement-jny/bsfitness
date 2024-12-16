import {
  serverTimestamp,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';

// TODO: work on this, add createdAt and updatedAt, uid for all default objects
const genericConverter = <T extends { createdAt: Timestamp }>() => ({
  toFirestore: (data: T) => {
    return {
      ...data,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<T>,
    options?: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
    };
  },
});

export const converter = { genericConverter };

// export const genericConverter = <T>(): FirestoreDataConverter<T> => ({
//   toFirestore: (data: T) => {
//     return { ...data };
//   },
//   fromFirestore: (snapshot) => {
//     const data = snapshot.data();
//     return data as T;
//   },
// });

// const genericConverter = <T>() =>
//   ({
//     toFirestore: (data: Partial<T>) => data, // Transforme les données avant envoi
//     fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): T =>
//       snapshot.data() as T, // Récupère les données typées
//   } as FirestoreDataConverter<T>);
