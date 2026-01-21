import { Button, ScrollView, Text, YStack } from 'tamagui';

import { HomeScreenProps } from '@/screens/home/model';

export const HomeScreenView = ({
  insets,
  onEnglishPress,
  onRussianPress,
  onEspangolPress,
  currentLanguage,
  t,
}: HomeScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} textAlign={'center'}>
        {t('flag')}
      </Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>
          {t('home-screen.welcome')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>
          {t('home-screen.description')}
        </Text>

        <Button onPress={onEnglishPress}>
          <Text>English</Text>
        </Button>

        <Button onPress={onRussianPress}>
          <Text>Русский</Text>
        </Button>

        <Button onPress={onEspangolPress}>
          <Text>Español</Text>
        </Button>

        <Text c={'#FFFFFFBB'} fs={12}>
          Current: {currentLanguage}
        </Text>
      </YStack>
    </ScrollView>
  );
};
