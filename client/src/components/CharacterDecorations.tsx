/**
 * CharacterDecorations — Reusable character & gelato decorations
 * - Uses full crisp character images (with hands & legs)
 * - Solid/opaque (no transparency)
 * - Positioned at section edges, NEVER overlapping text/images/input boxes
 * - pointer-events-none so they don't block clicks
 */
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Full character images with complete hands and legs
const CHAR_GREEN_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_green_2c11a5f3.png';
const CHAR_PINK_URL  = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_pink_1f972b7e.png';
const CHAR_MINI_URL  = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663567308753/TQvcQMHh22zjhijGSjhavJ/char_original_mini_c998ba29.png';

// Gelato SVG decorations — solid colors, no transparency
function GelatoIcon({ size = 40, color = '#FFE500', style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none" style={style}>
      <circle cx="20" cy="16" r="14" fill={color} stroke="#0A1628" strokeWidth="2.5" />
      <circle cx="12" cy="13" r="4" fill="rgba(255,255,255,0.55)" />
      <polygon points="8,26 32,26 20,54" fill="#D4A574" stroke="#0A1628" strokeWidth="2.5" />
      <line x1="10" y1="30" x2="30" y2="30" stroke="#C49A6C" strokeWidth="1.5" />
      <line x1="12" y1="36" x2="28" y2="36" stroke="#C49A6C" strokeWidth="1.5" />
      <line x1="14" y1="42" x2="26" y2="42" stroke="#C49A6C" strokeWidth="1.5" />
    </svg>
  );
}

function GelatoDouble({ size = 45, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 45 68" fill="none" style={style}>
      <circle cx="22.5" cy="24" r="14" fill="#FF6B9D" stroke="#0A1628" strokeWidth="2.5" />
      <circle cx="22.5" cy="12" r="11" fill="#00E5FF" stroke="#0A1628" strokeWidth="2.5" />
      <circle cx="17" cy="10" r="3" fill="rgba(255,255,255,0.55)" />
      <polygon points="10,32 35,32 22.5,66" fill="#D4A574" stroke="#0A1628" strokeWidth="2.5" />
      <line x1="12" y1="37" x2="33" y2="37" stroke="#C49A6C" strokeWidth="1.5" />
      <line x1="14" y1="43" x2="31" y2="43" stroke="#C49A6C" strokeWidth="1.5" />
    </svg>
  );
}

function GelatoCup({ size = 40, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none" style={style}>
      <circle cx="20" cy="14" r="12" fill="#FFE500" stroke="#0A1628" strokeWidth="2.5" />
      <circle cx="14" cy="12" r="3" fill="rgba(255,255,255,0.55)" />
      <rect x="6" y="24" width="28" height="20" rx="3" fill="#FF6B9D" stroke="#0A1628" strokeWidth="2.5" />
      <rect x="8" y="28" width="24" height="3" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

type CharVariant = 'green' | 'pink' | 'mini';
type GelatoVariant = 'single' | 'double' | 'cup';
type Position = 'left' | 'right';

interface CharDecoProps {
  variant: CharVariant;
  position: Position;
  /** Offset from the edge of the section (default 0) */
  edgeOffset?: number;
  bottom?: string;
  top?: string;
  /** Width in px */
  size?: number;
  floatDuration?: number;
  floatDelay?: number;
  /** Mirror the image horizontally */
  flip?: boolean;
}

export function CharDecoration({
  variant,
  position,
  edgeOffset = 0,
  bottom,
  top,
  size = 110,
  floatDuration = 5,
  floatDelay = 0,
  flip,
}: CharDecoProps) {
  const { images } = useLanguage();
  const urlMap: Record<CharVariant, string> = {
    green: (images as Record<string, string>)?.charGreen || CHAR_GREEN_URL,
    pink: (images as Record<string, string>)?.charPink || CHAR_PINK_URL,
    mini: (images as Record<string, string>)?.charMini || CHAR_MINI_URL,
  };

  const shouldFlip = flip !== undefined ? flip : position === 'right';

  return (
    <motion.div
      style={{
        position: 'absolute',
        [position]: edgeOffset,
        ...(bottom ? { bottom } : {}),
        ...(top ? { top } : {}),
        zIndex: 2,
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
    >
      <img
        src={urlMap[variant]}
        alt=""
        style={{
          width: size,
          height: 'auto',
          transform: shouldFlip ? 'scaleX(-1)' : 'none',
          filter: 'drop-shadow(3px 6px 10px rgba(0,0,0,0.22))',
          display: 'block',
        }}
      />
    </motion.div>
  );
}

interface GelatoDecoProps {
  variant: GelatoVariant;
  position: Position;
  edgeOffset?: number;
  bottom?: string;
  top?: string;
  size?: number;
  floatDuration?: number;
  floatDelay?: number;
}

export function GelatoDecoration({
  variant,
  position,
  edgeOffset = 8,
  bottom,
  top,
  size = 48,
  floatDuration = 4.5,
  floatDelay = 0,
}: GelatoDecoProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        [position]: edgeOffset,
        ...(bottom ? { bottom } : {}),
        ...(top ? { top } : {}),
        zIndex: 2,
        pointerEvents: 'none',
        filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.18))',
      }}
      animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
    >
      {variant === 'single' && <GelatoIcon size={size} />}
      {variant === 'double' && <GelatoDouble size={size} />}
      {variant === 'cup'    && <GelatoCup size={size} />}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pre-configured decoration sets for each section.
   Characters sit at the very edge of the section container,
   gelatos float near the edge — nothing overlaps the content.
───────────────────────────────────────────────────────────── */

export function AboutDecorations() {
  return (
    <>
      {/* Pink character peeking from bottom-left edge */}
      <CharDecoration variant="pink" position="left" edgeOffset={0} bottom="0" size={180} floatDuration={6} flip={false} />
      {/* Gelato cone top-right corner */}
      <GelatoDecoration variant="single" position="right" edgeOffset={16} top="8%" size={70} floatDuration={4} floatDelay={1} />
      {/* Gelato cup bottom-right corner */}
      <GelatoDecoration variant="cup" position="right" edgeOffset={14} bottom="6%" size={60} floatDuration={5} floatDelay={0.5} />
    </>
  );
}

export function ExperienceDecorations() {
  return (
    <>
      {/* Green character peeking from bottom-right edge */}
      <CharDecoration variant="green" position="right" edgeOffset={0} bottom="0" size={175} floatDuration={5.5} floatDelay={0.3} flip={true} />
      {/* Double gelato top-left corner */}
      <GelatoDecoration variant="double" position="left" edgeOffset={14} top="8%" size={68} floatDuration={4.5} floatDelay={0.8} />
      {/* Single gelato bottom-left corner */}
      <GelatoDecoration variant="single" position="left" edgeOffset={12} bottom="8%" size={56} floatDuration={5} floatDelay={1.5} />
    </>
  );
}

export function ServicesDecorations() {
  return (
    <>
      {/* Mini character top-right */}
      <CharDecoration variant="mini" position="right" edgeOffset={0} top="4%" size={150} floatDuration={6} floatDelay={0.5} flip={true} />
      {/* Gelato cup top-left */}
      <GelatoDecoration variant="cup" position="left" edgeOffset={14} top="12%" size={65} floatDuration={4.5} />
      {/* Double gelato bottom-left */}
      <GelatoDecoration variant="double" position="left" edgeOffset={12} bottom="6%" size={62} floatDuration={5.5} floatDelay={1} />
    </>
  );
}

export function ContactDecorations() {
  return (
    <>
      {/* Green character bottom-left */}
      <CharDecoration variant="green" position="left" edgeOffset={0} bottom="0" size={170} floatDuration={5} floatDelay={0.2} flip={false} />
      {/* Single gelato top-right */}
      <GelatoDecoration variant="single" position="right" edgeOffset={16} top="10%" size={66} floatDuration={4.5} floatDelay={1} />
      {/* Double gelato bottom-right */}
      <GelatoDecoration variant="double" position="right" edgeOffset={14} bottom="8%" size={60} floatDuration={5} floatDelay={0.5} />
    </>
  );
}

export function LinksDecorations() {
  return (
    <>
      {/* Pink character top-left */}
      <CharDecoration variant="pink" position="left" edgeOffset={0} top="4%" size={165} floatDuration={5.5} flip={false} />
      {/* Mini character bottom-right */}
      <CharDecoration variant="mini" position="right" edgeOffset={0} bottom="0" size={140} floatDuration={6} floatDelay={0.5} flip={true} />
      {/* Gelato cup bottom-left */}
      <GelatoDecoration variant="cup" position="left" edgeOffset={12} bottom="4%" size={58} floatDuration={4} floatDelay={1} />
    </>
  );
}
