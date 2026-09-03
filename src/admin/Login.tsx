import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, Eye, EyeOff, Loader2, ChevronLeft, ArrowRight, Mail, KeyRound, CheckCircle2 } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot password state
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      // We no longer store the token in localStorage to prevent XSS.
      // The backend now securely sends it as an HTTP-only cookie.
      localStorage.setItem('uc_admin_user', data.username);
      navigate('/uclaptop/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setSuccessMsg(data.message);
      setForgotStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');
      
      setResetToken(data.resetToken);
      setSuccessMsg(data.message);
      setForgotStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      
      setSuccessMsg('Password updated! You can now login.');
      setTimeout(() => {
        setForgotPasswordView(false);
        setForgotStep(1);
        setOtp('');
        setNewPassword('');
        setSuccessMsg('');
        setPassword('');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setForgotPasswordView(false);
    setForgotStep(1);
    setOtp('');
    setNewPassword('');
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:grid lg:grid-cols-12 overflow-hidden relative font-sans">
      {/* Background fluid light decorations */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[40%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Column: Form Area (Pure Clean Professional White) */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-12 relative z-10 h-full bg-white border-r border-slate-200/80 shadow-xl shadow-slate-100 overflow-y-auto">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (forgotPasswordView) resetFlow();
              else navigate('/');
            }}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors uppercase font-black tracking-widest group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {forgotPasswordView ? 'Back to Login' : 'Back to home'}
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-blue-50 text-blue-600 border border-blue-100 px-3.5 py-1 rounded-full">
            SYSTEM AUTH
          </span>
        </div>

        {/* Center Card Container */}
        <div className="my-auto py-6 max-w-sm w-full mx-auto">
          
          {/* Logo Brand Header with /logo.png */}
          <div className="flex items-center mb-8">
            <img 
              src="/logo.png" 
              alt="Universal Computers Logo" 
              className="h-14 w-auto max-w-[280px] object-contain drop-shadow-sm" 
            />
          </div>

          <AnimatePresence mode="wait">
            {!forgotPasswordView ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black mb-2 uppercase tracking-wide text-slate-900 leading-none">
                  Control <span className="text-blue-600 italic">Portal.</span>
                </h2>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                  Please sign in with your administrator credentials to customize products, stock gallery, and site pages.
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl p-4 mb-5 font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    {error}
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-2xl p-4 mb-5 font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {successMsg}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block">Administrator Username</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        placeholder="admin"
                        className="w-full bg-[#F8FAFC] border border-slate-200 group-hover:border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block">Security Keyphrase</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full bg-[#F8FAFC] border border-slate-200 group-hover:border-slate-300 rounded-2xl pl-12 pr-12 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setForgotPasswordView(true);
                          setError('');
                          setSuccessMsg('');
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Secure Access
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black mb-2 uppercase tracking-wide text-slate-900 leading-none">
                  Reset <span className="text-blue-600 italic">Access.</span>
                </h2>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                  {forgotStep === 1 && 'Generate an OTP to reset your admin password. It will be sent to the registered email.'}
                  {forgotStep === 2 && 'Enter the 6-digit OTP sent to uclaptopstore@gmail.com to verify your identity.'}
                  {forgotStep === 3 && 'Create a new password for the admin portal.'}
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl p-4 mb-5 font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    {error}
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-2xl p-4 mb-5 font-black uppercase tracking-wider flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {successMsg}
                  </motion.div>
                )}

                {forgotStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center">
                      <Mail className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-bold text-slate-600">
                        OTP will be sent to: <br/>
                        <span className="text-blue-600 text-sm">uclaptopstore@gmail.com</span>
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Generate OTP
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}

                {forgotStep === 2 && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block">6-Digit OTP</label>
                      <div className="relative group">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          type="text"
                          value={otp}
                          onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required
                          placeholder="000000"
                          className="w-full bg-[#F8FAFC] border border-slate-200 group-hover:border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold shadow-inner tracking-widest"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify OTP
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}

                {forgotStep === 3 && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2.5 block">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                          type={showPass ? 'text' : 'password'}
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          placeholder="New password (min 8 chars)"
                          className="w-full bg-[#F8FAFC] border border-slate-200 group-hover:border-slate-300 rounded-2xl pl-12 pr-12 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(v => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading || newPassword.length < 8}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          Update Password
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom copyright */}
        <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center lg:text-left mt-8">
          © {new Date().getFullYear()} UNIVERSAL COMPUTERS · PDTR
        </div>
      </div>

      {/* Right Column: Cinematic Panoramic Cover Area (No scroll, perfectly centered) */}
      <div className="hidden lg:block lg:col-span-7 relative bg-[#090b0f] select-none h-full overflow-hidden">
        {/* Aesthetic Overlay shadows and colors to match the user page accent brand colors */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-color pointer-events-none z-10" />

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1600"
            alt="Cinematic Workplace PC"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floating Ambient Info Box */}
        <div className="absolute bottom-12 left-12 z-20 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-4"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 bg-orange-50 border border-orange-200/50 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
              INTELLIGENT COMMAND CENTER
            </span>
            <h3 className="text-4xl font-black leading-none uppercase tracking-wide text-white drop-shadow-md">
              Power & <br />
              <span className="italic text-blue-400">Elegance unified.</span>
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold drop-shadow">
              Align, manage, and configure your products and real-device inventory with the click of a button in a premium suite.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
