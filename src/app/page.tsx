'use client';
import { Button } from "@/components/ui/button";

const handleClicked = (input:string) => {
  alert(input);
}

const getRandomStringFromArray = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
}

// english followed by chinese
const randomGreetings = [
  "You are a wonderful person! (你是一个很棒的人!)",
  "Gong xi fa cai! (恭喜发财)",
  "Than kyou! You have now been deeply thanked! (谢谢!你现在已经被深深感谢了!)",
  "May your day be filled with joy!(๑˃̵ᴗ˂ ̵)و (愿你的一天充满快乐!)",
  "Hello, here is my most sincere greeting! (你好,这是我最真诚的问候!)",
  "Good luck! (祝你好运!)",
  "You are the best! (你是最棒的!)",
  "Hard work! (加油!)",
  "You are the most beautiful! (你是最美丽的!)"
]

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-2 gap-4 p-2 transition-all duration-300">
      <Button className="w-full" onClick={async () => handleClicked("Hello, here is my most sincere greeting!")} >
        Click me to get greeted</Button>
        <div className="grid m:grid-cols-2 lg:grid-cols-4">
          {[...Array(14)].map((x, i) => {
            // i%3!=0 or i<2
            if (i==1 || i==6) {
              return <img src={i+".jpg"} alt="gong xi fa cai" 
              onClick={async () => handleClicked(getRandomStringFromArray(randomGreetings))}
              className="animate-slow-bounce backdrop-shadow
               mt-12 hover:cursor-grab p-0.5 rounded" key={i} />
          } else {
            return (
              <img src={i+".jpg"} alt={getRandomStringFromArray(randomGreetings)}
              onClick={async () => handleClicked(getRandomStringFromArray(randomGreetings))}
              className="hover:scale-105 hover:animate-slow-bounce hover:cursor-grab p-0.5 rounded-lg" key={i} />
          )}
        })}
        </div>
        <Button className="w-full" onClick={async () => handleClicked("Than kyou! You have now been deeply thanked!")} >
          Click me to thank you</Button>
          <div className="text-center opacity-30">TradAesthetics Inc. © {currentYear}</div>
    </div>
  );
}