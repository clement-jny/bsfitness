import { Timestamp } from 'firebase/firestore';

type TUser = {
  id: string; // ID Firestore du document utilisateur (uid2)
  userUid: string; // UID Firebase Auth (uid1)
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Timestamp;
};

export { TUser };
