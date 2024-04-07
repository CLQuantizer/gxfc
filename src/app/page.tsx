'use client';
import { Button } from "@/components/ui/button";

const handleClicked = (input:string) => {
  alert(input);
}

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-2 gap-2 p-2">
      <Button className="w-full" onClick={async () => handleClicked("Hello, here is my most sincere greeting!")} >
        Click me to get greeted</Button>
        <div className="grid m:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((x, i) =>
          <img src={i+".jpg"} alt="gong xi fa cai" className="p-0.5 rounded" key={i} />
  )}
        </div>
        <Button className="w-full" onClick={async () => handleClicked("Than kyou! You have now been deeply thanked!")} >
          Click me to thank you</Button>
          <div className="text-center opacity-30">TradAesthetics Inc. 2024</div>
    </div>
  );
}
