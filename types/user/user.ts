type TUser = {
  docUid: string; // ID Firestore du document utilisateur (uid2) // logiquement écrit par le converter - docUid / réponse OUI
  authUid: string; // UID Firebase Auth (uid1)
  email: string;
  lastname: string;
  firstname: string;
  // dob: string; // Date de naissance (format string ou Date selon ton besoin)
  // age: number;
  createdAt: Date; // Converti via le `converter`
  updatedAt?: Date; // Converti via le `converter`
};

export { TUser };
