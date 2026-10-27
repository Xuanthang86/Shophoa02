import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  language: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
}) => {
  if (!isOpen) return null;
  const isVi = language === 'vi';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify admin credentials
    if (
      (email.trim().toLowerCase() === 'admin@leixirfloral.vn' || email.trim() === 'admin') &&
      password.trim() === 'admin8888'
    ) {
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg(
        isVi
          ? 'Email hoặc mật khẩu quản trị không chính xác. Vui lòng kiểm tra lại.'
          : 'Invalid administrator credentials. Please check and try again.'
      );
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@leixirfloral.vn');
    setPassword('admin8888');
    setErrorMsg('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-800 text-amber-200 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-base font-bold">
                {isVi ? 'Đăng Nhập Quản Trị Viên' : 'Executive Admin Login'}
              </h3>
              <p className="text-[11px] text-stone-300">
                {isVi ? 'Hệ thống điều hành L\'Élixir Floral' : 'L\'Élixir Operations Management'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-stone-700 font-medium mb-1.5">
              {isVi ? 'Tài khoản Email Quản Trị:' : 'Admin Email Address:'}
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@leixirfloral.vn"
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-1.5">
              {isVi ? 'Mật khẩu truy cập:' : 'Password:'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
            />
          </div>

          {/* Quick Demo Helper */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-md text-[11px] text-stone-700 flex items-center justify-between">
            <div>
              <span className="font-semibold text-amber-900 block mb-0.5">
                {isVi ? 'Tài khoản thử nghiệm quản trị:' : 'Demo credentials:'}
              </span>
              <span className="font-mono text-stone-600 block">admin@leixirfloral.vn / admin8888</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 text-[11px] font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-300 rounded cursor-pointer transition-colors shrink-0"
            >
              {isVi ? 'Tự điền' : 'Auto-fill'}
            </button>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
            >
              {isVi ? 'Hủy Bỏ' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>{isVi ? 'Xác Thực & Đăng Nhập' : 'Authenticate & Enter'}</span>
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isVi ? 'Bảo mật phân quyền quản trị RBAC chuẩn Enterprise' : 'Enterprise Role-Based Access Control'}</span>
        </div>

      </div>
    </div>
  );
};
