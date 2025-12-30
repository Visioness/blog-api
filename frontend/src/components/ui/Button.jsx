const Button = ({
  children,
  variant = 'empty',
  size = 'empty',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  // Base styles - common across all buttons
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer';

  // Variant styles - extracted from common link patterns
  const variants = {
    primary:
      'bg-emerald-700 text-zinc-50 hover:bg-emerald-600 border-2 border-emerald-900 hover:border-emerald-600 rounded-md',
    secondary:
      'bg-zinc-800 text-zinc-300 hover:text-zinc-200 hover:bg-zinc-700 border-2 border-zinc-700 hover:border-zinc-600 rounded-md',
    ghost:
      'text-zinc-300 hover:text-emerald-500 hover:bg-zinc-800/50 rounded-md',
    icon: 'text-emerald-700 bg-zinc-800 border-2 border-emerald-900 hover:text-emerald-400 hover:border-emerald-600 rounded-full',
    empty: '',
  };

  // Size styles
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-1',
    empty: '',
  };

  const buttonStyles = `${baseStyles} ${
    variants[variant] || variants.primary
  } ${sizes[size] || sizes.md} ${className}`;

  return (
    <button disabled={disabled || loading} className={buttonStyles} {...props}>
      {loading && (
        <svg className='animate-spin h-4 w-4' fill='none' viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
