import { firestore } from '@/utils';
import { type TUser } from '@/types';

const { crudMethods } = firestore;

const create = (data: TUser) => {
  // if (keyof typeof data !== keyof typeof TUser) {
  // 	throw new Error("Data must be an TUser object");
  // }

  crudMethods.createDocument('USER_COLLECTION', data);
};

const read = (docUid: string) => {
  crudMethods.getDocument('USER_COLLECTION', docUid);
};

const me = (docUid: string) => {
  crudMethods.getDocument('USER_COLLECTION', docUid);
};

const update = (docUid: string, data: Partial<TUser>) => {
  crudMethods.updateDocument('USER_COLLECTION', docUid, data);
};

const remove = (docUid: string) => {
  crudMethods.deleteDocument('USER_COLLECTION', docUid);
};

export const user = { create, read, me, update, remove };
