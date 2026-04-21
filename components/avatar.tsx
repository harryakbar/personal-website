import Image from "next/image";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        <Image
          src={picture}
          className="rounded-full"
          height={48}
          width={48}
          alt={name}
          priority={false}
        />
      </div>
      <div className="text-sm font-semibold text-neutral-800">{name}</div>
    </div>
  );
};

export default Avatar;
