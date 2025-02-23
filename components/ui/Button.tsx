import { Text, View, StyleSheet } from 'react-native';
import { Icons } from '../Icons';
import { colors, styles as globalStyles } from '@/utils';

type TButtonProps = {
  label: string;
};

const Button = ({ label }: TButtonProps) => {
  return (
    <View>
      <Text>{label}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({});

export { Button };
