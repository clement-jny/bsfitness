import { Tabs } from 'expo-router';
import { Icons } from '@/components';
import { colors } from '@/utils';
import { auth } from '@/services';

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.light.background,
        tabBarInactiveTintColor: colors.light.secondary,
        tabBarStyle: {
          backgroundColor: colors.light.primary,
        },
        headerStyle: {
          backgroundColor: colors.light.background,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.light.text,
          fontFamily: 'Quicksand',
        },
        headerTitleAlign: 'left',
      }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerTitle: 'Home',
          tabBarIcon: ({ color }) => (
            <Icons.Ionicons size={28} name='home-outline' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          headerTitle: 'My Account',
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <Icons.Ionicons size={28} name='cog-outline' color={color} />
          ),
          headerRight: () => (
            <Icons.Ionicons
              size={28}
              name='log-out-outline'
              color={colors.light.primary}
              style={{ marginRight: 10 }}
              onPress={() => {
                auth.logout();
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
