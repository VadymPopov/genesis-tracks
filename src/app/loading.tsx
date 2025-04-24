import { ScaleLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
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
