import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icons } from './Icons';
import { colors } from '@/utils';

type TBackButtonProps = {
  title?: string;
  color?: string;
};

// TODO: on color if it's dark theme - use a light color : colors.dark.text
// TODO: call ThemeContext and chose color base on the result
const BackButton = ({ title, color = 'black' }: TBackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <Pressable
      onPress={handleBack}
      style={{
        paddingLeft: 5,
        // borderWidth: 1,
        // width: '50%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icons.Ionicons name='arrow-back' size={30} color={color} />

        {!!title && <Text style={{ color: color }}>{title}</Text>}
      </View>
    </Pressable>
  );
};

export { BackButton };
