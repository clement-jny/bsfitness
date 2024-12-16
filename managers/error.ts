import { AuthErrorCodes } from 'firebase/auth';
import { FirestoreErrorCode } from 'firebase/firestore';

// FIREBASE
type TFirebaseErrorMessages = { [key: string]: string };

const firebaseErrorMessages: TFirebaseErrorMessages = {
  [AuthErrorCodes.INVALID_EMAIL]: '',
  'auth/missing-password': 'Le mot de passe est requis.',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Le mot de passe est incorrect.',
  [AuthErrorCodes.USER_DELETED]: "L'utilisateur n'existe pas.",
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Trop de tentatives, veuillez réessayer plus tard.',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]:
    "Les informations d'identification sont invalides.",
  [AuthErrorCodes.INTERNAL_ERROR]: 'Une erreur interne est survenue.',
  [AuthErrorCodes.USER_DISABLED]: "L'utilisateur est désactivé.",
  [AuthErrorCodes.USER_MISMATCH]: "L'utilisateur ne correspond pas.",
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]:
    "Vos informations d'identification ont expiré, veuillez vous reconnecter.",
  [AuthErrorCodes.WEAK_PASSWORD]:
    'Le mot de passe doit contenir au moins 6 caractères.',
  //   [AuthErrorCodes.EMAIL_ALREADY_IN_USE]: 'Cette adresse email est déjà utilisée.',
};

export const getFirebaseErrorMessage = (errorCode: string): string => {
  return (
    firebaseErrorMessages[errorCode] || "Une erreur inconnue s'est produite."
  );
};

// FIRESTORE
type TFirestoreErrorMessages = { [key: string]: string };

const firestoreErrorMessages: TFirestoreErrorMessages = {
  'permission-denied': "Vous n'avez pas les permissions nécessaires.",
  'not-found': 'Le document demandé est introuvable.',
  'deadline-exceeded': 'La requête a pris trop de temps et a été annulée.',
  'already-exists': 'Le document existe déjà.',
  'resource-exhausted': 'Les quotas Firestore ont été atteints.',
  unavailable: 'Le service Firestore est temporairement indisponible.',
};

export const getFirestoreErrorMessage = (errorCode: string): string => {
  return (
    firestoreErrorMessages[errorCode] || "Une erreur inconnue s'est produite."
  );
};

export const error = { getFirebaseErrorMessage, getFirestoreErrorMessage };

// const errorMessages = {
//   auth: {
//     [AuthErrorCodes.INVALID_EMAIL]: "L'adresse email est invalide.",
//     'auth/missing-password': 'Le mot de passe est requis.',
//   },
//   firestore: {
//     'firestore/permission-denied': 'Accès refusé à la base de données.',
//     'firestore/unavailable': 'Service Firestore indisponible.',
//     // []: 'La transaction a été annulée.',
//     // FirestoreErrorCode.ABORTED: 'La transaction a été annulée.',
//   },
// };

// const getErrorMessage = (errorCode: string): string => {
//   for (const domain in errorMessages) {
//     if (errorMessages[domain][errorCode]) {
//       return errorMessages[domain][errorCode];
//     }
//   }
//   return "Une erreur inconnue s'est produite.";
// };

// const getError = () => {
//   try {
//     throw new FirebaseError(
//       AuthErrorCodes.ADMIN_ONLY_OPERATION,
//       'This is an error'
//     );
//   } catch (error) {
//     const err = error as FirebaseError;
//     console.log(err.message);
//     console.log(err.code);
//     console.log(err.name);
//   }
// };
