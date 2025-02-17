import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, styles as s } from '@/utils';
import { BackButton, Icons } from '@/components';
import { toast } from '@/managers';
import { auth } from '@/services';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema';
import { type TRegisterSchema } from '@/types';
import { Input } from '@/components';

// TODO: multi-steps form ?
// INFO: email / pass / passConfirm
// INFO: if ok, next step : lastname / firstname ( / profileImage ?)
// INFO: if ok, go login / auto login ?

const Register = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async ({
    email,
    password,
    lastname,
    firstname,
  }: TRegisterSchema) => {
    // toast.success(`Welcome ${lastname} - ${firstname}`);

    // console.log(JSON.stringify(data));

    const result = await auth.register(email, password, {
      lastname,
      firstname,
    });
    console.log(result);
  };

  // TODO: keep?
  const onError: SubmitErrorHandler<TRegisterSchema> = (errors, e) => {
    // toast.error('Please fill all the fields');
    // console.error(JSON.stringify(errors));
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
              <Controller
                control={control}
                name='lastname'
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label='Lastname'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name='firstname'
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label='Firstname'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name='email'
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label='Email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                    keyboardType='email-address'
                  />
                )}
              />

              <Controller
                control={control}
                name='password'
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label='Password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                    secureTextEntry
                  />
                )}
              />

              <Controller
                control={control}
                name='passwordConfirm'
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label='Password confirm'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={error?.message}
                    secureTextEntry
                  />
                )}
              />
            </View>

            <View style={styles.buttons}>
              {/* // TODO: animated register btn with reanimated */}
              <Pressable
                onPress={handleSubmit(onSubmit, onError)}
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
    gap: 5,
    marginVertical: 25,
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
