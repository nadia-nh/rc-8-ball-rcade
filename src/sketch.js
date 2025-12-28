import { on } from "@rcade/plugin-input-classic";

const magicBall = document.getElementById("magicBall");
const liquid = document.getElementById("liquid");
const fortuneText = document.getElementById("fortuneText");

const answers = [
  "It is certain",
  "It is<br>decidedly so",
  "Without<br>a doubt",
  "Yes, definitely",
  "You may rely<br>on it",
  "As I see it,<br>yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point<br>to yes",
  "Reply hazy,<br>try again",
  "Ask again<br>later",
  "Better not<br>tell you now",
  "Cannot<br>predict now",
  "Concentrate<br>& ask again",
  "Don’t count<br>on it",
  "My reply<br>is no",
  "My sources<br>say no",
  "Outlook not<br>so good",
  "Very doubtful",
];

function createBubbles(count = 26) {
  const radius = 75;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.classList.add("bubble");

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * (radius - 20);
    const x = radius + dist * Math.cos(angle);

    b.style.left = `${x - 5}px`;
    b.style.animationDelay = `${Math.random() * 2.5}s`;
    b.style.animationDuration = `${2.5 + Math.random() * 2}s`;

    liquid.appendChild(b);
  }
}

function randomAnswer() {
  const idx = Math.floor(Math.random() * answers.length);
  return answers[idx];
}

function showFortune() {
  // pick answer
  fortuneText.innerHTML = randomAnswer();

  // retrigger shake
  magicBall.classList.remove("shake");
  void magicBall.offsetWidth; // force reflow so animation restarts
  magicBall.classList.add("shake");

  // show triangle / hide 8
  magicBall.classList.add("show-fortune");

  // after 5 seconds, fade back to 8
  setTimeout(() => {
    magicBall.classList.remove("show-fortune");
  }, 5000);
}

// magicBall.addEventListener("click", showFortune);
on("press", (e) => {
  //   console.log(e.button);
  if (
    e.button === "UP" ||
    e.button === "DOWN" ||
    e.button === "LEFT" ||
    e.button === "RIGHT"
  ) {
    showFortune();
  }
});

magicBall.addEventListener("animationend", (e) => {
  if (e.animationName === "shake") {
    magicBall.classList.remove("shake");
  }
});

// init bubbles once
createBubbles();
