# Design Tokens

Репозиторий для управления дизайн-токенами проекта. Автоматическая конвертация токенов из формата W3C DTCG в CSS и SCSS переменные.

## Описание проекта

Этот проект содержит дизайн-токены (цвета, отступы, типографика) в едином формате и автоматически конвертирует их в CSS и SCSS переменные для использования в веб-проектах.

**Что делает проект:**

- Хранит токены в формате W3C DTCG (стандартный формат для дизайн-токенов)
- Автоматически конвертирует токены в CSS переменные (`--token-name`)
- Автоматически конвертирует токены в SCSS переменные (`$token-name`)
- Обновляет файлы автоматически при изменении токенов через GitHub Actions

**Для кого этот проект:**

- Дизайнеры, которые экспортируют токены из Figma
- Разработчики, которые используют токены в своих проектах
- Команды, которым нужна единая система дизайн-токенов

## Структура репозитория

```
design-tokens/
├── tokens/
│   └── tokens.json              # Исходные токены из Figma (W3C DTCG формат)
├── config/
│   └── style-dictionary.config.js  # Конфигурация для конвертации токенов
├── build/
│   ├── css/
│   │   └── variables.css        # Сгенерированные CSS переменные
│   └── scss/
│       └── variables.scss        # Сгенерированные SCSS переменные
├── .github/
│   └── workflows/
│       └── build-tokens.yml      # GitHub Action для автоматической конвертации
├── package.json                  # Зависимости проекта
└── README.md                     # Этот файл
```

**Важные папки:**

- `tokens/` - здесь хранятся исходные токены. Обновляйте только этот файл.
- `build/` - здесь находятся сгенерированные файлы. Не редактируйте их вручную!
- `config/` - настройки конвертации (можно изменить при необходимости)

## Как использовать токены в CSS

### Шаг 1: Подключите файл с переменными

Скопируйте файл `build/css/variables.css` в ваш проект или подключите его напрямую:

```html
<!-- В HTML файле -->
<link rel="stylesheet" href="path/to/variables.css">
```

Или импортируйте в ваш основной CSS файл:

```css
/* В вашем main.css */
@import './build/css/variables.css';
```

### Шаг 2: Используйте переменные в стилях

После подключения файла вы можете использовать переменные в любом месте вашего CSS:

```css
/* Пример использования цветов */
.button {
  background-color: var(--color-brand-primary-default);
  color: var(--color-neutral-gray-100);
}

.button:hover {
  background-color: var(--color-brand-primary-hover);
}

/* Пример использования отступов */
.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.container {
  padding: var(--spacing-xl);
}

/* Пример использования типографики */
.heading {
  font-size: var(--typography-xl);
}

.text-small {
  font-size: var(--typography-sm);
}
```

### Доступные переменные

**Цвета:**

- `--color-brand-primary-default` - основной цвет бренда
- `--color-brand-primary-hover` - цвет при наведении
- `--color-brand-secondary-default` - вторичный цвет
- `--color-semantic-semantic-success-default` - цвет успеха
- `--color-semantic-semantic-error-default` - цвет ошибки
- `--color-neutral-gray-100` - светло-серый
- `--color-neutral-gray-900` - темно-серый

**Отступы:**

- `--spacing-xs` - 4px
- `--spacing-sm` - 8px
- `--spacing-md` - 16px
- `--spacing-lg` - 24px
- `--spacing-xl` - 32px
- `--spacing-2xl` - 48px
- `--spacing-3xl` - 64px

**Типографика:**

- `--typography-xs` - 12px
- `--typography-sm` - 14px
- `--typography-base` - 16px
- `--typography-lg` - 18px
- `--typography-xl` - 20px
- `--typography-2xl` - 24px
- `--typography-3xl` - 30px

## Как использовать токены в SCSS

### Шаг 1: Подключите файл с переменными

Импортируйте файл с переменными в начало вашего SCSS файла:

```scss
// В вашем main.scss
@import './build/scss/variables.scss';
```

### Шаг 2: Используйте переменные в стилях

После импорта вы можете использовать переменные в любом месте вашего SCSS:

```scss
// Пример использования цветов
.button {
  background-color: $color-brand-primary-default;
  color: $color-neutral-gray-100;
  
  &:hover {
    background-color: $color-brand-primary-hover;
  }
}

// Пример использования отступов
.card {
  padding: $spacing-md;
  margin-bottom: $spacing-lg;
}

.container {
  padding: $spacing-xl;
}

// Пример использования типографики
.heading {
  font-size: $typography-xl;
}

.text-small {
  font-size: $typography-sm;
}
```

### Преимущества SCSS переменных

В SCSS вы можете использовать переменные более гибко:

```scss
// Использование в функциях и миксинах
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
}

.primary-button {
  @include button-variant($color-brand-primary-default, $color-neutral-gray-100);
}

// Использование в вычислениях
.card {
  padding: $spacing-md;
  // Можно использовать математические операции
  margin: $spacing-md * 2;
}
```

### Доступные переменные

Список переменных такой же, как в CSS, но с префиксом `$` вместо `--`:

**Цвета:**

- `$color-brand-primary-default`
- `$color-brand-primary-hover`
- `$color-brand-secondary-default`
- И другие...

**Отступы:**

- `$spacing-xs`, `$spacing-sm`, `$spacing-md` и т.д.

**Типографика:**

- `$typography-xs`, `$typography-sm`, `$typography-base` и т.д.

## Как работает автоматизация

Проект использует автоматизацию на двух уровнях: локальная разработка и CI/CD через GitHub Actions.

### Локальная разработка

Если вы хотите сгенерировать файлы локально на своем компьютере:

1. **Установите зависимости:**
  ```bash
   npm install
  ```
2. **Запустите конвертацию:**
  ```bash
   npm run build
  ```
   Эта команда создаст файлы `build/css/variables.css` и `build/scss/variables.scss`
3. **Режим наблюдения (опционально):**
  ```bash
   npm run build:watch
  ```
   Эта команда будет автоматически перегенерировать файлы при каждом изменении `tokens/tokens.json`

### GitHub Actions (CI/CD)

Проект настроен с автоматической конвертацией через GitHub Actions. Это означает, что вам не нужно запускать команды вручную.

**Как это работает:**

1. **Вы обновляете токены:**
  - Экспортируете токены из Figma в файл `tokens/tokens.json`
  - Коммитите и пушите изменения в ветку `main`
2. **GitHub Action автоматически запускается:**
  - Workflow срабатывает при push в `main`, если изменены файлы в папке `tokens/`
  - Устанавливается Node.js и зависимости
  - Запускается конвертация токенов
3. **Результаты автоматически коммитятся:**
  - Сгенерированные файлы `build/css/variables.css` и `build/scss/variables.scss` автоматически коммитятся обратно в репозиторий
  - Вы получаете уведомление о завершении процесса

**Преимущества:**

- Не нужно запускать команды вручную
- Всегда актуальные файлы в репозитории
- Единый источник правды для всей команды
- История изменений токенов сохраняется в Git

**Файл конфигурации:** `.github/workflows/build-tokens.yml`

### Что делать, если автоматизация не сработала?

1. Проверьте, что вы пушите изменения в ветку `main`
2. Убедитесь, что изменены файлы в папке `tokens/`
3. Проверьте статус workflow в разделе "Actions" на GitHub
4. Если нужно, запустите конвертацию локально командой `npm run build`

---

**Полезные ссылки:**

- [Style Dictionary документация](https://amzn.github.io/style-dictionary/)
- [W3C Design Tokens формат](https://tr.designtokens.org/format/)

