'use client';
import {
  GaugeCircle,
  ListTodo,
  Network,
  Video,
  Calendar,
  Users,
  Cloud,
  Plus,
  Megaphone,
  LineChart,
  User,
  Server,
  Settings as SettingsIcon,
  Shield,
  ShieldCheck,
  MessagesSquare,
  Book,
  Folder,
  BarChart3,
  PieChart,
  Workflow,
  Bot,
  Plug,
  FileText,
  UserCog,
  MoreVertical,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { departments, getCurrentUser, menuItems } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import OryonLogo from '../icons/oryon-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlaceHolderImages } from '@/lib/placeholder-images';

const statusClasses: { [key: string]: string } = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  dnd: 'bg-purple-500',
  offline: 'bg-slate-500',
};

const iconMap: { [key: string]: React.ElementType } = {
  dashboard: GaugeCircle,
  tasks: ListTodo,
  projects: Network,
  meetings: Video,
  calendar: Calendar,
  team: Users,
  cloud: Cloud,
  'departments/marketing': Megaphone,
  'departments/finance': LineChart,
  'departments/hr': Users,
  'departments/it': Server,
  'departments/operations': SettingsIcon,
  'departments/compliance': Shield,
  'departments/security': ShieldCheck,
  'chat/general': MessagesSquare,
  'chat/department': Users,
  'chat/direct': MessagesSquare,
  'knowledge-base': Book,
  documents: Folder,
  reports: BarChart3,
  analytics: PieChart,
  workflows: Workflow,
  automations: Bot,
  integrations: Plug,
  'document-editor': FileText,
  profile: UserCog,
  settings: SettingsIcon,
  security: Shield,
};

const NavLink = ({ href, children, icon, badge }: { href: string; children: React.ReactNode; icon: React.ElementType; badge?: number | string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = icon;

  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center p-2 rounded-lg text-sm transition-all text-white/80 hover:bg-white/10 relative",
        isActive && "bg-primary/20 text-white font-medium"
      )}>
        <Icon className="mr-3 w-5 h-5 flex-shrink-0" />
        <span className="flex-grow">{children}</span>
        {badge && (
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};

export default function AppSidebar() {
  const currentUser = getCurrentUser();
  const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${currentUser.id}`)?.imageUrl;

  return (
    <aside className="w-64 h-full flex flex-col flex-shrink-0 gradient-surface rounded-none md:rounded-r-[1.5rem] shadow-2xl transition-all duration-300 fixed md:relative z-40 md:translate-x-0 -translate-x-full">
      <div className="p-6 flex flex-col items-start h-24 border-b border-white/10">
        <div className="flex items-center gap-2">
            <OryonLogo className="!h-8 !w-8" />
            <h1 className="text-2xl font-extrabold text-white">Oryon</h1>
        </div>
        <p className="text-xs text-white/60 mt-1">STANDARD BANK</p>
      </div>

      <nav className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-sm font-semibold mb-3 text-white/50 uppercase flex justify-between items-center">
              <span>{section.title}</span>
              {section.action && <button className="text-xs text-primary hover:text-white"><Plus className="w-4 h-4" /></button>}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const department = item.department ? departments.find(d => d.slug === item.department) : null;
                return (
                  <NavLink key={item.id} href={`/dashboard/${item.id}`} icon={iconMap[item.id] || SettingsIcon} badge={item.badge}>
                    <div className={cn("flex items-center w-full", department && `department-${department.slug} border-dept -ml-2 pl-2`)}>
                      <span className={cn(department && `text-dept`)}>{item.title}</span>
                      {item.status && <span className={cn("ml-auto h-2 w-2 rounded-full", statusClasses[item.status])}></span>}
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src={avatar} alt={currentUser.name} data-ai-hint="person portrait" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className={cn("absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-card", statusClasses[currentUser.status])} />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-white/60 truncate">{currentUser.role}</p>
          </div>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-white/10 text-white/80">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
