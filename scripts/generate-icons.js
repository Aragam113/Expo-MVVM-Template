const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../assets/svg-icons');
const OUTPUT_FILE = path.join(__dirname, '../src/components/icons/svg-icons.tsx');

const stripIconSuffix = (name) => {
  return name.replace(/Icons?$/i, '');
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const generateIcons = () => {
  const files = fs.readdirSync(ICONS_DIR).filter((file) => file.endsWith('.svg'));

  const iconData = files.map((file) => {
    const rawName = path.basename(file, '.svg');
    const camelCaseName = rawName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const cleanName = stripIconSuffix(camelCaseName);

    const content = fs
      .readFileSync(path.join(ICONS_DIR, file), 'utf8')
      .replace(/<\?xml.*?\?>/g, '')
      .replace(/<!DOCTYPE.*?>/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\/>\s*-\s*</g, '/><')
      .trim();

    return { name: cleanName, content };
  });

  const names = iconData.map((i) => i.name);
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicates.length > 0) {
    console.error(
      `❌ Обнаружены дубликаты имён после нормализации: ${[...new Set(duplicates)].join(', ')}`
    );
    console.error('   Проверьте файлы: example.svg и exampleIcon.svg дадут одинаковое имя');
    process.exit(1);
  }

  const iconNamesType = iconData.map((i) => `  | '${i.name}'`).join('\n');

  const svgCollectionContent = iconData
    .map((i) => {
      return `  ${i.name}: \`${i.content}\`,`;
    })
    .join('\n');

  const componentExports = iconData
    .map((i) => {
      const componentName = capitalize(i.name) + 'Icon';
      return `export const ${componentName} = (props: Omit<SvgIconProps, 'name'>) => <SvgIcon name='${i.name}' {...props} />;`;
    })
    .join('\n');

  const template = `import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

export type IconName =
${iconNamesType};

export type IconSize = 'small' | 'medium' | 'large' | 'custom';

const SIZES: Record<IconSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
  custom: 24,
};

type SvgIconProps = {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

const SVG_COLLECTION: Record<IconName, string> = {
${svgCollectionContent}
};

export const SvgIcon = ({ name, size = 'medium', color, width, height, style, opacity }: SvgIconProps) => {
  const xml = SVG_COLLECTION[name];
  
  let processedXml = xml;
  if (color) {
    processedXml = processedXml.replace(/fill="[^none][^"]*"/g, \`fill="\${color}"\`);
    processedXml = processedXml.replace(/stroke="[^none][^"]*"/g, \`stroke="\${color}"\`);
  }

  const finalSize = typeof size === 'number' ? size : SIZES[size];

  return (
    <SvgXml
      xml={processedXml}
      width={width || finalSize}
      height={height || finalSize}
      style={style}
      opacity={opacity}
    />
  );
};

${componentExports}
`;

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, template);
  console.log(`✅ Успешно сгенерировано ${iconData.length} иконок в ${OUTPUT_FILE}`);
};

generateIcons();
