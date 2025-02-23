import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { colors } from '@/utils';
// import { useColorScheme } from 'react-native';

//  Typage du contexte
type TThemeProps = {
  isDark: boolean;
  color: string;
  setTheme: () => {};
};

// let colorScheme = useColorScheme();
// console.log(colorScheme);
