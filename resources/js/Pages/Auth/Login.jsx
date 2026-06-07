import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { Icon } from '@/Components/Icon';

export default function Login({ canResetPassword, status }) {
    const { props } = usePage();
    const appSettings = props.global?.app_settings || {};
    const appName = appSettings.app_name || 'Lagan Studio';
    const logoPath = appSettings.logo_path || null;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A0A0A]">
            <Head title={`Log in | ${appName}`} />

            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
                    alt="Cinematic Background"
                    className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
            </div>

            {/* Login Card */}
            <div className="z-10 w-full max-w-xl px-6 py-12">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl p-8 sm:p-8 relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>

                    {/* Branding */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center mb-6">
                            {logoPath ? (
                                <img src={logoPath} alt={appName} className="h-16 w-auto max-w-[200px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                    <span className="text-2xl font-black text-white">{appName.substring(0, 1).toUpperCase()}</span>
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Access your administrative dashboard</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Icon name="feather__mail" className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all backdrop-blur-sm sm:text-sm"
                                    placeholder="Enter your email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-[11px] font-bold text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-widest">
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Icon name="feather__lock" className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all backdrop-blur-sm sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
                                >
                                    <Icon name={showPassword ? "feather__eyeOff" : "feather__eye"} className="h-4 w-4" />
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
                        </div>

                        <div className="flex items-center ml-1">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="peer w-5 h-5 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 transition-all cursor-pointer"
                                    />
                                </div>
                                <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me for 30 days</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-black text-black bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-[#0A0A0A] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-widest mt-8"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} {appName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
