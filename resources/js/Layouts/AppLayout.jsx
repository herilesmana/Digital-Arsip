import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { CustomSidebar } from '@/components/ui/custom/CustomSidebar';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * AppLayout - Layout utama dengan sidebar
 * Digunakan untuk semua halaman authenticated
 * 
 * @param {Object} props
 * @param {Object} props.auth - Data authentication
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title untuk breadcrumb
 * @param {Array} props.breadcrumbs - Breadcrumb items (opsional)
 */
export default function AppLayout({ auth, children, title, breadcrumbs = [] }) {
    return (
        <SidebarProvider>
            <CustomSidebar user={auth.user} />
            <SidebarInset>
                {/* Header dengan breadcrumb */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-6" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={route('dashboard')} className="text-neutral-600 hover:text-[#4A7EBB]">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {breadcrumbs.length > 0 && (
                                <>
                                    {breadcrumbs.map((crumb, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {index === breadcrumbs.length - 1 ? (
                                                    <BreadcrumbPage className="text-neutral-900 font-medium">
                                                        {crumb.label}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={crumb.href} className="text-neutral-600 hover:text-[#4A7EBB]">
                                                        {crumb.label}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </div>
                                    ))}
                                </>
                            )}
                            {breadcrumbs.length === 0 && title && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-neutral-900 font-medium">
                                            {title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-[#F5F5F5] p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
