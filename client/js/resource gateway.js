const pageData = document.getElementById("yaya");
pageData.style.display = "none";

const loader = document.getElementById("test");
loader.style.display = "flex";

const cardsData = {
  "Choose Your Major": [
    "../html/majorSelection.html",
    "Even if you settled on a major, Due to courses, intuition, family, friends, likes & dislikes, I would advise you to read about all three majors, just in case maybe something could click",
    "chooseMajor",
    "Open",
  ],
  "CMS Downloader": [
    "https://github.com/AhmedAshrafAZ/cms-downloader",
    "Automate Your Downloads Effortlessly! Fetch, Create Folders, and Download All Your CMS Content with Ease!",
    "cmsDownloader",
    "Open",
  ],
  "ACM Club": [
    "https://www.facebook.com/profile.php?id=61556831184217",
    "Level Up Your Skills: Join ACM Club for Problem-Solving and Programming Mastery!",
    "acmClub",
    "Join",
  ],
  "GIU Calendar": [
    "https://drive.google.com/file/d/1PwTV77dy07mzuBjtGLd32Bqzrz0DNygr/view?usp=sharing",
    "Unlock Your Potential: Academic Semester Calendar Unveiled!",
    "giuCalendar",
    "Open",
  ],
  "13- Whatsapp Group": [
    "https://chat.whatsapp.com/CWoFNpYmuSYAbVULWKxCtT",
    "Join the GIU Study WhatsApp group for 13- students",
    "whatsappGroup13",
    "Join",
  ],
  "10- Whatsapp Group": [
    "https://chat.whatsapp.com/BflwNdGVwgVLaohbIr7nvU",
    "Join the GIU Study WhatsApp group for 10- students",
    "whatsappGroup10",
    "Join",
  ],
  "GIU WIR": [
    "https://drive.google.com/file/d/1WHAYGxa3jRV1gGBhok-6RGGdvwewy3ye/view?usp=sharing",
    "Do wanna have a discount using your student ID? Check out the WIR program!",
    "giuWIR",
    "Open",
  ],
};

Object.entries(cardsData).forEach(([key, value]) => {
  loader.style.display = "none";
  pageData.style.display = "grid";

  const cardContainer = document.querySelector(".card-wrap");

  // create new card
  let card = document.createElement("div");
  card.classList.add("card");

  // create card head
  let cardHead = document.createElement("div");
  cardHead.classList.add("card-head");

  // create card title
  let cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = key;

  // append cardHead to Card
  card.appendChild(cardHead);
  cardHead.appendChild(cardTitle); // Append cardTitle to cardHead

  // create and add img data
  let img = document.createElement("img");
  img.src = `../images/${value[2]}.svg`;
  console.log(img.src);
  img.alt = "image not available";
  card.appendChild(img);

  // create text content wrapper
  const textContent = document.createElement("div");
  textContent.classList.add("txt");

  // create and add card text
  let cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = value[1];
  textContent.appendChild(cardText);

  // create contact button
  let cardButton = document.createElement("a");
  cardButton.classList.add("contactBtn");
  cardButton.textContent = value[3];
  cardButton.href = value[0];
  cardButton.target = "_blank";
  textContent.appendChild(cardButton); // Append cardButton to textContent

  // append text content to card
  card.appendChild(textContent);

  // append card
  cardContainer.appendChild(card);

  // create onclick function for the contact button
  cardButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent card click event from triggering
  });
});
