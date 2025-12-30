const TextArea = ({ label, error, className = '', rows = 4, ...props }) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label className='block text-sm font-medium text-zinc-400 mb-0.5'>{label}</label>
      )}
      <textarea
        rows={rows}
        className={`
          w-full px-4 py-2.5
          bg-zinc-950 border border-zinc-800
          rounded-lg text-zinc-200
          placeholder:text-zinc-600
          transition-colors duration-200
          resize-y min-h-[100px]
          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
              : ''
          }
          ${className}
        `}
        {...props}
      />
      {error && <span className='text-xs text-red-400 mt-1'>{error}</span>}
    </div>
  );
};

export default TextArea;
