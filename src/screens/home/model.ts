import { BaseScreenProps } from '@/screens/base-model';

export interface HomeScreenProps extends BaseScreenProps {
  onEnglishPress: () => void;
  onRussianPress: () => void;
  onEspangolPress: () => void;
  currentLanguage: string;
}
