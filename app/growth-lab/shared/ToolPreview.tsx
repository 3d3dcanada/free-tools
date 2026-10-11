import { useId, type CSSProperties, type ReactNode } from "react";

/**
 * A small inline picture of what each free tool makes. One component for the
 * hub, the homepage band, the pull-out menu and the header menus, so a tool looks the
 * same everywhere it is offered. Vector only: no raster, no AI art, no network.
 *
 * The QR code is a real one. QR_PREVIEW holds the module path for the text below,
 * generated once with the `qrcode` package and kept as a string so this file stays
 * out of the bundle weight of an encoder (it is used on every page through the
 * menus). scripts/audit/tools-hub.test.mts paints the path and decodes it.
 */
export const QR_PREVIEW = {
  text: "https://3d3d.ca/tools",
  size: 25,
  path: "M0 0h7v1h-7zM10 0h1v1h-1zM13 0h1v1h-1zM16 0h1v1h-1zM18 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM11 1h5v1h-5zM18 1h1v1h-1zM24 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h1v1h-1zM10 2h2v1h-2zM14 2h3v1h-3zM18 2h1v1h-1zM20 2h3v1h-3zM24 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h1v1h-1zM11 3h6v1h-6zM18 3h1v1h-1zM20 3h3v1h-3zM24 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h2v1h-2zM11 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1zM20 4h3v1h-3zM24 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h9v1h-9zM18 5h1v1h-1zM24 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h7v1h-7zM8 7h2v1h-2zM12 7h1v1h-1zM14 7h1v1h-1zM16 7h1v1h-1zM0 8h1v1h-1zM2 8h5v1h-5zM9 8h2v1h-2zM13 8h2v1h-2zM18 8h5v1h-5zM0 9h3v1h-3zM4 9h2v1h-2zM8 9h1v1h-1zM10 9h2v1h-2zM13 9h1v1h-1zM19 9h1v1h-1zM23 9h1v1h-1zM2 10h2v1h-2zM6 10h1v1h-1zM8 10h4v1h-4zM14 10h8v1h-8zM23 10h2v1h-2zM1 11h1v1h-1zM3 11h3v1h-3zM8 11h2v1h-2zM11 11h1v1h-1zM15 11h1v1h-1zM18 11h1v1h-1zM24 11h1v1h-1zM0 12h4v1h-4zM6 12h1v1h-1zM8 12h2v1h-2zM11 12h5v1h-5zM18 12h3v1h-3zM22 12h3v1h-3zM0 13h1v1h-1zM3 13h1v1h-1zM7 13h3v1h-3zM14 13h1v1h-1zM16 13h2v1h-2zM21 13h1v1h-1zM23 13h1v1h-1zM0 14h1v1h-1zM3 14h1v1h-1zM6 14h2v1h-2zM9 14h1v1h-1zM11 14h3v1h-3zM15 14h2v1h-2zM18 14h4v1h-4zM23 14h2v1h-2zM0 15h1v1h-1zM2 15h1v1h-1zM4 15h2v1h-2zM8 15h1v1h-1zM11 15h1v1h-1zM14 15h1v1h-1zM17 15h1v1h-1zM19 15h2v1h-2zM24 15h1v1h-1zM0 16h1v1h-1zM2 16h1v1h-1zM5 16h5v1h-5zM11 16h1v1h-1zM15 16h6v1h-6zM22 16h1v1h-1zM8 17h2v1h-2zM12 17h2v1h-2zM15 17h2v1h-2zM20 17h2v1h-2zM0 18h7v1h-7zM10 18h1v1h-1zM13 18h2v1h-2zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h3v1h-3zM0 19h1v1h-1zM6 19h1v1h-1zM8 19h3v1h-3zM12 19h2v1h-2zM16 19h1v1h-1zM20 19h2v1h-2zM23 19h2v1h-2zM0 20h1v1h-1zM2 20h3v1h-3zM6 20h1v1h-1zM8 20h3v1h-3zM12 20h1v1h-1zM14 20h7v1h-7zM22 20h3v1h-3zM0 21h1v1h-1zM2 21h3v1h-3zM6 21h1v1h-1zM8 21h2v1h-2zM15 21h4v1h-4zM20 21h5v1h-5zM0 22h1v1h-1zM2 22h3v1h-3zM6 22h1v1h-1zM8 22h1v1h-1zM10 22h3v1h-3zM16 22h1v1h-1zM21 22h2v1h-2zM24 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM10 23h2v1h-2zM14 23h8v1h-8zM24 23h1v1h-1zM0 24h7v1h-7zM8 24h4v1h-4zM15 24h1v1h-1zM18 24h7v1h-7z",
} as const;

const INK = "#171717";
const LINE = "#cfcfcf";
const SOFT = "#ececec";
const PAPER = "#ffffff";
const ACC = "var(--accent, #04d9c4)";
const ACC_WASH = "color-mix(in srgb, var(--accent, #04d9c4) 22%, #fff)";

const S = { stroke: INK, strokeWidth: 1.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

/** A white sheet with an ink outline. */
function Sheet({ x, y, w, h, r = 2, fill = PAPER }: { x: number; y: number; w: number; h: number; r?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} {...S} />;
}
/** Grey text lines: `n` rows of widths cycling through `ws`. */
function Lines({ x, y, w, n = 3, gap = 6, ws = [1, 0.8, 0.9, 0.6], color = LINE }: { x: number; y: number; w: number; n?: number; gap?: number; ws?: number[]; color?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w * ws[i % ws.length]} height={2.6} rx={1.3} fill={color} />
      ))}
    </g>
  );
}
/** A landscape picture: sky, sun, two hills. */
function Photo({ x, y, w, h, r = 2 }: { x: number; y: number; w: number; h: number; r?: number }) {
  const id = `ph${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} rx={r} />
      </clipPath>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={ACC_WASH} />
      <g clipPath={`url(#${id})`}>
        <circle cx={x + w * 0.72} cy={y + h * 0.3} r={h * 0.14} fill={ACC} />
        <path d={`M${x} ${y + h} L${x + w * 0.32} ${y + h * 0.5} L${x + w * 0.58} ${y + h * 0.82} L${x + w * 0.76} ${y + h * 0.62} L${x + w} ${y + h} Z`} fill={INK} opacity={0.82} />
      </g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" {...S} />
    </g>
  );
}
function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = (da: number) => `${x2 - 5 * Math.cos(a + da)} ${y2 - 5 * Math.sin(a + da)}`;
  return <path d={`M${x1} ${y1}L${x2} ${y2}M${h(0.5)}L${x2} ${y2}L${h(-0.5)}`} fill="none" {...S} />;
}
function Tag({ x, y, children }: { x: number; y: number; children: string }) {
  const w = children.length * 5.6 + 8;
  return (
    <g>
      <rect x={x - w / 2} y={y - 7} width={w} height={14} rx={3} fill={ACC} {...S} />
      <text x={x} y={y + 3.4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={9} fontWeight={700} fill={INK}>
        {children}
      </text>
    </g>
  );
}
/** The real QR code, `s` units wide, with its quiet zone, at (x, y). */
function Qr({ x, y, s }: { x: number; y: number; s: number }) {
  const total = QR_PREVIEW.size + 8;
  const k = s / total;
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={2} fill={PAPER} {...S} strokeWidth={1.1} />
      <path d={QR_PREVIEW.path} transform={`translate(${x + 4 * k} ${y + 4 * k}) scale(${k})`} fill={INK} />
    </g>
  );
}
function Document({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title: string }) {
  return (
    <g>
      <Sheet x={x} y={y} w={w} h={h} />
      <rect x={x + 6} y={y + 6} width={18} height={6} rx={1.5} fill={ACC} />
      <text x={x + w - 6} y={y + 11.5} textAnchor="end" fontFamily="ui-monospace, monospace" fontSize={7} fontWeight={700} fill={INK}>
        {title}
      </text>
      <Lines x={x + 6} y={y + 20} w={w - 12} n={4} gap={6.5} ws={[1, 0.9, 0.95, 0.7]} />
      <rect x={x + w - 34} y={y + h - 16} width={28} height={10} rx={2} fill={ACC_WASH} {...S} strokeWidth={1} />
    </g>
  );
}
function Stack({ x, y, w, h, n = 3 }: { x: number; y: number; w: number; h: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const k = n - 1 - i;
        return <Sheet key={i} x={x + k * 3} y={y - k * 3} w={w} h={h} fill={i === n - 1 ? PAPER : SOFT} />;
      })}
      <Lines x={x + 6} y={y + 8} w={w - 12} n={3} gap={6} />
    </g>
  );
}
function Convert({ from, to }: { from: string; to: string }) {
  return (
    <g>
      <Photo x={12} y={26} w={46} h={46} />
      <Tag x={35} y={84}>{from}</Tag>
      <Arrow x1={64} y1={49} x2={92} y2={49} />
      <Photo x={102} y={26} w={46} h={46} r={6} />
      <Tag x={125} y={84}>{to}</Tag>
    </g>
  );
}
function Ruler() {
  return (
    <g>
      <rect x={10} y={22} width={140} height={22} rx={3} fill={PAPER} {...S} />
      {Array.from({ length: 29 }, (_, i) => (
        <line key={i} x1={14 + i * 4.6} y1={22} x2={14 + i * 4.6} y2={i % 5 === 0 ? 34 : 29} stroke={INK} strokeWidth={1} />
      ))}
      <rect x={10} y={56} width={140} height={22} rx={3} fill={ACC_WASH} {...S} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={16 + i * 11.2} y1={78} x2={16 + i * 11.2} y2={i % 2 === 0 ? 66 : 71} stroke={INK} strokeWidth={1} />
      ))}
      <Arrow x1={80} y1={47} x2={80} y2={53} />
    </g>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  "qr-code": () => (
    <g>
      <Qr x={44} y={8} s={72} />
      <Lines x={52} y={86} w={56} n={1} />
    </g>
  ),
  "wifi-qr-code": () => (
    <g>
      <Qr x={14} y={14} s={72} />
      <g fill="none" {...S} transform="translate(120 46)">
        <path d="M-18 -4a26 26 0 0 1 36 0" />
        <path d="M-12 4a17 17 0 0 1 24 0" />
        <path d="M-6 12a8 8 0 0 1 12 0" />
        <circle cx={0} cy={19} r={2.4} fill={ACC} />
      </g>
    </g>
  ),
  "vcard-qr-code": () => (
    <g>
      <Qr x={12} y={14} s={72} />
      <Sheet x={92} y={26} w={58} h={48} r={4} />
      <circle cx={106} cy={42} r={6} fill={ACC} {...S} strokeWidth={1.1} />
      <Lines x={116} y={38} w={28} n={2} gap={6} />
      <Lines x={98} y={56} w={44} n={2} gap={6} />
    </g>
  ),
  "calendar-qr-code": () => (
    <g>
      <Qr x={12} y={14} s={72} />
      <Sheet x={92} y={24} w={58} h={52} r={4} />
      <rect x={92} y={24} width={58} height={13} rx={4} fill={ACC} {...S} />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={98 + (i % 4) * 12} y={43 + Math.floor(i / 4) * 10} width={8} height={6} rx={1.5} fill={i === 6 ? ACC : SOFT} />
      ))}
    </g>
  ),
  "business-card": () => (
    <g>
      <Sheet x={14} y={14} w={96} h={56} r={4} />
      <rect x={14} y={14} width={26} height={56} rx={4} fill={ACC} {...S} />
      <Lines x={48} y={26} w={52} n={4} gap={8} ws={[0.9, 0.6, 0.75, 0.5]} />
      <Sheet x={50} y={46} w={96} h={46} r={4} />
      <Qr x={58} y={52} s={34} />
      <Lines x={98} y={58} w={40} n={3} gap={8} />
    </g>
  ),
  "flyer-maker": () => (
    <g>
      <Sheet x={50} y={6} w={60} h={88} r={3} />
      <rect x={56} y={12} width={48} height={9} rx={1.5} fill={INK} />
      <Photo x={56} y={26} w={48} h={30} />
      <Lines x={56} y={62} w={48} n={3} gap={6} />
      <rect x={56} y={82} width={26} height={7} rx={2} fill={ACC} />
    </g>
  ),
  "poster-maker": () => (
    <g>
      <Sheet x={46} y={4} w={68} h={92} r={3} fill={ACC_WASH} />
      <circle cx={80} cy={40} r={22} fill={ACC} {...S} />
      <rect x={54} y={68} width={52} height={8} rx={1.5} fill={INK} />
      <rect x={62} y={80} width={36} height={4} rx={2} fill={LINE} />
    </g>
  ),
  "social-image-maker": () => (
    <g>
      <rect x={10} y={20} width={86} height={48} rx={4} fill={SOFT} {...S} />
      <rect x={14} y={24} width={30} height={5} rx={2} fill={INK} />
      <Sheet x={58} y={32} w={60} h={60} r={5} />
      <Photo x={62} y={36} w={52} h={32} r={3} />
      <Lines x={62} y={74} w={52} n={2} gap={6} />
      <circle cx={134} cy={30} r={9} fill={ACC} {...S} />
    </g>
  ),
  "pitch-deck": () => (
    <g>
      <Sheet x={26} y={8} w={108} h={64} r={4} />
      <rect x={34} y={16} width={52} height={7} rx={1.5} fill={INK} />
      <Lines x={34} y={30} w={46} n={3} gap={6} />
      <rect x={96} y={40} width={8} height={24} fill={ACC} />
      <rect x={107} y={30} width={8} height={34} fill={ACC_WASH} {...S} strokeWidth={1} />
      <rect x={118} y={46} width={8} height={18} fill={ACC} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={34 + i * 24} y={78} width={20} height={13} rx={2} fill={i === 0 ? ACC_WASH : PAPER} {...S} strokeWidth={1} />
      ))}
    </g>
  ),
  "compress-image": () => (
    <g>
      <Photo x={8} y={14} w={74} h={50} />
      <Arrow x1={86} y1={39} x2={104} y2={39} />
      <Photo x={110} y={26} w={40} h={27} />
      <rect x={8} y={76} width={74} height={6} rx={3} fill={INK} />
      <rect x={110} y={76} width={22} height={6} rx={3} fill={ACC} {...S} strokeWidth={1} />
    </g>
  ),
  "convert-image": () => <Convert from="JPG" to="WEBP" />,
  "png-to-webp": () => <Convert from="PNG" to="WEBP" />,
  "svg-to-png": () => <Convert from="SVG" to="PNG" />,
  "heic-to-jpg": () => <Convert from="HEIC" to="JPG" />,
  "resize-image": () => (
    <g>
      <rect x={14} y={10} width={132} height={80} rx={3} fill="none" stroke={LINE} strokeWidth={1.4} strokeDasharray="4 4" />
      <Photo x={34} y={28} w={76} h={50} />
      <Arrow x1={116} y1={84} x2={142} y2={84} />
      <Arrow x1={142} y1={84} x2={116} y2={84} />
      <Arrow x1={20} y1={78} x2={20} y2={16} />
      <Arrow x1={20} y1={16} x2={20} y2={78} />
    </g>
  ),
  "crop-image": () => (
    <g>
      <Photo x={14} y={10} w={132} h={80} />
      <rect x={40} y={26} width={80} height={48} fill="none" stroke={PAPER} strokeWidth={2} />
      {[
        [40, 26, 1, 1],
        [120, 26, -1, 1],
        [40, 74, 1, -1],
        [120, 74, -1, -1],
      ].map(([cx, cy, sx, sy], i) => (
        <path key={i} d={`M${cx} ${cy + 10 * sy}V${cy}H${cx + 10 * sx}`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      ))}
    </g>
  ),
  "rounded-image": () => (
    <g>
      <Photo x={30} y={12} w={100} h={72} r={24} />
      <path d="M30 40V36a24 24 0 0 1 24-24h4" fill="none" stroke={ACC} strokeWidth={3.2} strokeLinecap="round" />
    </g>
  ),
  "favicon-generator": () => (
    <g>
      <Sheet x={10} y={14} w={140} h={36} r={5} />
      <path d="M10 28h140" stroke={INK} strokeWidth={1.4} />
      <rect x={18} y={19} width={44} height={14} rx={4} fill={ACC_WASH} {...S} strokeWidth={1} />
      <rect x={22} y={22} width={8} height={8} rx={2} fill={ACC} />
      <Lines x={34} y={25.5} w={22} n={1} />
      <rect x={20} y={62} width={14} height={14} rx={3} fill={ACC} {...S} />
      <rect x={48} y={58} width={22} height={22} rx={4} fill={ACC} {...S} />
      <rect x={84} y={52} width={34} height={34} rx={6} fill={ACC} {...S} />
    </g>
  ),
  "remove-background": () => (
    <g>
      {Array.from({ length: 6 * 4 }, (_, i) => (
        <rect key={i} x={30 + (i % 6) * 17} y={10 + Math.floor(i / 6) * 20} width={17} height={20} fill={(i + Math.floor(i / 6)) % 2 ? SOFT : PAPER} />
      ))}
      <rect x={30} y={10} width={102} height={80} rx={3} fill="none" {...S} />
      <circle cx={81} cy={38} r={13} fill={ACC} {...S} />
      <path d="M53 90c0-16 12-26 28-26s28 10 28 26Z" fill={ACC} {...S} />
    </g>
  ),
  "images-to-pdf": () => (
    <g>
      <Photo x={10} y={12} w={36} h={26} />
      <Photo x={10} y={44} w={36} h={26} />
      <Arrow x1={54} y1={42} x2={78} y2={42} />
      <Stack x={88} y={22} w={50} h={64} />
      <Tag x={118} y={90}>PDF</Tag>
    </g>
  ),
  "jpg-to-pdf": () => (
    <g>
      <Photo x={14} y={26} w={46} h={34} />
      <Tag x={37} y={72}>JPG</Tag>
      <Arrow x1={68} y1={43} x2={92} y2={43} />
      <Stack x={102} y={22} w={44} h={60} n={2} />
      <Tag x={124} y={90}>PDF</Tag>
    </g>
  ),
  "merge-pdf": () => (
    <g>
      <Sheet x={12} y={12} w={36} h={46} />
      <Lines x={17} y={20} w={26} n={3} gap={6} />
      <Sheet x={12} y={44} w={36} h={46} />
      <Lines x={17} y={52} w={26} n={3} gap={6} />
      <Arrow x1={56} y1={52} x2={84} y2={52} />
      <Stack x={96} y={24} w={48} h={62} n={4} />
    </g>
  ),
  "split-pdf": () => (
    <g>
      <Stack x={12} y={26} w={44} h={60} n={4} />
      <Arrow x1={64} y1={52} x2={82} y2={52} />
      <Sheet x={92} y={10} w={28} h={36} />
      <Lines x={96} y={17} w={20} n={2} gap={6} />
      <Sheet x={124} y={10} w={28} h={36} />
      <Sheet x={92} y={54} w={28} h={36} />
      <Lines x={96} y={61} w={20} n={2} gap={6} />
      <Sheet x={124} y={54} w={28} h={36} fill={ACC_WASH} />
    </g>
  ),
  "organize-pdf": () => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Sheet x={14 + i * 46} y={20} w={34} h={46} fill={i === 1 ? ACC_WASH : PAPER} />
          <Lines x={19 + i * 46} y={28} w={24} n={3} gap={6} />
          <text x={31 + i * 46} y={82} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={9} fontWeight={700} fill={INK}>
            {i + 1}
          </text>
        </g>
      ))}
      <path d="M48 12c10-8 30-8 40 0" fill="none" {...S} />
      <path d="M84 8l5 4-6 2" fill="none" {...S} />
    </g>
  ),
  "pdf-to-image": () => (
    <g>
      <Sheet x={14} y={12} w={44} h={62} />
      <Lines x={20} y={20} w={32} n={4} gap={7} />
      <Arrow x1={64} y1={43} x2={88} y2={43} />
      <Photo x={96} y={24} w={50} h={38} />
      <Tag x={121} y={78}>PNG</Tag>
    </g>
  ),
  "pdf-to-jpg": () => (
    <g>
      <Sheet x={14} y={12} w={44} h={62} />
      <Lines x={20} y={20} w={32} n={4} gap={7} />
      <Arrow x1={64} y1={43} x2={88} y2={43} />
      <Photo x={96} y={24} w={50} h={38} />
      <Tag x={121} y={78}>JPG</Tag>
    </g>
  ),
  "stamp-pdf": () => (
    <g>
      <Sheet x={44} y={6} w={72} h={88} />
      <Lines x={52} y={16} w={56} n={5} gap={7} />
      <g transform="rotate(-14 90 66)">
        <rect x={62} y={52} width={56} height={26} rx={4} fill="none" stroke={ACC} strokeWidth={3} />
        <text x={90} y={69} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={11} fontWeight={800} fill={ACC} stroke={INK} strokeWidth={0.4}>
          STAMP
        </text>
      </g>
    </g>
  ),
  "invoice-generator": () => <Document x={44} y={6} w={72} h={88} title="INVOICE" />,
  "quote-generator": () => <Document x={44} y={6} w={72} h={88} title="QUOTE" />,
  "receipt-generator": () => (
    <g>
      <path d="M52 6h56v84l-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4-4-3Z" fill={PAPER} {...S} />
      <rect x={60} y={14} width={22} height={6} rx={1.5} fill={ACC} />
      <Lines x={60} y={28} w={40} n={5} gap={7} ws={[1, 0.7, 0.9, 0.6, 0.8]} />
      <rect x={60} y={68} width={40} height={7} rx={2} fill={ACC_WASH} {...S} strokeWidth={1} />
    </g>
  ),
  "model-viewer": () => (
    <g>
      <path d="M14 70l40-20h52l40 20-40 20H54Z" fill={SOFT} {...S} />
      <path d="M62 50l18-30 18 30-18 12Z" fill="none" />
      <path d="M62 56l18-9 18 9v-22l-18-9-18 9Z" fill={ACC_WASH} {...S} />
      <path d="M62 34l18 9 18-9M80 43v22" fill="none" {...S} />
      <path d="M104 34v22" stroke={ACC} strokeWidth={2} />
      <path d="M100 34h8M100 56h8" stroke={INK} strokeWidth={1.2} />
    </g>
  ),
  "print-cost-calculator": () => (
    <g>
      <Sheet x={44} y={6} w={72} h={88} r={5} />
      <rect x={52} y={14} width={56} height={18} rx={3} fill={ACC_WASH} {...S} strokeWidth={1.1} />
      <text x={102} y={27} textAnchor="end" fontFamily="ui-monospace, monospace" fontSize={11} fontWeight={800} fill={INK}>
        $
      </text>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={52 + (i % 3) * 20} y={40 + Math.floor(i / 3) * 12} width={16} height={8} rx={2} fill={i === 11 ? ACC : SOFT} />
      ))}
    </g>
  ),
  "filament-calculator": () => (
    <g>
      <circle cx={62} cy={50} r={34} fill={ACC_WASH} {...S} />
      <circle cx={62} cy={50} r={22} fill="none" stroke={ACC} strokeWidth={5} />
      <circle cx={62} cy={50} r={9} fill={PAPER} {...S} />
      <path d="M96 50c16 0 18 22 34 22h22" fill="none" stroke={ACC} strokeWidth={5} strokeLinecap="round" />
      <path d="M98 82h52M98 78v8M150 78v8" stroke={INK} strokeWidth={1.2} />
    </g>
  ),
  "tolerance-calculator": () => (
    <g>
      <rect x={14} y={30} width={50} height={40} rx={4} fill={SOFT} {...S} />
      <circle cx={39} cy={50} r={14} fill={PAPER} {...S} />
      <circle cx={112} cy={50} r={22} fill={SOFT} {...S} />
      <circle cx={112} cy={50} r={13} fill={ACC} {...S} />
      <path d="M126 50h16" stroke={ACC} strokeWidth={3} />
      <path d="M126 44v12M142 44v12" stroke={INK} strokeWidth={1.2} />
    </g>
  ),
  "nozzle-layer-guide": () => (
    <g>
      <path d="M62 8h36v14l-12 16h-12L62 22Z" fill={ACC} {...S} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={24} y={52 + i * 9} width={112} height={7} rx={3.5} fill={i === 0 ? ACC_WASH : SOFT} {...S} strokeWidth={1} />
      ))}
      <path d="M142 52v16M138 52h8M138 68h8" stroke={INK} strokeWidth={1.2} />
    </g>
  ),
  "unit-converter": () => <Ruler />,
};

/** The slugs that have a preview: every tool in the catalogue. */
export const PREVIEW_SLUGS = Object.keys(SCENES);

/** Size is the CSS box's job; the picture scales to it. */
export default function ToolPreview({ slug, accent, className = "tool-preview" }: { slug: string; accent?: string; className?: string }) {
  const scene = SCENES[slug];
  if (!scene) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 160 100"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      style={accent ? ({ ["--accent" as string]: accent } as CSSProperties) : undefined}
    >
      {scene()}
    </svg>
  );
}
