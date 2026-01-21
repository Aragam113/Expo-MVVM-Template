import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreenView } from '@/screens/home/view';

export const HomeScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();

  return (
    <HomeScreenView
      insets={insets}
      t={t}
      onRussianPress={() => i18n.changeLanguage('ru')}
      onEspangolPress={() => i18n.changeLanguage('es')}
      onEnglishPress={() => i18n.changeLanguage('en')}
      currentLanguage={i18n.language}
    />
  );
};
