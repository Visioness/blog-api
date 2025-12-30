const Card = ({
  children,
  hover = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden ${
        hover ? 'transition-all duration-200 hover:border-emerald-500/50 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-emerald-900/10' : ''
      } ${className}`}
      {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-zinc-800/50 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-zinc-900/50 border-t border-zinc-800/50 flex items-center justify-between text-zinc-400 text-sm ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
