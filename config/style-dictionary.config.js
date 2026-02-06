/**
 * Style Dictionary Configuration
 * 
 * Этот файл настраивает автоматическую конвертацию токенов из tokens.json
 * в CSS и SCSS переменные.
 * 
 * Как это работает:
 * 1. Читает tokens.json (формат W3C DTCG)
 * 2. Преобразует структуру токенов в плоский формат
 * 3. Генерирует CSS файл с переменными (--token-name: value)
 * 4. Генерирует SCSS файл с переменными ($token-name: value)
 */

const fs = require('fs');
const path = require('path');

/**
 * Функция для преобразования W3C DTCG формата в формат Style Dictionary
 * Рекурсивно проходит по структуре и извлекает токены
 */
function parseW3CTokens(obj, prefix = []) {
  const tokens = {};
  
  // Проходим по всем ключам объекта
  for (const key in obj) {
    // Пропускаем служебные ключи W3C DTCG
    if (key.startsWith('$')) {
      continue;
    }
    
    const value = obj[key];
    // Убираем "Mode 1" из пути и нормализуем имя группы
    let normalizedKey = key.toLowerCase().replace(/\s+/g, '-').replace(/\/mode-1/g, '');
    
    // Преобразуем множественное число в единственное для основных категорий
    if (normalizedKey === 'colors') normalizedKey = 'color';
    if (normalizedKey === 'spacings') normalizedKey = 'spacing';
    if (normalizedKey === 'typographies') normalizedKey = 'typography';
    
    const currentPath = [...prefix, normalizedKey];
    
    // Если это токен (есть $type и $value)
    if (value && typeof value === 'object' && value.$type && value.$value !== undefined) {
      // Формируем имя токена
      const tokenName = currentPath
        .join('-')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/\/mode-1/g, '')
        .replace(/mode-1-/g, '')
        .replace(/-mode-1/g, '');
      
      // Сохраняем токен
      tokens[tokenName] = {
        value: value.$value,
        type: value.$type,
        original: value
      };
    } 
    // Если это вложенный объект, рекурсивно обрабатываем
    else if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedTokens = parseW3CTokens(value, currentPath);
      Object.assign(tokens, nestedTokens);
    }
  }
  
  return tokens;
}

/**
 * Функция для преобразования плоских токенов в структуру Style Dictionary
 */
function convertToStyleDictionaryFormat(flatTokens) {
  const result = {};
  
  for (const [name, token] of Object.entries(flatTokens)) {
    // Разбиваем имя на части
    const pathParts = name.split('-').filter(part => part !== 'mode' && part !== '1');
    let current = result;
    
    // Создаем вложенную структуру
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = {};
      }
      current = current[pathParts[i]];
    }
    
    // Добавляем токен с правильной структурой
    // Для чисел добавляем px сразу при преобразовании
    const tokenName = pathParts[pathParts.length - 1];
    let tokenValue = token.value;
    
    // Если это число (spacing или typography), добавляем px
    if (token.type === 'number' && typeof tokenValue === 'number') {
      tokenValue = `${tokenValue}px`;
    }
    
    current[tokenName] = {
      value: tokenValue,
      type: token.type
    };
  }
  
  return result;
}

// Загружаем и преобразуем токены
const tokensPath = path.join(__dirname, '../tokens/tokens.json');
const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
const flatTokens = parseW3CTokens(tokensData);
const styleDictionaryTokens = convertToStyleDictionaryFormat(flatTokens);

// Создаем временный файл с токенами в формате Style Dictionary
const tempTokensPath = path.join(__dirname, '../tokens/tokens-style-dictionary.json');
fs.writeFileSync(tempTokensPath, JSON.stringify(styleDictionaryTokens, null, 2));

module.exports = {
  // Используем преобразованные токены
  source: ['tokens/tokens-style-dictionary.json'],
  
  // Платформы для генерации (CSS и SCSS)
  platforms: {
    // CSS платформа - генерирует CSS переменные
    css: {
      // Папка для выходных файлов
      buildPath: 'build/css/',
      // Имя выходного файла
      files: [
        {
          // Формат: variables.css
          destination: 'variables.css',
          // Формат вывода - CSS переменные (встроенный формат)
          format: 'css/variables',
          // Опции форматирования
          options: {
            // Не использовать ссылки на другие токены
            outputReferences: false
          }
        }
      ],
      // Трансформации для CSS
      transformGroup: 'css',
    },
    
    // SCSS платформа - генерирует SCSS переменные
    scss: {
      // Папка для выходных файлов
      buildPath: 'build/scss/',
      // Имя выходного файла
      files: [
        {
          // Формат: variables.scss
          destination: 'variables.scss',
          // Формат вывода - SCSS переменные (встроенный формат)
          format: 'scss/variables',
          // Опции форматирования
          options: {
            // Не использовать ссылки на другие токены
            outputReferences: false
          }
        }
      ],
      // Трансформации для SCSS
      transformGroup: 'scss',
    }
  },
  
  // Кастомные трансформации
  transforms: {
    // Трансформация имени токена: преобразует путь в kebab-case
    'name/kebab': {
      type: 'name',
      transform: function(token) {
        // Преобразует путь токена в формат: color-brand-primary-default
        return token.path
          .join('-')
          .toLowerCase()
          .replace(/\s+/g, '-');
      }
    }
  },
  
  // Группы трансформаций
  transformGroup: {
    // Группа для CSS
    'css': [
      'attribute/cti',
      'name/kebab',
      'color/css'
    ],
    // Группа для SCSS
    'scss': [
      'attribute/cti',
      'name/kebab',
      'color/css'
    ]
  }
};
