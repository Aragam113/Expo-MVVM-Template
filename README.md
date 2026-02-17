# RTK Query Codegen Template

Универсальный модуль генерации типизированного API из Swagger/OpenAPI.  
Один модуль → React Native (Expo), Next.js, Vite, CRA.

## Что генерирует

```
src/store/api/
  types.ts            ← Все DTO интерфейсы из Swagger schemas
  auth.slice.ts       ← Эндпоинты + хуки тега "Auth"
  quizzes.slice.ts    ← Эндпоинты + хуки тега "Quizzes"
  ...                 ← По одному файлу на каждый Swagger tag
  index.ts            ← Barrel re-export
```

Каждый слайс автоматически `injectEndpoints` в `emptySplitApi` — не нужно ничего вручную подключать в store.

## Файлы модуля

```
store/
  emptyApi.ts      ← Базовый API (авто-токен: AsyncStorage / localStorage)
  store.ts         ← Redux store
  hooks.ts         ← useAppDispatch / useAppSelector
  index.ts         ← Re-exports

scripts/
  generate-api.ts       ← Генератор (парсит OpenAPI → слайсы по тегам)
  codegen.config.ts     ← Конфиг (читает всё из ENV)
  tsconfig.codegen.json ← TS конфиг для скрипта
```

## Интеграция (3 шага)

### 1. Копировать файлы

```bash
cp -r store/   <project>/src/store/
cp -r scripts/ <project>/scripts/
```

### 2. Зависимости

```bash
npm install @reduxjs/toolkit react-redux
npm install -D ts-node @types/node dotenv
```

React Native дополнительно:

```bash
npm install @react-native-async-storage/async-storage
```

### 3. package.json

```json
{
  "scripts": {
    "codegen": "ts-node -P scripts/tsconfig.codegen.json scripts/generate-api.ts && npm run format"
  }
}
```

## Настройка

### .env

```bash
# Обязательно:
SWAGGER_URL=http://localhost:3001/api-docs-json

# Если Swagger за basic auth:
SWAGGER_AUTH_USERNAME=swagger
SWAGGER_AUTH_PASSWORD=swagger

# URL API для рантайма (выбери нужный):
NEXT_PUBLIC_API_URL=http://localhost:3001      # Next.js
EXPO_PUBLIC_API_URL=http://localhost:3001       # Expo/RN
VITE_API_URL=http://localhost:3001             # Vite
```

### Кастомные пути (опционально)

```bash
CODEGEN_OUTPUT_DIR=src/store/api         # Куда класть слайсы
CODEGEN_EMPTY_API_PATH=src/store/emptyApi.ts  # Путь к базовому API
CODEGEN_HOOKS=true                        # Генерировать хуки
```

## Использование

### Генерация

```bash
# Бэкенд должен быть запущен
npm run codegen
```

### После генерации — подключить слайсы в store.ts

```typescript
// src/store/store.ts — добавить импорты сгенерированных слайсов:
import './api/auth.slice';
import './api/quizzes.slice';
import './api/quiz-responses.slice';
```

### В компонентах

```tsx
import { useAuthControllerLoginMutation, useQuizzesControllerFindAllQuery } from '@/store/api';

function MyComponent() {
  const { data: quizzes, isLoading } = useQuizzesControllerFindAllQuery();
  const [login] = useAuthControllerLoginMutation();
}
```

### Токен

Сохраняй при логине — `emptyApi` подхватит автоматически:

```typescript
// Web
localStorage.setItem('accessToken', response.accessToken);

// React Native
await AsyncStorage.setItem('accessToken', response.accessToken);
```

## Как работает генератор

1. Скачивает `swagger.json` по `SWAGGER_URL`
2. Парсит все `components.schemas` → генерирует `types.ts`
3. Группирует эндпоинты по Swagger-тегам
4. Для каждого тега создаёт `{tag}.slice.ts` с:
   - `injectEndpoints` в `emptySplitApi`
   - Типы `*ApiArg` и `*Response` для каждого эндпоинта
   - React hooks (`useXxxQuery`, `useXxxMutation`)
   - `providesTags` / `invalidatesTags` для кэша
5. Генерирует `index.ts` с barrel-экспортами

Не использует `@rtk-query/codegen-openapi` — свой парсер, полный контроль над выводом.
