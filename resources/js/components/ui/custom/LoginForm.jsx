import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { CustomButton, CustomCard } from '@/components/ui/custom';
import { CustomInput } from '@/components/ui/custom/CustomInput';
import { LogIn, User, Lock } from 'lucide-react';

/**
 * LoginForm - Form login dengan design system Digital Arsip
 * Menggunakan Inertia.js untuk handling form submission
 */
export function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {
                // Reset password field on finish (success or error)
                setData('password', '');
            },
        });
    };

    return (
        <CustomCard
            className="w-full max-w-md"
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-[#4A7EBB] rounded-full flex items-center justify-center">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Digital Arsip
                    </h1>
                    <p className="text-sm text-neutral-600">
                        PT Asando Karya - Document Management System
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username Field */}
                    <CustomInput
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        error={errors.username}
                        required
                        autoFocus
                    />

                    {/* Password Field */}
                    <CustomInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                    />

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 text-[#4A7EBB] border-neutral-300 rounded focus:ring-[#4A7EBB] focus:ring-2"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm text-neutral-700"
                        >
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <CustomButton
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </CustomButton>
                </form>

                {/* Footer */}
                <div className="text-center text-sm text-neutral-600">
                    <p>Default credentials: admin / password</p>
                </div>
            </div>
        </CustomCard>
    );
}
