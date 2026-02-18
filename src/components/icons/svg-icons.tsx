import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

export type IconName = 'Example' | 'Explore' | 'Home';

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
  Example: `<svg width="369" height="323" viewBox="0 0 369 323" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="29.25" y="30.25" width="239.5" height="239.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="94.25" y="95.25" width="109.5" height="109.5" rx="54.75" stroke="white" stroke-width="0.5"/>
<rect x="46.25" y="13.25" width="205.5" height="272.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="12.75" y="252.25" width="205.5" height="272.5" rx="21.75" transform="rotate(-90 12.75 252.25)" stroke="white" stroke-width="0.5"/>
<line x1="7.40184" y1="291.245" x2="290.245" y2="8.4019" stroke="white" stroke-width="0.5"/>
<line x1="7.75539" y1="8.40184" x2="290.598" y2="291.245" stroke="white" stroke-width="0.5"/>
<line y1="148.75" x2="300" y2="148.75" stroke="white" stroke-width="0.5"/>
<line y1="110.75" x2="300" y2="110.75" stroke="white" stroke-width="0.5"/>
<line y1="187.75" x2="300" y2="187.75" stroke="white" stroke-width="0.5"/>
<line x1="149.75" y1="300" x2="149.75" stroke="white" stroke-width="0.5"/>
<line x1="187.736" y1="300" x2="187.736" stroke="white" stroke-width="0.5"/>
<line x1="110.25" y1="300" x2="110.25" stroke="white" stroke-width="0.5"/>
<circle cx="259" cy="213" r="110" fill="url(#paint0_linear_14_239)" fill-opacity="0.93"/>
<path d="M47.7328 250.642C53.3255 244.689 71.3257 225.799 85 214.5C96.5 204.997 96.3527 204.997 105 204.997C126 204.997 176.984 205 234 205C251 205 251 205 251 187.5V83.4978C251 46.9973 252.5 46.9971 223 46.9973C180 46.9977 141.5 46.9979 81.0001 46.9973C45.9998 46.997 45.9997 46.9973 45.9998 77.498C45.9999 134.488 45.9999 233.049 45.9998 249.985C45.9998 250.895 47.1098 251.305 47.7328 250.642Z" stroke="white" stroke-width="12"/>
<mask id="mask0_14_239" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="149" y="103" width="220" height="220">
<circle cx="259" cy="213" r="109.5" fill="url(#paint1_linear_14_239)" fill-opacity="0.93" stroke="black"/>
</mask>
<g mask="url(#mask0_14_239)">
<path d="M47.7328 250.642C53.3255 244.689 71.3257 225.799 85 214.5C96.5 204.997 96.3527 204.997 105 204.997C126 204.997 176.984 205 234 205C251 205 251 205 251 187.5V83.4978C251 46.9973 252.5 46.9971 223 46.9973C180 46.9977 141.5 46.9979 81.0001 46.9973C45.9998 46.997 45.9997 46.9973 45.9998 77.498C45.9999 134.488 45.9999 233.049 45.9998 249.985C45.9998 250.895 47.1098 251.305 47.7328 250.642Z" stroke="black" stroke-width="12"/>
</g>
<defs>
<linearGradient id="paint0_linear_14_239" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
<linearGradient id="paint1_linear_14_239" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
</defs>
</svg>`,
  Explore: `<svg width="369" height="323" viewBox="0 0 369 323" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="29.25" y="30.25" width="239.5" height="239.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="94.25" y="95.25" width="109.5" height="109.5" rx="54.75" stroke="white" stroke-width="0.5"/>
<rect x="46.25" y="13.25" width="205.5" height="272.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="12.75" y="252.25" width="205.5" height="272.5" rx="21.75" transform="rotate(-90 12.75 252.25)" stroke="white" stroke-width="0.5"/>
<line x1="7.40184" y1="291.245" x2="290.245" y2="8.4019" stroke="white" stroke-width="0.5"/>
<line x1="8.67678" y1="7.82322" x2="291.519" y2="290.666" stroke="white" stroke-width="0.5"/>
<line y1="148.75" x2="300" y2="148.75" stroke="white" stroke-width="0.5"/>
<line y1="110.75" x2="300" y2="110.75" stroke="white" stroke-width="0.5"/>
<line y1="187.75" x2="300" y2="187.75" stroke="white" stroke-width="0.5"/>
<line x1="149.75" y1="300" x2="149.75" stroke="white" stroke-width="0.5"/>
<line x1="187.736" y1="300" x2="187.736" stroke="white" stroke-width="0.5"/>
<line x1="110.25" y1="300" x2="110.25" stroke="white" stroke-width="0.5"/>
<circle cx="259" cy="213" r="110" fill="url(#paint0_linear_20_266)" fill-opacity="0.93"/>
<circle cx="149.5" cy="146.5" r="112.5" stroke="white" stroke-width="12"/>
<circle cx="149.5" cy="149.5" r="12" stroke="white" stroke-width="9"/>
<path d="M165.73 166.642L92.9727 204.935C92.0929 205.398 91.1497 204.433 91.6331 203.564L131.86 131.252C131.951 131.087 132.087 130.952 132.252 130.861L204.53 91.1324C205.404 90.6523 206.365 91.6058 205.892 92.4832L166.145 166.232C166.05 166.407 165.906 166.549 165.73 166.642Z" stroke="white" stroke-width="8"/>
<path d="M150 221C150.142 220.233 150.283 219.467 150.425 218.7C152.975 204.9 155.525 191.1 158.075 177.3C158.217 176.533 158.358 175.767 158.5 175C152.833 175 147.167 175 141.5 175C141.642 175.767 141.783 176.533 141.925 177.3C144.475 191.1 147.025 204.9 149.575 218.7C149.717 219.467 149.858 220.233 150 221Z" fill="white"/>
<path d="M150 75C150.142 75.7667 150.283 76.5333 150.425 77.3C152.975 91.1 155.525 104.9 158.075 118.7C158.217 119.467 158.358 120.233 158.5 121C152.833 121 147.167 121 141.5 121C141.642 120.233 141.783 119.467 141.925 118.7C144.475 104.9 147.025 91.1 149.575 77.3C149.717 76.5333 149.858 75.7667 150 75Z" fill="white"/>
<path d="M222.005 148.005C221.238 147.863 220.472 147.722 219.705 147.58C205.905 145.03 192.105 142.48 178.305 139.93C177.538 139.788 176.772 139.647 176.005 139.505C176.005 145.172 176.005 150.838 176.005 156.505C176.772 156.363 177.538 156.222 178.305 156.08C192.105 153.53 205.905 150.98 219.705 148.43C220.472 148.288 221.238 148.147 222.005 148.005Z" fill="white"/>
<path d="M76.0049 148.005C76.7715 148.147 77.5382 148.288 78.3049 148.43C92.1049 150.98 105.905 153.53 119.705 156.08C120.472 156.222 121.238 156.363 122.005 156.505C122.005 150.838 122.005 145.172 122.005 139.505C121.238 139.647 120.472 139.788 119.705 139.93C105.905 142.48 92.1049 145.03 78.3049 147.58C77.5382 147.722 76.7715 147.863 76.0049 148.005Z" fill="white"/>
<path d="M60 151.5C61 151.615 62 151.731 63 151.846C63 149.615 63 147.385 63 145.154C62 145.269 61 145.385 60 145.5C59.7833 145.525 59.5667 145.55 59.35 145.575C55.45 146.025 51.55 146.475 47.65 146.925C47.4333 146.95 47.2167 146.975 47 147C46.5544 147.051 46.1088 147.103 45.6631 147.154C45.6631 148.051 45.6631 148.949 45.6631 149.846C46.1088 149.897 46.5544 149.949 47 150C47.2167 150.025 47.4333 150.05 47.65 150.075C51.55 150.525 55.45 150.975 59.35 151.425C59.5667 151.45 59.7833 151.475 60 151.5Z" fill="white"/>
<path d="M238 151C237 151.115 236 151.231 235 151.346C235 149.115 235 146.885 235 144.654C236 144.769 237 144.885 238 145C238.217 145.025 238.433 145.05 238.65 145.075C242.55 145.525 246.45 145.975 250.35 146.425C250.567 146.45 250.783 146.475 251 146.5C251.446 146.551 251.891 146.603 252.337 146.654C252.337 147.551 252.337 148.449 252.337 149.346C251.891 149.397 251.446 149.449 251 149.5C250.783 149.525 250.567 149.55 250.35 149.575C246.45 150.025 242.55 150.475 238.65 150.925C238.433 150.95 238.217 150.975 238 151Z" fill="white"/>
<path d="M153 237C153.115 236 153.231 235 153.346 234C151.115 234 148.885 234 146.654 234C146.769 235 146.885 236 147 237C147.025 237.217 147.05 237.433 147.075 237.65C147.525 241.55 147.975 245.45 148.425 249.35C148.45 249.567 148.475 249.783 148.5 250C148.551 250.446 148.603 250.891 148.654 251.337C149.551 251.337 150.449 251.337 151.346 251.337C151.397 250.891 151.449 250.446 151.5 250C151.525 249.783 151.55 249.567 151.575 249.35C152.025 245.45 152.475 241.55 152.925 237.65C152.95 237.433 152.975 237.217 153 237Z" fill="white"/>
<path d="M156.828 45V61H153.547L147.18 51.7656H147.078V61H143.211V45H146.539L152.836 54.2187H152.969V45H156.828Z" fill="white"/>
<mask id="mask0_20_266" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="149" y="103" width="220" height="220">
<circle cx="259" cy="213" r="109.5" fill="url(#paint1_linear_20_266)" fill-opacity="0.93" stroke="black"/>
</mask>
<g mask="url(#mask0_20_266)">
<circle cx="149.5" cy="146.5" r="112.5" stroke="black" stroke-width="12"/>
<circle cx="149.5" cy="149.5" r="12" stroke="black" stroke-width="9"/>
<path d="M165.73 166.642L92.9727 204.935C92.0929 205.398 91.1497 204.433 91.6331 203.564L131.86 131.252C131.951 131.087 132.087 130.952 132.252 130.861L204.53 91.1324C205.404 90.6523 206.365 91.6058 205.892 92.4832L166.145 166.232C166.05 166.407 165.906 166.549 165.73 166.642Z" fill="black" stroke="black" stroke-width="8"/>
<path d="M150 221C150.142 220.233 150.283 219.467 150.425 218.7C152.975 204.9 155.525 191.1 158.075 177.3C158.217 176.533 158.358 175.767 158.5 175C152.833 175 147.167 175 141.5 175C141.642 175.767 141.783 176.533 141.925 177.3C144.475 191.1 147.025 204.9 149.575 218.7C149.717 219.467 149.858 220.233 150 221Z" fill="black"/>
<path d="M150 75C150.142 75.7667 150.283 76.5333 150.425 77.3C152.975 91.1 155.525 104.9 158.075 118.7C158.217 119.467 158.358 120.233 158.5 121C152.833 121 147.167 121 141.5 121C141.642 120.233 141.783 119.467 141.925 118.7C144.475 104.9 147.025 91.1 149.575 77.3C149.717 76.5333 149.858 75.7667 150 75Z" fill="black"/>
<path d="M222.005 148.005C221.238 147.863 220.472 147.722 219.705 147.58C205.905 145.03 192.105 142.48 178.305 139.93C177.538 139.788 176.772 139.647 176.005 139.505C176.005 145.172 176.005 150.838 176.005 156.505C176.772 156.363 177.538 156.222 178.305 156.08C192.105 153.53 205.905 150.98 219.705 148.43C220.472 148.288 221.238 148.147 222.005 148.005Z" fill="black"/>
<path d="M238 151C237 151.115 236 151.231 235 151.346C235 149.115 235 146.885 235 144.654C236 144.769 237 144.885 238 145C238.217 145.025 238.433 145.05 238.65 145.075C242.55 145.525 246.45 145.975 250.35 146.425C250.567 146.45 250.783 146.475 251 146.5C251.446 146.551 251.891 146.603 252.337 146.654C252.337 147.551 252.337 148.449 252.337 149.346C251.891 149.397 251.446 149.449 251 149.5C250.783 149.525 250.567 149.55 250.35 149.575C246.45 150.025 242.55 150.475 238.65 150.925C238.433 150.95 238.217 150.975 238 151Z" fill="black"/>
<path d="M153 237C153.115 236 153.231 235 153.346 234C151.115 234 148.885 234 146.654 234C146.769 235 146.885 236 147 237C147.025 237.217 147.05 237.433 147.075 237.65C147.525 241.55 147.975 245.45 148.425 249.35C148.45 249.567 148.475 249.783 148.5 250C148.551 250.446 148.603 250.891 148.654 251.337C149.551 251.337 150.449 251.337 151.346 251.337C151.397 250.891 151.449 250.446 151.5 250C151.525 249.783 151.55 249.567 151.575 249.35C152.025 245.45 152.475 241.55 152.925 237.65C152.95 237.433 152.975 237.217 153 237Z" fill="black"/>
</g>
<defs>
<linearGradient id="paint0_linear_20_266" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
<linearGradient id="paint1_linear_20_266" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
</defs>
</svg>`,
  Home: `<svg width="369" height="323" viewBox="0 0 369 323" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="29.25" y="30.25" width="239.5" height="239.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="94.25" y="95.25" width="109.5" height="109.5" rx="54.75" stroke="white" stroke-width="0.5"/>
<rect x="46.25" y="13.25" width="205.5" height="272.5" rx="21.75" stroke="white" stroke-width="0.5"/>
<rect x="12.75" y="252.25" width="205.5" height="272.5" rx="21.75" transform="rotate(-90 12.75 252.25)" stroke="white" stroke-width="0.5"/>
<line x1="7.40184" y1="291.245" x2="290.245" y2="8.4019" stroke="white" stroke-width="0.5"/>
<line x1="8.67678" y1="7.82322" x2="291.519" y2="290.666" stroke="white" stroke-width="0.5"/>
<line y1="148.75" x2="300" y2="148.75" stroke="white" stroke-width="0.5"/>
<line y1="110.75" x2="300" y2="110.75" stroke="white" stroke-width="0.5"/>
<line y1="187.75" x2="300" y2="187.75" stroke="white" stroke-width="0.5"/>
<line x1="149.75" y1="300" x2="149.75" stroke="white" stroke-width="0.5"/>
<line x1="187.736" y1="300" x2="187.736" stroke="white" stroke-width="0.5"/>
<line x1="110.25" y1="300" x2="110.25" stroke="white" stroke-width="0.5"/>
<circle cx="259" cy="213" r="110" fill="url(#paint0_linear_20_384)" fill-opacity="0.93"/>
<path d="M41 104.5L146.922 27.4204C147.268 27.1689 147.735 27.1648 148.085 27.4102L201.176 64.6459C201.838 65.1107 202.75 64.6366 202.75 63.8272V44C202.75 43.4477 203.198 43 203.75 43H223.5C224.052 43 224.5 43.4477 224.5 44V80.4844C224.5 80.8104 224.659 81.116 224.926 81.3032L258 104.5M167 217V152.5C167 151.948 166.552 151.5 166 151.5H130C129.448 151.5 129 151.948 129 152.5V217M167 217H129M167 217H227.018C227.563 217 228.008 216.563 228.018 216.019L229.99 109.531C229.996 109.199 229.837 108.886 229.565 108.695L148.086 51.4119C147.736 51.1656 147.267 51.1697 146.921 51.4221L68.4106 108.7C68.1526 108.889 68 109.189 68 109.508V216C68 216.552 68.4477 217 69 217H129" stroke="white" stroke-width="12" stroke-miterlimit="3.62796" stroke-linecap="round" stroke-linejoin="bevel"/>
<mask id="mask0_20_384" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="149" y="103" width="220" height="220">
<circle cx="259" cy="213" r="109.5" fill="url(#paint1_linear_20_384)" fill-opacity="0.93" stroke="black"/>
</mask>
<g mask="url(#mask0_20_384)">
<path d="M41 104.5L146.922 27.4204C147.268 27.1689 147.735 27.1648 148.085 27.4102L201.176 64.6459C201.838 65.1107 202.75 64.6366 202.75 63.8272V44C202.75 43.4477 203.198 43 203.75 43H223.5C224.052 43 224.5 43.4477 224.5 44V80.4844C224.5 80.8104 224.659 81.116 224.926 81.3032L258 104.5M167 217V152.5C167 151.948 166.552 151.5 166 151.5H130C129.448 151.5 129 151.948 129 152.5V217M167 217H129M167 217H227.018C227.563 217 228.008 216.563 228.018 216.019L229.99 109.531C229.996 109.199 229.837 108.886 229.565 108.695L148.086 51.4119C147.736 51.1656 147.267 51.1697 146.921 51.4221L68.4106 108.7C68.1526 108.889 68 109.189 68 109.508V216C68 216.552 68.4477 217 69 217H129" stroke="black" stroke-width="12" stroke-miterlimit="3.62796" stroke-linecap="round" stroke-linejoin="bevel"/>
</g>
<defs>
<linearGradient id="paint0_linear_20_384" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
<linearGradient id="paint1_linear_20_384" x1="259" y1="103" x2="259" y2="323" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4545"/>
<stop offset="1" stop-color="#737373"/>
</linearGradient>
</defs>
</svg>`,
};

export const SvgIcon = ({
  name,
  size = 'medium',
  color,
  width,
  height,
  style,
  opacity,
}: SvgIconProps) => {
  const xml = SVG_COLLECTION[name];

  let processedXml = xml;
  if (color) {
    processedXml = processedXml.replace(/fill="[^none][^"]*"/g, `fill="${color}"`);
    processedXml = processedXml.replace(/stroke="[^none][^"]*"/g, `stroke="${color}"`);
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

export const ExampleIcon = (props: Omit<SvgIconProps, 'name'>) => (
  <SvgIcon name="Example" {...props} />
);
export const ExploreIcon = (props: Omit<SvgIconProps, 'name'>) => (
  <SvgIcon name="Explore" {...props} />
);
export const HomeIcon = (props: Omit<SvgIconProps, 'name'>) => <SvgIcon name="Home" {...props} />;
