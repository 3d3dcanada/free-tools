import {
  Rocket, Target, TrendingUp, Users, Lightbulb, ShieldCheck, Zap, Globe, Heart, Star, Award, Briefcase,
  ChartColumn, ChartPie, Clock, Calendar, Mail, MapPin, Phone, Check, CircleCheck, Sparkles, Layers, Cpu,
  Leaf, Wrench, Package, Truck, Store, Coins, Wallet, Handshake, MessageCircle, Megaphone, Flag, Compass,
  Gauge, Lock, Cloud, Code, Smartphone, Monitor, Camera, Palette, PenTool, BookOpen, GraduationCap,
  Building2, House, Factory, Recycle, Sun, Mountain, Anchor, Plane, Car, Bike, Music, Gift, Coffee, Puzzle,
  Search, Settings, ThumbsUp, Trophy, Gem, Crown, Infinity as InfinityIcon, ArrowRight, ArrowUpRight, Repeat,
  Hourglass, Timer, Map, Database, Server, Bot, Brain, Microscope, FlaskConical, Hammer, Ruler, Printer,
  Box, Boxes, Shirt, Utensils, Stethoscope, Scale, Banknote, Receipt, PiggyBank, BadgeCheck, Quote, Play,
} from "lucide";

type Node = [string, Record<string, string | number>][];

/** Lucide icon nodes to inner SVG markup (24 x 24 viewBox, stroke-based). */
export function nodeToPaths(node: Node): string {
  return node
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, "&quot;")}"`)
          .join(" ")}/>`,
    )
    .join("");
}

export const CURATED: Record<string, Node> = {
  rocket: Rocket, target: Target, "trending-up": TrendingUp, users: Users, lightbulb: Lightbulb,
  "shield-check": ShieldCheck, zap: Zap, globe: Globe, heart: Heart, star: Star, award: Award,
  briefcase: Briefcase, "chart-column": ChartColumn, "chart-pie": ChartPie, clock: Clock, calendar: Calendar,
  mail: Mail, "map-pin": MapPin, phone: Phone, check: Check, "circle-check": CircleCheck, sparkles: Sparkles,
  layers: Layers, cpu: Cpu, leaf: Leaf, wrench: Wrench, package: Package, truck: Truck, store: Store,
  coins: Coins, wallet: Wallet, handshake: Handshake, "message-circle": MessageCircle, megaphone: Megaphone,
  flag: Flag, compass: Compass, gauge: Gauge, lock: Lock, cloud: Cloud, code: Code, smartphone: Smartphone,
  monitor: Monitor, camera: Camera, palette: Palette, "pen-tool": PenTool, "book-open": BookOpen,
  "graduation-cap": GraduationCap, "building-2": Building2, house: House, factory: Factory, recycle: Recycle,
  sun: Sun, mountain: Mountain, anchor: Anchor, plane: Plane, car: Car, bike: Bike, music: Music, gift: Gift,
  coffee: Coffee, puzzle: Puzzle, search: Search, settings: Settings, "thumbs-up": ThumbsUp, trophy: Trophy,
  gem: Gem, crown: Crown, infinity: InfinityIcon, "arrow-right": ArrowRight, "arrow-up-right": ArrowUpRight,
  repeat: Repeat, hourglass: Hourglass, timer: Timer, map: Map, database: Database, server: Server, bot: Bot,
  brain: Brain, microscope: Microscope, "flask-conical": FlaskConical, hammer: Hammer, ruler: Ruler,
  printer: Printer, box: Box, boxes: Boxes, shirt: Shirt, utensils: Utensils, stethoscope: Stethoscope,
  scale: Scale, banknote: Banknote, receipt: Receipt, "piggy-bank": PiggyBank, "badge-check": BadgeCheck,
  quote: Quote, play: Play,
} as unknown as Record<string, Node>;

export const iconPaths = (name: string) => nodeToPaths(CURATED[name] ?? CURATED.sparkles);

/** The whole library (2,000+ icons), loaded only when someone searches the picker. */
export async function loadAllIcons(): Promise<{ name: string; paths: string }[]> {
  const { icons } = (await import("lucide")) as unknown as { icons: Record<string, Node> };
  return Object.entries(icons).map(([key, node]) => ({
    name: key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase(),
    paths: nodeToPaths(node),
  }));
}

export const iconSvg = (paths: string, color: string, strokeW = 2, size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
