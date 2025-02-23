import { StyleSheet } from 'react-native';
import { colors } from './colors';

const BORDER_RADIUS = 8;

const FONT_FAMILY = {
  regular: 'Poppins400',
  medium: 'Poppins500',
  bold: 'Poppins700',
} as const;

const base = StyleSheet.create({
  container: {
    backgroundColor: colors.light.background, // TODO: use colorScheme
  } as const,
  input: {
    fontFamily: FONT_FAMILY.regular,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.light.white, // TODO: use colorScheme
  } as const,
  button: {
    borderRadius: BORDER_RADIUS,
  } as const,
});

const text = StyleSheet.create({
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 24,
    lineHeight: 36,
  } as const,
  subtitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: 16,
    lineHeight: 24,
  } as const,
  regularBold: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 16,
    lineHeight: 24,
  } as const,
});

export const styles = { FONT_FAMILY, base, text };
