import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <ImageBackground
      source={require('../assets/images/background-start.png')}
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/logo.png')} />

        <View style={styles.containerTexts}>
          <Text style={styles.headingText}>Your personal sports coach</Text>
          <Text style={styles.smallText}>
            Learn with fitness experts, at your own pace, and 100% updated
            content.
          </Text>
        </View>

        <View style={styles.containerButtons}>
          <Pressable
            onPress={() => {
              console.log('navigate to register');
            }}
            style={({ pressed }) => [
              {
                // backgroundColor: pressed
                //   ? // ? colors.light.secondary
                //     'rgba(0, 0, 0, 0.2)'
                //   : colors.light.green,
              },
              styles.headingButton,
            ]}>
            <Text style={styles.buttonText}>Get started</Text>
          </Pressable>

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={styles.secondaryText}>Already have an account?</Text>

            <Link href={'/login'} style={styles.inlineButton}>
              Log In
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerTexts: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  headingText: {
    width: 247,
    fontFamily: 'Poppins700',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: 'white',
  },
  smallText: {
    width: 359,
    fontFamily: 'Poppins500',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
  },
  containerButtons: {
    alignItems: 'center',
    gap: 5,
    paddingTop: 5,
  },
  headingButton: {
    backgroundColor: colors.light.green,
    width: 212,
    // height: 50,
    paddingHorizontal: 60,
    paddingVertical: 13,
    borderRadius: 30,
  },
  buttonText: {
    width: 93,
    height: 24,
    fontFamily: 'Poppins700',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  secondaryText: {
    // width: 256,
    // height: 24,
    fontFamily: 'Poppins500',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  inlineButton: {
    fontFamily: 'Poppins500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.light.green,
  },
});

export default Index;
