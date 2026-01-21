import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconsScreenView } from '@/screens/icons/view';

export const IconsScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return <IconsScreenView insets={insets} t={t} />;
};
