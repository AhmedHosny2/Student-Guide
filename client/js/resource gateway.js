const cardsData = {
  "cms downloader": [
    "https://github.com/AhmedAshrafAZ/cms-downloader",
    "Automate Your Downloads Effortlessly! Fetch, Create Folders, and Download All Your CMS Content with Ease!",
  ],
  "ACM club": [
    "https://chat.whatsapp.com/Cj0aQdBmxBpHFZaSJY5hcE",
    "Level Up Your Skills: Join ACM Club for Problem-Solving and Programming Mastery!",
  ],
  "GIU calendar": [
    "https://drive.google.com/file/d/1PwTV77dy07mzuBjtGLd32Bqzrz0DNygr/view?usp=sharing",
    "Unlock Your Potential: Academic Semester Calendar Unveiled!",
  ],
  "13- whatsapp group": [
    "https://chat.whatsapp.com/CWoFNpYmuSYAbVULWKxCtT",
    "Join the GIU Study WhatsApp group for 13- students",
  ],
  "GIU WIR": [
    "https://drive.google.com/file/d/1WHAYGxa3jRV1gGBhok-6RGGdvwewy3ye/view?usp=sharing",
    "Do wanna have a discount using your student ID? Check out the WIR program!",
  ],
  "10- whatsapp group": [
    "https://chat.whatsapp.com/BflwNdGVwgVLaohbIr7nvU",
    "Join the GIU Study WhatsApp group for 10- students",
  ],
};
Object.entries(cardsData).forEach(([key, value]) => {
  const cardContainer = document.querySelector(".card-wrap");
  // create new card
  let card = document.createElement("div");
  card.classList.add("card");
  // create and add img data
  let img = document.createElement("img");
  img.src = `../images/${key}.svg`;
  img.alt = "image not available";
  card.appendChild(img);

  //create text content wrapper
  const textContent = document.createElement("div");
  textContent.classList.add("txt");

  // create and add card text
  let cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = value[1];
  textContent.appendChild(cardText);

  //create card title
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = key;

  //append card content
  textContent.appendChild(cardTitle);
  card.appendChild(textContent);

  //append card
  cardContainer.appendChild(card);

  //create on click function to pass to another page with link
  card.addEventListener("click", () => {
    window.open(value[0], "_blank");
  });
});
