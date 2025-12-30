import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className='block text-sm font-medium text-zinc-400 mb-1.5'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type={inputType}
          className={`w-full px-4 py-2.5 bg-zinc-950 border rounded-lg text-zinc-200 transition-colors
            ${error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
            } outline-none placeholder:text-zinc-600 ${isPassword ? 'pr-10' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors'
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
      {error && (
        <span className='text-xs text-red-400 mt-1 block'>{error}</span>
      )}
    </div>
  );
};

export default Input;
