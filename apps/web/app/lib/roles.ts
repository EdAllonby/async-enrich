export interface RoleConfig {
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  bgGradient: string;
}

export const ROLES: Record<string, RoleConfig> = {
  developer: {
    name: "Developer",
    emoji: "👨‍💻",
    color: "indigo",
    gradient: "from-indigo-400 to-blue-500",
    bgGradient: "from-[#0f0f23] via-[#1a1a2e] to-[#16213e]",
  },
  designer: {
    name: "Designer",
    emoji: "🎨",
    color: "pink",
    gradient: "from-pink-400 to-rose-500",
    bgGradient: "from-[#230f1a] via-[#2e1a24] to-[#3e1629]",
  },
  "product manager": {
    name: "Product Manager",
    emoji: "📊",
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-[#231a0f] via-[#2e241a] to-[#3e2916]",
  },
  "devops engineer": {
    name: "DevOps Engineer",
    emoji: "🔧",
    color: "cyan",
    gradient: "from-cyan-400 to-teal-500",
    bgGradient: "from-[#0f1f23] via-[#1a2a2e] to-[#16333e]",
  },
  "qa engineer": {
    name: "QA Engineer",
    emoji: "🔍",
    color: "violet",
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-[#1a0f23] via-[#241a2e] to-[#29163e]",
  },
  "data scientist": {
    name: "Data Scientist",
    emoji: "📈",
    color: "emerald",
    gradient: "from-emerald-400 to-green-500",
    bgGradient: "from-[#0f1f0f] via-[#1a2e1a] to-[#163e16]",
  },
  "frontend engineer": {
    name: "Frontend Engineer",
    emoji: "🖥️",
    color: "sky",
    gradient: "from-sky-400 to-blue-500",
    bgGradient: "from-[#0f1923] via-[#1a242e] to-[#16293e]",
  },
  "backend engineer": {
    name: "Backend Engineer",
    emoji: "⚙️",
    color: "slate",
    gradient: "from-slate-400 to-gray-500",
    bgGradient: "from-[#14141f] via-[#1f1f2a] to-[#1a1a35]",
  },
  "full stack developer": {
    name: "Full Stack Developer",
    emoji: "🚀",
    color: "orange",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-[#231410] via-[#2e1f1a] to-[#3e2216]",
  },
  "engineering manager": {
    name: "Engineering Manager",
    emoji: "👔",
    color: "yellow",
    gradient: "from-yellow-400 to-amber-500",
    bgGradient: "from-[#23200f] via-[#2e2a1a] to-[#3e3316]",
  },
};

export const ROLE_LIST = Object.values(ROLES);

export function getRoleConfig(role: string): RoleConfig | undefined {
  return ROLES[role.toLowerCase()];
}

export function formatRoleName(role: string): string {
  return role
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

