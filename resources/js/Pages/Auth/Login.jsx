import { LoginForm } from '@/components/ui/custom/LoginForm';

/**
 * Login Page
 * Halaman login untuk Digital Arsip
 */
export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EBF2FA] to-[#D7E5F5] flex items-center justify-center p-6">
            <LoginForm />
        </div>
    );
}
