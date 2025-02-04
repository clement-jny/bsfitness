import {
  serverTimestamp,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  Timestamp,
  type FirestoreDataConverter,
} from 'firebase/firestore';

// Interface générique pour les objets avec timestamps
interface IFirestoreBase {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Converter générique avec gestion des timestamps
const genericConverter = <
  T extends IFirestoreBase
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => {
    return {
      ...data,
      createdAt: data.createdAt ?? serverTimestamp(), // Définit `createdAt` si absent
      updatedAt: serverTimestamp(), // Met à jour `updatedAt` à chaque sauvegarde
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<T>,
    options?: SnapshotOptions
  ): T => {
    const data = snapshot.data(options);

    return {
      ...data,
      id: snapshot.id, // Ajoute l'ID Firestore
      createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(),
    };
  },
});

export const converter = { genericConverter };
