'use client';
import { Button } from "@/components/ui/button";

const BASE_URL = "https://hao.gongxifacai.win/";
// const BASE_URL = "http://localhost:3000/";
const messageA = "Image copied(图片已复制)";
const messageB = "Image URL copied(图片链接已复制)";

async function copyImgToClipboard(imgUrl: string) {
  const input = getRandomStringFromArray(randomGreetings);
  try {
    const data = await fetch(imgUrl);
    const blob = await data.blob();
    console.log('Image fetched, url:', imgUrl);
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    alert(input + "\n" + messageA);
  } catch (err) {
    try {
      await navigator.clipboard.writeText(imgUrl);
      alert(input + "\n" + messageB);
      console.error('Failed on image, just copying url:', err);
    } catch (e) {
      alert('Failed to copy image and url:' + e);
    }
  }
}

const CopyableImage = ({ src, alt }: { src: string, alt: string}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <img src={src} alt={alt} className="backdrop-shadow mt-12 hover:scale-105 hover:cursor-grab p-0.5 rounded"/>
      <Button className="w-24" onClick={async () => await copyImgToClipboard(BASE_URL + src)}>copy image</Button>
    </div>
  );
};

const shareLove = async() => {
  await navigator.clipboard.writeText(BASE_URL);
  alert("Hello, here is my most sincere greeting!(你好,这是我最真诚的问候!) \n"+
   `${BASE_URL} copied to clipboard!(本站网址已复制!)`);
}

const getRandomStringFromArray = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
}

// english followed by chinese
const randomGreetings = [
  "You are a wonderful person! (你是一个很棒的人!)",
  "Gong xi fa cai! (恭喜发财)",
  "Than kyou! You have now been deeply thanked! (谢谢!你现在已经被深深感谢了!)",
  "May your day be filled with joy!(愿你的一天充满快乐!)",
  "Hello, here is my most sincere greeting! (你好,这是我最真诚的问候!)",
  "Good luck! (祝你好运!)",
  "You are the best! (你是最棒的!)",
  "Hard work! (加油!)",
  "You are the most beautiful! (你是最美丽的!)",
  "Live in harmony! (和谐相处!)",
  "The world is yours! (世界是你的!)",
]

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col w-full mt-2 gap-4 p-2 transition-all duration-300">
      <Button className="w-full" onClick={async () => await shareLove()}>
        Click me to share more love</Button>
        <div className="grid m:grid-cols-2 lg:grid-cols-4">
          {[...Array(6)].map((x, i) => {
            // i%3!=0 or i<2
            if (i==1 || i==6) {
              return (
              <div className="animate-slow-bounce backdrop-shadow mt-12 hover:cursor-grab p-0.5 rounded"
                    key={i} >
                <CopyableImage src={i+".png"} alt="gong xi fa cai"/>
              </div>) 
          } else {
            return (
              <CopyableImage src={i+".png"} alt="gong xi fa cai" key={i} />
          )}
        })}
        </div>
        <div className="container mx-auto mb-16">
          <iframe className="w-full aspect-video" 
                  src="https://www.youtube.com/embed/TWm31xbRVjI" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
      </div> 
      <div className="grid m:grid-cols-2 lg:grid-cols-4">
        {[7,8,9,10,11,12,13].map((x, i) => (
                <CopyableImage src={x+".png"} alt="gong xi fa cai" key={i} />
            ))}
      </div>
      <div className="container mx-auto mb-16">
          <iframe className="w-full aspect-video" 
                  src="https://www.youtube.com/embed/bu7nU9Mhpyo" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          </iframe>
      </div> 
        <Button className="w-full" onClick={() => alert("Than kyou! You have now been deeply thanked!")} >
          Click me to get a thank you</Button>
          <div className="text-center opacity-30">TradAesthetics (傳統美感) Inc. © {currentYear}</div>
    </div>
  );
}