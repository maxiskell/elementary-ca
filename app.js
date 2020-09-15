function nextGeneration(rule) {
  function getNext(generation) {
    let next = [];
    let ruleArr = rule.split("").map((c) => parseInt(c));

    for (let i = 0; i < generation.length; i++) {
      const curr = generation[i];
      const left = generation[i - 1];
      const right = generation[i + 1];

      if (left !== undefined && right !== undefined) {
        let rulePos = parseInt(`${left}${curr}${right}`, 2);
        next.push(ruleArr[rulePos]);
      } else {
        next.push(0);
      }
    }

    return next;
  }

  return getNext;
}

function randomByte() {
  const { floor, random } = Math;

  return Array.from({ length: 8 }, () => floor(random() * 2)).join("");
}

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  return canvas;
}

function displayInfo(firstGeneration, rule) {
  const genStr = `${firstGeneration.join("")}`;
  const ruleStr = `Rule ${parseInt(rule, 2)} (${rule})`;

  document.getElementById("first-gen").setAttribute("title", genStr);
  document.getElementById("rule").textContent = ruleStr;
}

function init(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  function show(generation, count) {
    for (let pos in generation) {
      ctx.fillStyle = generation[pos] === 1 ? "#000" : "#fff";
      ctx.fillRect(pos, count, 1, 1);
    }
  }

  let rule = randomByte();
  let generation = Array.from({ length: width }, () =>
    Math.floor(Math.random() * 2)
  );

  displayInfo(generation, rule);

  let genCount = 0;
  const next = nextGeneration(rule);

  show(generation, genCount);

  let animation = setInterval(() => {
    genCount++;
    generation = next(generation);
    show(generation, genCount);
  }, 1000 / 60);

  if (genCount === height) {
    clearInterval(animation);
  }
}

init(800, 600);
