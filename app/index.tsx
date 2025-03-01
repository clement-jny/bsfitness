import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Link } from 'expo-router';
import { colors, styles as globalStyles } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <ImageBackground
      source={require('../assets/images/background-start.png')}
      style={{ flex: 1 }}>
      <SafeAreaView style={localStyles.container}>
        <Image source={require('../assets/images/logo.png')} />

        <View style={localStyles.containerTexts}>
          <Text style={[globalStyles.text.title, localStyles.headingText]}>
            Your personal sports coach
          </Text>
          <Text style={[globalStyles.text.subtitle, localStyles.smallText]}>
            Learn with fitness experts, at your own pace, and 100% updated
            content.
          </Text>
        </View>

        <View style={localStyles.containerButtons}>
          {/* <Link href={'/register'} style={localStyles.headingButton}>
            <Text style={[globalStyles.text.regularBold, localStyles.buttonText]}>
              Get started
            </Text>
          </Link> */}

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text
              style={[globalStyles.text.subtitle, localStyles.secondaryText]}>
              Already have an account?
            </Text>

            <Link
              href={'/login'}
              style={[globalStyles.text.subtitle, localStyles.inlineButton]}>
              Log In
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
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
    width: 247, // TODO: keep?
    textAlign: 'center',
    color: colors.light.white, // TODO: use colorScheme
  },
  smallText: {
    width: 359,
    textAlign: 'center',
    color: colors.light.grey, // TODO: use colorScheme
    // opacity: 0.8,
  },
  containerButtons: {
    alignItems: 'center',
    gap: 5,
    paddingTop: 5,
  },
  headingButton: {
    backgroundColor: colors.light.primary, // TODO: use colorScheme
    paddingHorizontal: 60,
    paddingVertical: 13,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.light.white, // TODO: use colorScheme
  },
  secondaryText: {
    // width: 256,
    // height: 24,
    color: colors.light.white, // TODO: use colorScheme
  },
  inlineButton: {
    color: colors.light.primary, // TODO: use colorScheme
  },
});

export default Index;
