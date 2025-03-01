import { type TUser, type TNewUserDTO, type TUpdateUserDTO } from '@/types';
import { crudMethods } from './crud-methods';
import { queryMethods } from './query-methods';

// INFO: called on the services.auth.register
// Promise<TUser>
const create = async (data: TNewUserDTO): Promise<string | null> => {
  try {
    const existingDocs = await queryMethods.getDocumentsWhere<TUser>(
      'USER_COLLECTION',
      'email',
      '==',
      data.email
    );

    if (existingDocs && existingDocs.length > 0) {
      console.error('Document already exists with email:', data.email);
      throw new Error(`User with email ${data.email} already exists.`);
      // Return this error to the user then he change the email
      // return;
    }

    const docUid = await crudMethods.createDocument<TNewUserDTO>(
      'USER_COLLECTION',
      data
    );

    if (!docUid) {
      throw new Error('Failed to create user document in Firestore.');
    }

    return docUid;
    // return { docUid: docUid, ...data, createdAt: new Date() };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Permet de remonter l'erreur à `register.ts`
  }
};

const get = async (docUid: string): Promise<TUser | null> => {
  const user = await crudMethods.getDocument<TUser>('USER_COLLECTION', docUid);
  return user;
};

const getAll = async (): Promise<TUser[] | null> => {
  const users = await crudMethods.getDocuments<TUser>('USER_COLLECTION');
  return users;
};

// TODO: test this method
// INFO: get the docUid from the AuthContext
const me = async (docUid: string) => {
  try {
    // const user = await crudMethods.getDocument<TUser>(
    //   'USER_COLLECTION',
    //   docUid
    // );

    const user = await queryMethods.getDocumentWhere<TUser>(
      'USER_COLLECTION',
      'authUid',
      '==',
      docUid
    );

    if (!user) {
      console.warn(`User document with id ${docUid} not found.`);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

// const update = async (docUid: string, data: Partial<TUser>): Promise<void> => {
const update = async (docUid: string, data: TUpdateUserDTO): Promise<void> => {
  if (data.email) {
    const existingDocs = await queryMethods.getDocumentsWhere<TUser>(
      'USER_COLLECTION',
      'email',
      '==',
      data.email
    );

    if (existingDocs && existingDocs.some((doc) => doc.docUid !== docUid)) {
      throw new Error(`Email ${data.email} is already in use by another user.`);
    }
  }

  await crudMethods.updateDocument<TUpdateUserDTO>(
    'USER_COLLECTION',
    docUid,
    data
  );
};

const remove = async (docUid: string): Promise<void> => {
  await crudMethods.removeDocument('USER_COLLECTION', docUid);
};

export const user = { create, get, getAll, me, update, remove };
