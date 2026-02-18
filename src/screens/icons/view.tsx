import { ScrollView, Text, XStack, YStack } from 'tamagui';

import { BaseScreenProps } from '@/screens/base-model';
import { ExampleIcon } from '@components/icons/svg-icons';

export const IconsScreenView = ({ insets, t }: BaseScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'} px={8}>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>
          {t('icons-screen.label')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>
          {t('icons-screen.description')}
        </Text>

        <XStack w={'100%'} ai={'center'} jc={'center'}>
          <ExampleIcon size={128} />
        </XStack>
        <Text c={'#FFFFFFBB'} ta={'left'}>
          {t('icons-screen.step1')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>
          {t('icons-screen.step2')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>
          {t('icons-screen.step3')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>
          {t('icons-screen.step4')}
        </Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>
          {t('icons-screen.step5')}
        </Text>
      </YStack>
    </ScrollView>
  );
};
