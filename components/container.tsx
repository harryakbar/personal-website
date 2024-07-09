type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-6">{children}</div>
  );
};

export default Container;
