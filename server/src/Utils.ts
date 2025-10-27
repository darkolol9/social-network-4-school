import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
}


export const tryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      const now = new Date().toLocaleString(); // readable local timestamp
      console.error(`[${now}][error occurred]`, err);
      res.status(500).json({ error: err.message });
    });
  };
};


const RANDOM_POSTS = [
  "The sky turned pink like cotton candy at sunset 🌅",
  "I accidentally watered my fake plant and didn't realize for five minutes 🌱😅",
  "Coffee tastes better when you drink it slowly ☕✨",
  "The cat stared at me like it knew all my secrets 🐱👀",
  "I laughed way too hard at a joke I barely understood 😂",
  "The ocean sounded like the world breathing 🌊",
  "Sometimes I dance in my kitchen just because I can 💃",
  "The dog brought me a stick as a gift 🐶🎁",
  "I saw a cloud shaped like a dinosaur and it made my day 🦕☁️",
  "He walked like a guy who just found $5 in his pocket 💸😌",
  "I burned the toast again... why is this so hard 🍞🔥",
  "The bookstore felt like a time machine made of paper 📚🕰️",
  "I drank water and instantly felt like a healthier person 🥤💪",
  "The sunrise looked like a painting today 🎨🌄",
  "Someone said 'hello' with a smile and my mood changed instantly 🙂✨",
  "The street smelled like fresh rain and wet stone 🌧️🪨",
  "A pigeon stared at me while I ate my sandwich 🐦🥪",
  "I found a feather and decided it was lucky 🍀🪶",
  "The wind felt like a soft hug today 🌬️🤗",
  "The cookie was too good, I ate three 🍪😳",
  "I saw someone walking a duck on a leash 🦆😂",
  "My socks didn’t match and I pretended it was fashion 🧦😎",
  "The moon looked way too dramatic, like it wanted attention 🌕✨",
  "I tried to whistle and only air came out 😗💨",
  "She laughed like she had stars in her voice ✨🤣",
  "The train was late but nobody cared 🚆😌",
  "I stared at the clouds longer than expected ☁️💭",
  "The dog barked at its own reflection again 🐶🪞",
  "Ice cream melts faster when you're excited 🍦🏃‍♂️💨",
  "I tried yoga and just ended up lying on the floor 🧘😵",
  "The trees danced in the wind today 🌳💃",
  "I wrote a list and forgot where I put it 📝😑",
  "The coffee shop playlist was *way too good* 🎶☕",
  "Someone waved at me but it was for the person behind me 👋😬",
  "My phone auto-corrected something and ruined my sentence 📱😤",
  "The stars looked like tiny holes in the sky 🌌✨",
  "I found a cookie crumb in my pocket and considered it treasure 🍪💎",
  "The air smelled like adventure today 🌍😌",
  "I took a nap and woke up in a different universe 😴🌀",
  "The chair creaked like it was gossiping 🪑👂",
  "A butterfly followed me for half a block 🦋🚶",
  "I tried to cook something new and nearly started a disaster 🍳🔥",
  "The rain tapped gently on the window like it was asking to come in 🌧️⛓️",
  "I saw someone juggling oranges in the park 🍊🎪",
  "The sky was too blue to ignore today 💙☀️",
  "My tea got cold while I was daydreaming 🍵💭",
  "The elevator music was unexpectedly emotional 🎼😢",
  "I found a tiny pebble that looked like a heart ❤️🪨",
  "We talked about everything and nothing at the same time 🗣️🌙",
  "I sneezed so loud the cat jumped 🐱😳💥"
];


export const getRandomSentence = () => {
  return RANDOM_POSTS[Math.floor(Math.random() * RANDOM_POSTS.length)];
}

export const uniqueByFn = (arr: any[], fn: (item) => any) => {
  const seen = new Set<any>();
  const newArr: any[] = [];

  for (const item of arr) {
    if (!seen.has(fn(item))) {
      seen.add(fn(item));
      newArr.push(item);
    }

  }


  return newArr;

}




export * as Utils from "./Utils";
