import { ScrollView, Text, YStack } from 'tamagui';

import { BaseScreenProps } from '@/screens/base-model';

export const ExploreScreenView = ({ insets, t }: BaseScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} w={'100%'} ta={'center'}>
        {t('flag')}
      </Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>
          {t('explore-screen.label')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>
          {t('explore-screen.description')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>
          {t('explore-screen.info')}
        </Text>
      </YStack>
    </ScrollView>
  );
};
