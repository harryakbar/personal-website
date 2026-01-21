import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-balance">
      {children}
    </h1>
  );
};

export default PostTitle;
