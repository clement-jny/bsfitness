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

const Register = () => {
  const router = useRouter();

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    if (
      email === '' ||
      password === '' ||
      lastname === '' ||
      firstname === ''
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    toast.success(`Welcome ${lastname} - ${firstname}`);

    const result = await auth.register(email, password, {
      lastname,
      firstname,
    });
    console.log(result);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'lightblue',
        flex: 1,
        // TODO: remove
      }}>
      <BackButton />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable onPress={Keyboard.dismiss} style={styles.innerContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome,</Text>
            <Text style={styles.smallTitle}>Create an account.</Text>

            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                value={lastname}
                onChangeText={setLastname}
                placeholder='Lastname'
                placeholderTextColor={colors.light.text}
              />
              <TextInput
                style={styles.input}
                value={firstname}
                onChangeText={setFirstname}
                placeholder='Firstname'
                placeholderTextColor={colors.light.text}
              />
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
                autoCapitalize='none'
                secureTextEntry
              />
            </View>

            <View style={styles.buttons}>
              {/* // TODO: animated register btn with reanimated */}
              <Pressable
                onPress={handleRegister}
                style={({ pressed }) => [
                  pressed && { opacity: 0.2 },
                  styles.button,
                ]}>
                <Text style={styles.buttonText}>Register</Text>
                <Icons.Ionicons name='log-in-outline' size={20} color='white' />
              </Pressable>
            </View>

            <View style={styles.registerZone}>
              <Text>Already have an account ?</Text>

              <Pressable
                onPress={() => {
                  router.replace('/login');
                }}>
                <Text>Login</Text>
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

export default Register;
