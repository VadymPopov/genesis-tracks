import { ScaleLoader } from 'react-spinners';

export default function Loader({ testid }: { testid: string }) {
  return (
    <div
      className="flex h-screen w-full items-center justify-center"
      data-testid={testid}
    >
      <ScaleLoader
        barCount={10}
        color="#030303"
        height={80}
        margin={1}
        radius={10}
        speedMultiplier={1.5}
        width={10}
      />
    </div>
  );
}
