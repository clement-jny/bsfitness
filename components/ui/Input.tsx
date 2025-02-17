// import { colors, styles as CStyles } from '@/utils';
import {
  TextInput,
  StyleSheet,
  type TextInputProps,
  View,
  Text,
} from 'react-native';

type TInputProps = {
  label: string;
  errorMessage?: string;
} & TextInputProps;

const Input = ({ label, errorMessage, ...props }: TInputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={!!errorMessage && { color: '#B00020' }}>{label}</Text>

      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
        {...props}
      />

      <Text style={styles.errorMessageText}>
        {!!errorMessage && errorMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorMessageText: {
    color: '#B00020',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export { Input };
