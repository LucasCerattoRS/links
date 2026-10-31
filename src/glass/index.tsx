// Web de expo-glass-effect: mesma API (GlassView, GlassContainer, isLiquidGlassAvailable).
// No iOS o pacote real usa UIVisualEffectView; aqui vira backdrop-filter (ver glass.css).
import type { CSSProperties, ReactNode } from 'react';

type Style = 'clear' | 'regular' | 'none';
type Props = { glassEffectStyle?: Style | { style: Style; animate?: boolean }; tintColor?: string; isInteractive?: boolean; style?: CSSProperties; className?: string; children?: ReactNode };

export function GlassView({ glassEffectStyle = 'regular', tintColor, isInteractive, style, className, children }: Props) {
  const s = typeof glassEffectStyle === 'string' ? glassEffectStyle : glassEffectStyle.style;
  return <span aria-hidden={children ? undefined : true} className={className} data-glass={s} data-interactive={isInteractive ? '' : undefined} style={tintColor ? { ['--glass-tint' as string]: tintColor, ...style } : style}>{children}</span>;
}
export const GlassContainer = ({ children }: { children?: ReactNode; spacing?: number }) => <>{children}</>;
export const isLiquidGlassAvailable = () => false;
export const isGlassEffectAPIAvailable = () => false;
