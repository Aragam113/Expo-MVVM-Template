#!/usr/bin/env node

/**
 * This script resets the project to the template state.
 * It removes user modifications and restores the original template files.
 * Run with: npm run reset-project
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = process.cwd();

// Directories to clean before restoring
const dirsToClean = ['app', 'src', 'api'];

// Directories to ensure exist
const dirsToCreate = [
  'app',
  'app/(tabs)',
  'app/(tabs)/explore',
  'app/(tabs)/home',
  'app/(tabs)/icons',
  'src',
  'src/components',
  'src/components/icons',
  'src/constants',
  'src/hooks',
  'src/i18n',
  'src/i18n/locales',
  'src/i18n/locales/en-US',
  'src/i18n/locales/es-ES',
  'src/i18n/locales/ru-RU',
  'src/screens',
  'src/screens/explore',
  'src/screens/home',
  'src/screens/icons',
  'src/services',
  'src/utlis',
  'api',
  'assets',
  'assets/svg-icons',
  'scripts',
  '.vscode',
];

// Template files - содержимое всех файлов шаблона
const templateFiles = {
  '.eslintrc.js': `module.exports = {
  extends: ['expo', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: ['node_modules/', '.expo/', 'dist/', 'build/'],
};
`,

  '.prettierignore': `node_modules
dist
build
*.min.js
`,

  '.prettierrc': `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always"
}
`,

  '.vscode/extensions.json': `{ "recommendations": ["expo.vscode-expo-tools"] }
`,

  '.vscode/settings.json': `{
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit",
    "source.sortMembers": "explicit"
  }
}
`,

  'app.json': `{
  "expo": {
    "name": "TemplateApp",
    "slug": "TemplateApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "templateapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": { "supportsTablet": true },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": { "output": "static", "favicon": "./assets/images/favicon.png" },
    "plugins": [
      "expo-router",
      ["expo-splash-screen", { "image": "./assets/images/splash-icon.png", "imageWidth": 200, "resizeMode": "contain", "backgroundColor": "#ffffff", "dark": { "backgroundColor": "#000000" } }],
      "expo-localization"
    ],
    "experiments": { "typedRoutes": true, "reactCompiler": true }
  }
}
`,

  'tsconfig.json': `{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true, "noImplicitAny": true, "strictNullChecks": true, "strictFunctionTypes": true,
    "strictBindCallApply": true, "strictPropertyInitialization": true, "noImplicitThis": true,
    "alwaysStrict": true, "target": "ESNext", "module": "ESNext", "moduleResolution": "bundler",
    "esModuleInterop": true, "skipLibCheck": true, "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true, "allowSyntheticDefaultImports": true,
    "paths": {
      "@/*": ["./src/*"], "@api/*": ["./api/*"], "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"], "@hooks/*": ["./src/hooks/*"], "@services/*": ["./src/services/*"]
    }
  },
  "ts-node": { "compilerOptions": { "module": "CommonJS" } },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
  "exclude": ["node_modules", "**/node_modules/**", "dist", "build"]
}
`,

  'expo-env.d.ts': `/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore`,

  'app/_layout.tsx': `import { TamaguiProvider } from '@tamagui/core';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';
import config from '../tamagui.config';

import '@/i18n';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </TamaguiProvider>
  );
}
`,

  'app/(tabs)/_layout.tsx': `import { Tabs } from 'expo-router';

import { ExampleIcon, ExploreIcon, HomeIcon } from '@components/icons/svg-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2a2a2a' },
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#8f8f8f',
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => <ExploreIcon color={color} /> }} />
      <Tabs.Screen name="icons" options={{ title: 'Icons', tabBarIcon: ({ color }) => <ExampleIcon color={color} /> }} />
    </Tabs>
  );
}
`,

  'app/(tabs)/index.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, YStack } from 'tamagui';
import '@/i18n';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();

  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} textAlign={'center'}>{t('flag')}</Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('home-screen.welcome')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('home-screen.description')}</Text>
        <Button onPress={() => i18n.changeLanguage('en')}><Text>English</Text></Button>
        <Button onPress={() => i18n.changeLanguage('ru')}><Text>Русский</Text></Button>
        <Button onPress={() => i18n.changeLanguage('es')}><Text>Español</Text></Button>
        <Text c={'#FFFFFFBB'} fs={12}>Current: {i18n.language}</Text>
      </YStack>
    </ScrollView>
  );
}
`,

  'app/(tabs)/explore.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, YStack } from 'tamagui';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} w={'100%'} ta={'center'}>{t('flag')}</Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('explore-screen.label')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('explore-screen.description')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('explore-screen.info')}</Text>
      </YStack>
    </ScrollView>
  );
}
`,

  'app/(tabs)/explore/_layout.tsx': `import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'simple_push', animationDuration: Platform.OS === 'android' ? undefined : 200, contentStyle: { backgroundColor: '#141414' } }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`,

  'app/(tabs)/explore/index.tsx': `import { ExploreScreenContainer } from '@/screens/explore/model-view';

export default function ExploreScreen() {
  return <ExploreScreenContainer />;
}
`,

  'app/(tabs)/home/_layout.tsx': `import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'simple_push', animationDuration: Platform.OS === 'android' ? undefined : 200, contentStyle: { backgroundColor: '#141414' } }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`,

  'app/(tabs)/home/index.tsx': `import { HomeScreenContainer } from '@/screens/home/model-view';

export default function HomeScreen() {
  return <HomeScreenContainer />;
}
`,

  'app/(tabs)/icons.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';

import '@/i18n';
import { ExampleIcon } from '@components/icons/svg-icons';

export default function IconsScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'} px={8}>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('icons-screen.label')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('icons-screen.description')}</Text>
        <XStack w={'100%'} ai={'center'} jc={'center'}><ExampleIcon size={128} /></XStack>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step1')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step2')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step3')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step4')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step5')}</Text>
      </YStack>
    </ScrollView>
  );
}
`,

  'app/(tabs)/icons/_layout.tsx': `import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function IconsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'simple_push', animationDuration: Platform.OS === 'android' ? undefined : 200, contentStyle: { backgroundColor: '#141414' } }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`,

  'app/(tabs)/icons/index.tsx': `import { IconsScreenContainer } from '@/screens/icons/model-view';

export default function IconsScreen() {
  return <IconsScreenContainer />;
}
`,

  'src/i18n/index.ts': `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en-US/translations.json';
import es from './locales/es-ES/translations.json';
import ru from './locales/ru-RU/translations.json';

const resources = { en: { translation: en }, ru: { translation: ru }, es: { translation: es } };

i18n.use(initReactI18next).init({ resources, lng: 'en', fallbackLng: 'en', interpolation: { escapeValue: false } });

export default i18n;
`,

  'src/i18n/locales/en-US/translations.json': `{
  "home-screen": { "welcome": "Welcome to the app!", "description": "This app supports multiple languages. And created with MVVM architecture for better separation of concerns, maintainability, and testability, ensuring a scalable codebase across different platforms and screen sizes." },
  "flag": "🇬🇧",
  "explore-screen": { "label": "This is just another tab", "description": "Still supports localization!", "info": "But this tab have no russian language, it will be replaced automatically with english" },
  "icons-screen": { "label": "This is an example icon screen", "description": "Here you can see how to create and use icons for all entire application", "step1": "• Put an icon file to ./assets/svg-icons/", "step2": "• Run command \\"npm run generate:icons\\"", "step3": "• Import generated icon from \\"@components/icons/\\"", "step4": "• Use this imported component with props \\"size\\" and \\"color\\" if u need", "step5": "• Next u can remove used icons from \\"@components/icons/\\" folder" }
}
`,

  'src/i18n/locales/es-ES/translations.json': `{
  "home-screen": { "welcome": "¡Bienvenido a la aplicación!", "description": "Esta aplicación es compatible con varios idiomas. Y está creada con la arquitectura MVVM para una mejor separación de responsabilidades, mantenibilidad y capacidad de prueba, garantizando una base de código escalable en diferentes plataformas y tamaños de pantalla." },
  "flag": "🇪🇸",
  "explore-screen": { "label": "Esta es solo otra pestaña", "description": "¡También soporta localización!", "info": "Pero esta pestaña no tiene idioma ruso, se reemplazará automáticamente por inglés" },
  "icons-screen": { "label": "Esta es una pantalla de ejemplo de iconos", "description": "Aquí puedes ver cómo crear y usar iconos para toda la aplicación", "step1": "• Coloca un archivo de icono en ./assets/svg-icons/", "step2": "• Ejecuta el comando \\"npm run generate:icons\\"", "step3": "• Importa el icono generado desde \\"@components/icons/\\"", "step4": "• Usa este componente importado con las props \\"size\\" y \\"color\\" si las necesitas", "step5": "• Luego puedes eliminar los iconos usados de la carpeta \\"@components/icons/\\"" }
}
`,

  'src/i18n/locales/ru-RU/translations.json': `{
  "home-screen": { "welcome": "Добро пожаловать в приложение!", "description": "Это приложение поддерживает несколько языков. Оно создано с архитектурой MVVM для лучшего разделения ответственности, удобства поддержки и тестирования, обеспечивая масштабируемую кодовую базу на разных платформах и размерах экранов." },
  "flag": "🇷🇺",
  "explore-screen": { "info": "Русский язык на этой вкладке не поддерживается в большинстве текстов, поэтому он автоматически заменяется на английский" },
  "icons-screen": { "label": "Это пример экрана с иконками", "description": "Здесь вы можете увидеть, как создавать и использовать иконки для всего приложения", "step1": "• Поместите файл иконки в ./assets/svg-icons/", "step2": "• Выполните команду \\"npm run generate:icons\\"", "step3": "• Импортируйте сгенерированную иконку из \\"@components/icons/\\"", "step4": "• Используйте этот импортированный компонент с пропсами \\"size\\" и \\"color\\", если нужно", "step5": "• Затем вы можете удалить использованные иконки из папки \\"@components/icons/\\"" }
}
`,

  'src/screens/base-model.ts': `import { TFunction } from 'i18next';

export interface BaseScreenProps {
  insets: { top: number; bottom: number; left: number; right: number };
  t: TFunction;
}
`,

  'src/screens/explore/model-view.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExploreScreenView } from '@/screens/explore/view';

export const ExploreScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return <ExploreScreenView insets={insets} t={t} />;
};
`,

  'src/screens/explore/model.ts': ``,

  'src/screens/explore/view.tsx': `import { ScrollView, Text, YStack } from 'tamagui';

import { BaseScreenProps } from '@/screens/base-model';

export const ExploreScreenView = ({ insets, t }: BaseScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} w={'100%'} ta={'center'}>{t('flag')}</Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('explore-screen.label')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('explore-screen.description')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('explore-screen.info')}</Text>
      </YStack>
    </ScrollView>
  );
};
`,

  'src/screens/home/model-view.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeScreenView } from '@/screens/home/view';

export const HomeScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  return (
    <HomeScreenView
      insets={insets} t={t}
      onRussianPress={() => i18n.changeLanguage('ru')}
      onEspangolPress={() => i18n.changeLanguage('es')}
      onEnglishPress={() => i18n.changeLanguage('en')}
      currentLanguage={i18n.language}
    />
  );
};
`,

  'src/screens/home/model.ts': `import { BaseScreenProps } from '@/screens/base-model';

export interface HomeScreenProps extends BaseScreenProps {
  onEnglishPress: () => void;
  onRussianPress: () => void;
  onEspangolPress: () => void;
  currentLanguage: string;
}
`,

  'src/screens/home/view.tsx': `import { Button, ScrollView, Text, YStack } from 'tamagui';

import { HomeScreenProps } from '@/screens/home/model';

export const HomeScreenView = ({ insets, onEnglishPress, onRussianPress, onEspangolPress, currentLanguage, t }: HomeScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'}>
      <Text c={'gray'} fs={48} textAlign={'center'}>{t('flag')}</Text>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('home-screen.welcome')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('home-screen.description')}</Text>
        <Button onPress={onEnglishPress}><Text>English</Text></Button>
        <Button onPress={onRussianPress}><Text>Русский</Text></Button>
        <Button onPress={onEspangolPress}><Text>Español</Text></Button>
        <Text c={'#FFFFFFBB'} fs={12}>Current: {currentLanguage}</Text>
      </YStack>
    </ScrollView>
  );
};
`,

  'src/screens/icons/model-view.tsx': `import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconsScreenView } from '@/screens/icons/view';

export const IconsScreenContainer = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return <IconsScreenView insets={insets} t={t} />;
};
`,

  'src/screens/icons/model.ts': ``,

  'src/screens/icons/view.tsx': `import { ScrollView, Text, XStack, YStack } from 'tamagui';

import { BaseScreenProps } from '@/screens/base-model';
import { ExampleIcon } from '@components/icons/svg-icons';

export const IconsScreenView = ({ insets, t }: BaseScreenProps) => {
  return (
    <ScrollView f={1} w={'100%'} pt={insets.top + 16} bg={'#141414'} px={8}>
      <YStack p={16} gap={16}>
        <Text c={'#FFF'} fs={18} ta={'center'}>{t('icons-screen.label')}</Text>
        <Text c={'#FFFFFFBB'} ta={'center'}>{t('icons-screen.description')}</Text>
        <XStack w={'100%'} ai={'center'} jc={'center'}><ExampleIcon size={128} /></XStack>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step1')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step2')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step3')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step4')}</Text>
        <Text c={'#FFFFFFBB'} ta={'left'}>{t('icons-screen.step5')}</Text>
      </YStack>
    </ScrollView>
  );
};
`,
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const resetProject = async (shouldBackup) => {
  try {
    const backupDir = 'app-backup-' + Date.now();

    if (shouldBackup === 'y') {
      await fs.promises.mkdir(path.join(root, backupDir), { recursive: true });
      console.log(`📁 Backup directory /${backupDir} created.`);
    }

    // Clean/backup directories
    for (const dir of dirsToClean) {
      const dirPath = path.join(root, dir);
      if (fs.existsSync(dirPath)) {
        if (shouldBackup === 'y') {
          const backupPath = path.join(root, backupDir, dir);
          await fs.promises.rename(dirPath, backupPath);
          console.log(`➡️ /${dir} moved to /${backupDir}/${dir}`);
        } else {
          await fs.promises.rm(dirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      }
    }

    // Create directories
    for (const dir of dirsToCreate) {
      const dirPath = path.join(root, dir);
      if (!fs.existsSync(dirPath)) {
        await fs.promises.mkdir(dirPath, { recursive: true });
      }
    }
    console.log('\n📁 Directory structure created.');

    // Write template files
    for (const [filePath, content] of Object.entries(templateFiles)) {
      const fullPath = path.join(root, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
      }
      await fs.promises.writeFile(fullPath, content, 'utf8');
    }
    console.log('📄 Template files restored.');

    // Generate icons
    console.log('\n🎨 Generating icons...');
    try {
      require('./generate-icons.js');
    } catch (e) {
      console.log('⚠️ Could not auto-generate icons. Run "npm run generate:icons" manually.');
    }

    console.log('\n✅ Project reset complete! Next steps:');
    console.log('1. Run `npm install` if needed');
    console.log('2. Run `npx expo start` to start development server');
    if (shouldBackup === 'y') {
      console.log(`3. Your old files are in /${backupDir}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
};

rl.question('Do you want to backup existing files before reset? (Y/n): ', (answer) => {
  const userInput = answer.trim().toLowerCase() || 'y';
  if (userInput === 'y' || userInput === 'n') {
    resetProject(userInput).finally(() => rl.close());
  } else {
    console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
    rl.close();
  }
});
