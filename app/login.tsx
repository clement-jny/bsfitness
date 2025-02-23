import { useState } from 'react';
import {
  Image,
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
import { colors, styles as globalStyles } from '@/utils';
import { BackButton, Icons } from '@/components';
import { toast } from '@/managers';
import { auth } from '@/services';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema';
import { type TLoginSchema } from '@/types';
import { FormInput } from '@/components';

const Login = () => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async ({ email, password }: TLoginSchema) => {
    toast.success(`Welcome ${email} - ${password}`);

    // console.log(JSON.stringify(data));

    // const result = await auth.login(email, password);
    // console.log(result);
  };

  // TODO: keep?
  const onError: SubmitErrorHandler<TLoginSchema> = (errors, e) => {
    // toast.error('Please fill all the fields');
    // console.error(JSON.stringify(errors));
  };

  // const handleForgotPassword = () => {
  //   toast.error('Soon : forgot your password');
  // };

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
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable onPress={Keyboard.dismiss} style={localStyles.inner}>
          {/* <Image
            source={require('../assets/images/logo.png')}
            style={{ marginHorizontal: 'auto' }}
          /> */}

          <Text style={[globalStyles.text.title, localStyles.title]}>
            Welcome back,
          </Text>
          <Text style={[globalStyles.text.subtitle, localStyles.subtitle]}>
            Log in to your account.
          </Text>

          <View style={localStyles.inputs}>
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
          </View>

          <View style={localStyles.buttons}>
            {/* // TODO: animated login btn with reanimated */}
            <Pressable
              onPress={handleSubmit(onSubmit, onError)}
              style={({ pressed }) => [
                globalStyles.base.button,
                pressed && { opacity: 0.6 },
                localStyles.button,
              ]}>
              <Text style={localStyles.buttonText}>Log In</Text>
              <Icons.Ionicons
                name='log-in-outline'
                size={20}
                color={colors.light.white} // TODO: use colorScheme
              />
            </Pressable>

            {/* TODO: animated btn */}
            {/* <Pressable onPress={handleForgotPassword}>
              <Text style={localStyles.linkText}>Forgot your password?</Text>
            </Pressable> */}
          </View>

          <View style={localStyles.registerZone}>
            {/* // TODO: use colorScheme */}
            <Text style={{ color: colors.light.text }}>
              Don't have an account ?
            </Text>

            <Pressable
              onPress={() => {
                router.replace('/register');
              }}>
              {/* // TODO: use colorScheme */}
              <Text style={{ color: colors.light.text }}>Register</Text>
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
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

  registerZone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Login;
