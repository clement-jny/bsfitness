// import { AuthErrorCodes } from 'firebase/auth';

// type TFirebaseErrorMessages = { [key: string]: string };

// const errorMessages: TFirebaseErrorMessages = {
//   'auth/invalid-email': "L'adresse email est invalide.",
//   'auth/missing-password': 'Le mot de passe est requis.',
//   'auth/wrong-password': 'Le mot de passe est incorrect.',
//   'auth/user-not-found': 'Utilisateur non trouvé.',
//   'auth/invalid-credential':
//     "Les informations d'identification sont invalides.",
//   'auth/too-many-requests': 'Trop de tentatives, veuillez réessayer plus tard.',
// };

// const errorMessages: Record<string, string> = {
//   [AuthErrorCodes.INVALID_EMAIL]: "L'adresse email est invalide.",
//   [AuthErrorCodes.USER_DELETED]: 'Utilisateur non trouvé.',
//   [AuthErrorCodes.INVALID_PASSWORD]: 'Le mot de passe est incorrect.',
//   [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
//     'Trop de tentatives, veuillez réessayer plus tard.',
//   [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]:
//     "Vos informations d'identification ont expiré, veuillez vous reconnecter.",
// };

// const errorMessages = {
//   auth: {
//     'auth/invalid-email': "L'adresse email est invalide.",
//     'auth/missing-password': 'Le mot de passe est requis.',
//   },
//   firestore: {
//     'firestore/permission-denied': 'Accès refusé à la base de données.',
//     'firestore/unavailable': 'Service Firestore indisponible.',
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

// errorMsgs['auth/invalid-email'];

// const getErrorMessage = (errorCode: string): string => {
//   return errorMessages[errorCode] || "Une erreur inconnue s'est produite.";
// };

// export const errors = { errorMessages, getErrorMessage };
