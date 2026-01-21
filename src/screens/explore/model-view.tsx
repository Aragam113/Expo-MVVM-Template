import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExploreScreenView } from '@/screens/explore/view';

export const ExploreScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return <ExploreScreenView insets={insets} t={t} />;
};
