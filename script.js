const main = document.querySelector("main");

// 1. Heading element
const h3 = document.createElement("h3");
h3.id = "h";
h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
main.appendChild(h3);

// 2. Container for the images
const flexDiv = document.createElement("div");
flexDiv.className = "flex";
main.appendChild(flexDiv);

// 3. Prepare the image classes: 5 unique + 1 duplicate
const classNames = ["img1", "img2", "img3", "img4", "img5"];
const duplicateIndex = Math.floor(Math.random() * classNames.length);
const imagesArray = [...classNames, classNames[duplicateIndex]];

// Shuffle array using Fisher-Yates shuffle
for (let i = imagesArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
}

// 4. Render images
imagesArray.forEach((cls, idx) => {
  const img = document.createElement("img");
  img.className = cls;
  img.dataset.index = idx;
  flexDiv.appendChild(img);
});

// 5. State variables
let clickedImages = [];

// 6. Reset button
const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.textContent = "Reset";
resetBtn.style.display = "none";
main.appendChild(resetBtn);

// 7. Verify button
const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.textContent = "Verify";
verifyBtn.style.display = "none";
main.appendChild(verifyBtn);

// 8. Result paragraph
const para = document.createElement("p");
para.id = "para";
main.appendChild(para);

// Handle image clicks
flexDiv.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  const target = e.target;

  // Prevent clicking more than 2 images or clicking the same image twice
  if (clickedImages.includes(target) || clickedImages.length >= 2) return;

  target.classList.add("selected");
  clickedImages.push(target);

  // State 2: At least one tile clicked -> show Reset
  if (clickedImages.length >= 1) {
    resetBtn.style.display = "inline-block";
  }

  // State 3: Exactly two tiles clicked -> show Verify
  if (clickedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
});

// Handle Reset click (Return to State 1)
resetBtn.addEventListener("click", () => {
  // Ensure 'selected' class is removed from ALL images in DOM
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => img.classList.remove("selected"));

  clickedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
});

// Handle Verify click (State 4)
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (
    clickedImages.length === 2 &&
    clickedImages[0].className.replace("selected", "").trim() ===
      clickedImages[1].className.replace("selected", "").trim()
  ) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});