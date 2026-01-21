type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return (
    <div className={`container mx-auto max-w-3xl py-12 px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
