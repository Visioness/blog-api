import { AlertCircle } from 'lucide-react';

const FormError = ({ error }) => {
  if (!error) return null;

  // Split error message by '--' delimiter if present
  const errorMessages = error.split('--').map((msg) => msg.trim()).filter(Boolean);

  if (errorMessages.length === 0) return null;

  return (
    <div className='p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-fade-in'>
      <div className='flex items-start gap-2'>
        <AlertCircle size={16} className='mt-0.5 shrink-0' />
        <div className='flex-1 space-y-1'>
          {errorMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormError;

