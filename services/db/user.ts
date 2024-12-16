import { type TUser } from '@/types';
import { crudMethods } from './crudMethods';
import { queryMethods } from './queryMethods';

// INFO: called on the services.auth.register
const create = async (data: TUser): Promise<string | null> => {
  const existingDocs = await queryMethods.getDocumentsWhere<TUser>(
    'USER_COLLECTION',
    'email',
    '==',
    data.email
  );

  // TODO: Try/Catch to get the new Error(); ???
  if (existingDocs && existingDocs.length > 0) {
    // console.error('Document already exists with UID: ', data.uid);
    console.error('Document already exists with email:', data.email);
    throw new Error(`User with email ${data.email} already exists.`);
    // Return this error to the user then he change the email
    // return;
  }

  const docUid = await crudMethods.createDocument<TUser>(
    'USER_COLLECTION',
    data
  );
  return docUid;
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
    const user = await crudMethods.getDocument<TUser>(
      'USER_COLLECTION',
      docUid
    );

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
};

const update = async (docUid: string, data: Partial<TUser>): Promise<void> => {
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

  await crudMethods.updateDocument('USER_COLLECTION', docUid, data);
};

const remove = async (docUid: string): Promise<void> => {
  await crudMethods.removeDocument('USER_COLLECTION', docUid);
};

export const user = { create, get, getAll, me, update, remove };
