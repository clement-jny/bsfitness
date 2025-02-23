import {
  TextInput,
  StyleSheet,
  type TextInputProps,
  View,
  Text,
} from 'react-native';
import { colors, styles as globalStyles } from '@/utils';

type TFormInputProps = {
  label: string;
  isRequired: boolean;
  errorMessage?: string;
} & TextInputProps;

const FormInput = ({
  label,
  isRequired,
  errorMessage,
  ...props
}: TFormInputProps) => {
  return (
    <View style={localStyles.wrapper}>
      <View style={localStyles.texts}>
        <Text style={localStyles.label}>
          {label} <Text style={{ color: '#B00020' }}>{isRequired && '*'}</Text>
        </Text>

        <Text style={localStyles.errorMessage}>
          {!!errorMessage && errorMessage}
        </Text>
      </View>

      <TextInput
        style={globalStyles.base.input}
        autoCorrect={false}
        autoCapitalize='none'
        placeholderTextColor={colors.light.grey} // TODO: use colorScheme
        {...props}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  texts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  label: {
    fontFamily: globalStyles.FONT_FAMILY.regular,
    fontSize: 16,
    color: colors.light.text, // TODO: use colorScheme
  },
  errorMessage: {
    fontFamily: globalStyles.FONT_FAMILY.bold,
    fontSize: 12,
    color: '#B00020',
  },
});

export { FormInput };
