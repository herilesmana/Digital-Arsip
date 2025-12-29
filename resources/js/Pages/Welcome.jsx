import { CustomButton, CustomCard, StatCard } from '@/components/ui/custom';
import { FileText, Users, FolderOpen, CheckCircle } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-[#4A7EBB] mb-4">
                        Digital Arsip
                    </h1>
                    <p className="text-xl text-neutral-600">
                        PT Asando Karya - Document Management System
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        variant="blue"
                        value="1,234"
                        label="Total Arsip"
                        icon={<FileText className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="orange"
                        value="45"
                        label="Kategori"
                        icon={<FolderOpen className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="teal"
                        value="12"
                        label="Divisi"
                        icon={<Users className="w-8 h-8" />}
                    />
                    <StatCard
                        variant="darkblue"
                        value="98%"
                        label="Completion Rate"
                        icon={<CheckCircle className="w-8 h-8" />}
                    />
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <CustomCard
                        title="✅ Setup Complete"
                        description="Inertia.js v2 + React + shadcn/ui successfully configured"
                    >
                        <ul className="space-y-2 text-neutral-700">
                            <li>• Inertia.js v2 Laravel adapter installed</li>
                            <li>• React 18 with JSX configured</li>
                            <li>• Tailwind CSS v4 ready to use</li>
                            <li>• shadcn/ui components installed</li>
                            <li>• Custom components structure ready</li>
                        </ul>
                    </CustomCard>

                    <CustomCard
                        title="📚 Custom Components"
                        description="All custom UI components are in components/ui/custom/"
                    >
                        <ul className="space-y-2 text-neutral-700">
                            <li>• <code className="bg-neutral-100 px-2 py-1 rounded">CustomButton</code> - Branded buttons</li>
                            <li>• <code className="bg-neutral-100 px-2 py-1 rounded">CustomCard</code> - Styled cards</li>
                            <li>• <code className="bg-neutral-100 px-2 py-1 rounded">StatCard</code> - Statistics display</li>
                            <li>• Follow <code className="bg-neutral-100 px-2 py-1 rounded">style_guidance_json.json</code></li>
                        </ul>
                    </CustomCard>
                </div>

                {/* Action Card */}
                <CustomCard
                    title="🎨 Design System"
                    description="Following PT Asando Karya brand guidelines"
                    footer={
                        <div className="flex gap-3">
                            <CustomButton variant="primary" size="md">
                                Get Started
                            </CustomButton>
                            <CustomButton variant="secondary" size="md">
                                View Docs
                            </CustomButton>
                            <CustomButton variant="ghost" size="md">
                                Learn More
                            </CustomButton>
                        </div>
                    }
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <div className="w-16 h-16 bg-[#4A7EBB] rounded-lg mb-2"></div>
                            <p className="text-sm text-neutral-600">Primary</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-[#F5845C] rounded-lg mb-2"></div>
                            <p className="text-sm text-neutral-600">Secondary</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-[#4CAF93] rounded-lg mb-2"></div>
                            <p className="text-sm text-neutral-600">Success</p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-[#5B9BD5] rounded-lg mb-2"></div>
                            <p className="text-sm text-neutral-600">Info</p>
                        </div>
                    </div>
                </CustomCard>
            </div>
        </div>
    );
}

