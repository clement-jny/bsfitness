import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, styles as s } from '@/utils';
import { BackButton, Icons } from '@/components';
import { toast } from '@/managers';
import { auth } from '@/services';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      toast.error('Please fill all the fields');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    toast.success(`Welcome ${email} - ${password}`);

    const result = await auth.login(email, password);
    console.log(result);
  };

  const handleForgotPassword = () => {
    toast.error('Soon : forgot your password');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'lightblue',
        flex: 1,
        // TODO: remove
      }}>
      <BackButton />

      {/* Main Content */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable onPress={Keyboard.dismiss} style={styles.innerContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome back,</Text>
            <Text style={styles.smallTitle}>Log in to your account.</Text>

            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                keyboardType='email-address'
                placeholderTextColor={colors.light.text}
                autoCapitalize='none'
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor={colors.light.text}
                secureTextEntry
              />
            </View>

            <View style={styles.buttons}>
              {/* // TODO: animated login btn with reanimated */}
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  pressed && { opacity: 0.2 },
                  styles.button,
                ]}>
                <Text style={styles.buttonText}>Log In</Text>
                <Icons.Ionicons name='log-in-outline' size={20} color='white' />
              </Pressable>

              {/* TODO: animated btn */}
              <Pressable onPress={handleForgotPassword}>
                <Text style={styles.linkText}>Forgot your password?</Text>
              </Pressable>
            </View>

            <View style={styles.registerZone}>
              <Text>Don't have an account ?</Text>

              <Pressable
                onPress={() => {
                  router.replace('/register');
                }}>
                <Text>Register</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '90%',
    padding: 20,
    backgroundColor: colors.light.background, // TODO: remove
    borderWidth: 2, // TODO: remove
  },

  title: {
    fontFamily: 'Poppins700',
    fontSize: 24,
    lineHeight: 36,
    color: colors.light.primary,
  },
  smallTitle: {
    fontFamily: 'Poppins500',
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },

  inputs: {
    gap: 10,
    marginVertical: 25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },

  buttons: {
    gap: 5,
    marginBottom: 10,
  },
  button: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.light.primary,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    textAlign: 'right',
  },

  registerZone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Login;
