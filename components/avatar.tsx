type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture: _picture }: Props) => {
  return (
    <div className="flex items-center">
      <div className="text-sm font-semibold text-neutral-800">{name}</div>
    </div>
  );
};

export default Avatar;
