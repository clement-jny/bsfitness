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
import { router, useRouter } from 'expo-router';
import { colors, styles as globalStyles } from '@/utils';
import { BackButton, Icons } from '@/components';
import { toast } from '@/managers';
import { auth } from '@/services';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schema';
import { type TRegisterSchema } from '@/types';
import { FormInput } from '@/components';

// TODO: multi-steps form ?
// INFO: email / pass / passConfirm
// INFO: if ok, next step : lastname / firstname ( / profileImage ?)
// INFO: if ok, go login / auto login ?

const Register = () => {
  // const router = useRouter();

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
    // try {
    const result = await auth.register(email, password, {
      lastname,
      firstname,
    });
    console.log(result);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    // } catch (err) {
    //   console.log('[onSubmit register page] ==>', err);
    //   return null;
    // }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.light.background, // TODO: use colorScheme
        flex: 1,
      }}>
      <BackButton />

      {/* Main Content */}
      <KeyboardAvoidingView
        style={localStyles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable onPress={Keyboard.dismiss} style={localStyles.inner}>
          <Text style={[globalStyles.text.title, localStyles.title]}>
            Welcome,
          </Text>
          <Text style={[globalStyles.text.subtitle, localStyles.subtitle]}>
            Create an account.
          </Text>

          <View style={localStyles.inputs}>
            <Controller
              control={control}
              name='lastname'
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <FormInput
                  label='Lastname'
                  isRequired
                  placeholder='Your lastname'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={error?.message}
                  // autoComplete='family-name'
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
                <FormInput
                  label='Firstname'
                  isRequired
                  placeholder='Your firstname'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={error?.message}
                  // autoComplete='name'
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
                <FormInput
                  label='Email'
                  isRequired
                  placeholder='Your email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={error?.message}
                  keyboardType='email-address'
                  // autoComplete='email'
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
                <FormInput
                  label='Password'
                  isRequired
                  placeholder='Your secure password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={error?.message}
                  secureTextEntry
                  // autoComplete='new-password'
                />
              )}
            />

            {/* <Controller
              control={control}
              name='passwordConfirm'
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <FormInput
                  label='Password confirm'
                  isRequired
                  placeholder='Your secure password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={error?.message}
                  secureTextEntry
                  // autoComplete='new-password'
                />
              )}
            /> */}
          </View>

          <View style={localStyles.buttons}>
            {/* // TODO: animated register btn with reanimated */}
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={({ pressed }) => [
                globalStyles.base.button,
                pressed && { opacity: 0.6 },
                localStyles.button,
              ]}>
              <Text style={localStyles.buttonText}>Register</Text>
              <Icons.Ionicons
                name='log-in-outline'
                size={20}
                color={colors.light.white} // TODO: use colorScheme
              />
            </Pressable>
          </View>

          <View style={localStyles.loginZone}>
            <Text style={{ color: colors.light.text }}>
              Already have an account ?
            </Text>

            <Pressable
              onPress={() => {
                router.replace('/login');
              }}>
              <Text style={{ color: colors.light.text }}>Login</Text>
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  title: {
    color: colors.light.primary, // TODO: use colorScheme
    textAlign: 'center',
  },
  subtitle: {
    color: colors.light.grey, // TODO: use colorScheme
    // opacity: 0.8,
    textAlign: 'center',
  },

  inputs: {
    gap: 10,
    marginVertical: 25,
  },

  buttons: {
    gap: 5,
    marginBottom: 15,
  },
  button: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.light.primary, // TODO: use colorScheme
  },
  buttonText: {
    color: colors.light.white, // TODO: use colorScheme
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    textAlign: 'right',
  },

  loginZone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Register;
