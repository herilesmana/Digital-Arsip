import { router } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    FileBarChart,
    Users,
    Building2,
    LogOut,
    ChevronDown,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * CustomSidebar - Sidebar untuk Digital Arsip
 * Following PT Asando Karya design system
 * 
 * @param {Object} props
 * @param {Object} props.user - Data user yang login
 */
export function CustomSidebar({ user, ...props }) {
    // Menu items untuk sidebar
    const menuItems = [
        {
            title: 'Dashboard',
            url: 'dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Data Arsip',
            url: 'arsip.index',
            icon: FileText,
        },
        {
            title: 'Laporan',
            url: 'laporan.index',
            icon: FileBarChart,
        },
        {
            title: 'Master Pengguna',
            url: 'pengguna.index',
            icon: Users,
        },
        {
            title: 'Master Divisi',
            url: 'divisi.index',
            icon: Building2,
        },
    ];

    const handleNavigation = (routeName) => {
        router.get(route(routeName));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <Sidebar {...props}>
            {/* Header */}
            <SidebarHeader className="border-b border-neutral-200 bg-[#4A7EBB] h-16">
                <div className="flex items-center gap-3 px-4 h-full">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#4A7EBB]" />
                    </div>
                    <div className="flex-1 text-white">
                        <h2 className="text-base font-bold">Digital Arsip</h2>
                        <p className="text-xs opacity-90">PT Asando Karya</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-neutral-500 text-xs uppercase font-semibold px-4 py-2">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = route().current(item.url);

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            onClick={() => handleNavigation(item.url)}
                                            isActive={isActive}
                                            className={`
                        px-4 py-6 rounded-md transition-all duration-200
                        ${isActive
                                                    ? 'bg-[#EBF2FA] text-[#4A7EBB] font-medium'
                                                    : 'text-neutral-700 hover:bg-neutral-50'
                                                }
                      `}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-[#4A7EBB]' : 'text-neutral-500'}`} />
                                            <span className="text-sm">{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-neutral-200 bg-neutral-50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="px-4 py-3 hover:bg-neutral-100 transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-8 h-8 bg-[#4A7EBB] rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-semibold">
                                                {user?.nama?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-medium text-neutral-900">{user?.nama}</p>
                                            <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
