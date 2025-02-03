import { StyleSheet } from 'react-native';
import { colors } from './colors';

const base = StyleSheet.create({
  container: {
    backgroundColor: colors.light.background,
  },
});

const texts = StyleSheet.create({
  title: {
    fontFamily: 'Poppins700',
    fontSize: 24,
    lineHeight: 36,
  },
  regular: {
    fontFamily: 'Poppins500',
    fontSize: 16,
    lineHeight: 24,
  },
  regularBold: {
    fontFamily: 'Poppins700',
    fontSize: 16,
    lineHeight: 24,
  },
});

export const styles = { base, texts };
