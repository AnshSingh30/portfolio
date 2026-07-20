import type { ComponentType } from 'react';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiDart,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiFlask,
  SiFastapi,
  SiSqlalchemy,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGit,
  SiLinux,
  SiReact,
  SiFlutter,
  SiHuggingface,
  SiLangchain,
  SiAnthropic,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import {
  Sparkles,
  Layers,
  DatabaseZap,
  MessageSquareText,
  Network,
  Wrench,
  BrainCircuit,
  CircleGauge,
  ChartNetwork,
  SlidersHorizontal,
  Database,
  KeyRound,
  Users,
  ShieldCheck,
  Radio,
  Zap,
  GitBranch,
  Boxes,
  Cpu,
  Wifi,
  RefreshCw,
  Globe,
  ScanSearch,
} from 'lucide-react';

export interface SkillIconEntry {
  // `size` is `string | number` (not just `number`) to match lucide-react's prop type —
  // react-icons' IconType only ever receives a number from this file, so it's compatible.
  Icon: ComponentType<{ size?: string | number; color?: string; className?: string }>;
  color: string;
  /** True for a verified real product/brand logo; false for a generic stand-in icon. */
  isBrand: boolean;
}

// Brand colors are sourced from Simple Icons' published palette (simple-icons/simple-icons),
// not guessed. Three brand marks (Anthropic #191919, pandas #150458, JSON Web Tokens #000000)
// publish a near-black logo (perceptual luma < 30) that would be invisible against this
// site's near-black (#0b0908) background — those render in the site's off-white instead.
// Fallback icons (no real product logo exists — concepts like "Prompt Engineering" or "DSA")
// use the skill's hub accent color rather than an invented "brand" color, so real logos
// visually stand out from generic stand-ins.
export const SKILL_ICONS: Record<string, SkillIconEntry> = {
  // Agentic AI & LLMs
  'LangChain': { Icon: SiLangchain, color: '#7FC8FF', isBrand: true },
  'LlamaIndex': { Icon: Layers, color: '#d97a4f', isBrand: false },
  'OpenAI API': { Icon: Sparkles, color: '#d97a4f', isBrand: false },
  'Anthropic API': { Icon: SiAnthropic, color: '#f3eee3', isBrand: true },
  'Hugging Face': { Icon: SiHuggingface, color: '#FFD21E', isBrand: true },
  'RAG Pipelines': { Icon: DatabaseZap, color: '#d97a4f', isBrand: false },
  'Prompt Engineering': { Icon: MessageSquareText, color: '#d97a4f', isBrand: false },
  'Multi-Agent Orchestration': { Icon: Network, color: '#d97a4f', isBrand: false },
  'Tool Use': { Icon: Wrench, color: '#d97a4f', isBrand: false },
  'Memory Components': { Icon: BrainCircuit, color: '#d97a4f', isBrand: false },
  'Model Evaluation': { Icon: CircleGauge, color: '#d97a4f', isBrand: false },

  // Languages
  'Python (Expert)': { Icon: SiPython, color: '#3776AB', isBrand: true },
  'C++': { Icon: SiCplusplus, color: '#00599C', isBrand: true },
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E', isBrand: true },
  'SQL': { Icon: Database, color: '#b83232', isBrand: false },
  'Dart': { Icon: SiDart, color: '#0175C2', isBrand: true },

  // ML / Deep Learning
  'PyTorch': { Icon: SiPytorch, color: '#EE4C2C', isBrand: true },
  'TensorFlow': { Icon: SiTensorflow, color: '#FF6F00', isBrand: true },
  'scikit-learn': { Icon: SiScikitlearn, color: '#F7931E', isBrand: true },
  'CNN': { Icon: ChartNetwork, color: '#d97a4f', isBrand: false },
  'Feature Engineering': { Icon: SlidersHorizontal, color: '#d97a4f', isBrand: false },
  'NumPy': { Icon: SiNumpy, color: '#013243', isBrand: true },
  'Pandas': { Icon: SiPandas, color: '#f3eee3', isBrand: true },

  // Backend & APIs
  'Flask': { Icon: SiFlask, color: '#3BABC3', isBrand: true },
  'FastAPI': { Icon: SiFastapi, color: '#009688', isBrand: true },
  'REST APIs': { Icon: Globe, color: '#8b8175', isBrand: false },
  'SQLAlchemy': { Icon: SiSqlalchemy, color: '#D71F00', isBrand: true },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1', isBrand: true },
  'Supabase': { Icon: SiSupabase, color: '#3FCF8E', isBrand: true },
  'FAISS / Vector Search': { Icon: ScanSearch, color: '#8b8175', isBrand: false },

  // Cloud & Infra
  'AWS (ECS/EC2/S3)': { Icon: FaAws, color: '#FF9900', isBrand: true },
  'Docker': { Icon: SiDocker, color: '#2496ED', isBrand: true },
  'Git': { Icon: SiGit, color: '#F03C2E', isBrand: true },
  'Linux': { Icon: SiLinux, color: '#FCC624', isBrand: true },
  'CI/CD': { Icon: RefreshCw, color: '#d97a4f', isBrand: false },

  // Frontend & Mobile
  'React': { Icon: SiReact, color: '#61DAFB', isBrand: true },
  'Flutter': { Icon: SiFlutter, color: '#02569B', isBrand: true },
  'WebSockets': { Icon: Radio, color: '#b83232', isBrand: false },
  'Real-time Data Sync': { Icon: Zap, color: '#b83232', isBrand: false },

  // Auth & Security
  'OAuth 2.0': { Icon: KeyRound, color: '#8b8175', isBrand: false },
  'JWT': { Icon: SiJsonwebtokens, color: '#f3eee3', isBrand: true },
  'RBAC': { Icon: Users, color: '#8b8175', isBrand: false },
  'Row-Level Security': { Icon: ShieldCheck, color: '#8b8175', isBrand: false },

  // Core CS
  'DSA': { Icon: GitBranch, color: '#8b8175', isBrand: false },
  'OOP': { Icon: Boxes, color: '#8b8175', isBrand: false },
  'OS': { Icon: Cpu, color: '#8b8175', isBrand: false },
  'DBMS': { Icon: Database, color: '#8b8175', isBrand: false },
  'Computer Networks': { Icon: Wifi, color: '#8b8175', isBrand: false },
  'SDLC/Agile': { Icon: RefreshCw, color: '#8b8175', isBrand: false },
};
