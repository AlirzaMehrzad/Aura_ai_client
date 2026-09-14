const TypingIndicator = () => {
  return (
    <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
      <Dot />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </div>
  );
};

type DotProps = {
  delay?: string;
};

const Dot = ({ delay }: DotProps) => (
  <div
    className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse self-start ${delay ? `[animation-delay:${delay}]` : ''}`}
  ></div>
);

export default TypingIndicator;
