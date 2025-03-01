import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@/utils';
import { AuthContext } from '@/contexts';
import { db } from '@/services';

type UserProps = {
  lastname: string;
  firstname: string;
};

const Account = () => {
  const { authUid } = AuthContext.useAuth();

  const [myUser, setMyUser] = useState<UserProps | undefined>(undefined);

  const loadData = async () => {
    try {
      const data = await db.user.me(authUid!);
      setMyUser({ firstname: data?.firstname!, lastname: data?.lastname! });
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={localStyles.container}>
      {myUser ? (
        <>
          <View style={localStyles.userInfo}>
            <Text>
              Welcome, {myUser.firstname} {myUser.lastname}
            </Text>
            <Text>Welcome {authUid || 'Guest'}</Text>
          </View>
        </>
      ) : (
        <Text>Loading user information...</Text>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    paddingHorizontal: 20,
  },
});

export default Account;
