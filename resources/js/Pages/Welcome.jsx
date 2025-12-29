export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-2xl shadow-none p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Welcome to Digital Arsip
                        </h1>
                        <p className="text-lg text-gray-600">
                            Inertia.js v2 + React is successfully configured! 🎉
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h2 className="font-semibold text-green-900 mb-2">✅ Setup Complete</h2>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Inertia.js v2 Laravel adapter installed</li>
                                <li>• React 18 configured</li>
                                <li>• Tailwind CSS ready to use</li>
                                <li>• Vite bundler configured</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h2 className="font-semibold text-blue-900 mb-2">📚 Next Steps</h2>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Create more pages in <code className="bg-blue-100 px-1 rounded">resources/js/Pages/</code></li>
                                <li>• Install shadcn/ui components</li>
                                <li>• Build your features with clean architecture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
