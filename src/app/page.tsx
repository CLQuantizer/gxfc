'use client';
import { Button } from "@/components/ui/button";

const handleClicked = (input:string) => {
  alert(input);
}

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-2 gap-2 ">
      <Button className="w-full" onClick={async () => handleClicked("nothing")} >
        Click me for nothing</Button>
        <div className="grid grid-cols-2">
          <img className="w-64" src="/hand.jpg" alt="hand" />
          <img className="w-64" src="/gxfc.jpg" alt="hand" />
        </div>
        <Button className="w-full" onClick={async () => handleClicked("than kyou")} >
          Click me to thank you</Button>
    </div>
  );
}
