// /utils/WaterDrop.js

export default function WaterDrop({ children }: React.PropsWithChildren<{}>) {
  const getRandomBorderRadius = () => {
    const getRandomPercentage = () =>
      `${Math.floor(Math.random() * (70 - 35 + 1) + 35)}%`;
    return `${getRandomPercentage()} ${getRandomPercentage()} ${getRandomPercentage()} ${getRandomPercentage()} / ${getRandomPercentage()} ${getRandomPercentage()} ${getRandomPercentage()} ${getRandomPercentage()}`;
  };

  return (
      <div
        className="w-full max-w-72 aspect-square flex justify-center items-center shadow-[inset_20px_20px_20px_rgba(0,0,0,.05),25px_35px_20px_rgba(0,0,0,.05),25px_30px_30px_rgba(0,0,0,.05),inset_-20px_-20px_25px_rgba(255,255,255,.9)] dark:shadow-[inset_20px_20px_20px_rgba(255,255,255,.05),25px_35px_20px_rgba(255,255,255,.05),25px_30px_30px_rgba(255,255,255,.05),inset_-20px_-20px_25px_rgba(0,0,0,.9)] hover:rounded-full! transition-all duration-700"
        style={{ borderRadius: getRandomBorderRadius() }}
      >
        {children}
      </div>
  );
};
