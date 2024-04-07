'use client';
import { Button } from "@/components/ui/button";

const handleClicked = (input:string) => {
  alert(input);
}

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-2 gap-4 p-2 transition-all duration-300">
      <Button className="w-full" onClick={async () => handleClicked("Hello, here is my most sincere greeting!")} >
        Click me to get greeted</Button>
        <div className="grid m:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((x, i) => {
            // i%3!=0 or i<2
            if (i==1 || i%3 !== 0 && i>3) {
              return <img src={i+".jpg"} alt="gong xi fa cai" 
              className="animate-slow-spin hover:scale-105 p-0.5 rounded" key={i} />
          } else {
            return (
              <img src={i+".jpg"} alt="gong xi fa cai" 
              className="hover:scale-105 p-0.5 rounded-full" key={i} />
          )}
        })}
        </div>
        <Button className="w-full" onClick={async () => handleClicked("Than kyou! You have now been deeply thanked!")} >
          Click me to thank you</Button>
          <div className="text-center opacity-30">TradAesthetics Inc. © {currentYear}</div>
    </div>
  );
}