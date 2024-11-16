var contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const flashCards = document.getElementById("flashCards");

//savebutton
document.getElementById("saveCard").addEventListener("click", () => {
  addFlashCard();
});

//delete button
document.getElementById("deleteCards").addEventListener("click", () => {
  localStorage.clear();
  flashCards.innerHTML = "";
  contentArray = [];
});

document.getElementById("showCardBox").addEventListener("click", () => {
  document.getElementById("flashBox").style.display = "block";
});

document.getElementById("closeCardBox").addEventListener("click", () => {
  document.getElementById("flashBox").style.display = "none";
});
const flashCardMaker = (text, delThisIndex) => {
  const flashCard = document.createElement("div");
  const question = document.createElement("h2");
  const answer = document.createElement("h2");
  const del = document.createElement("button");

  flashCard.className = "flashCard";

  question.setAttribute(
    "style",
    "border-top:1px solid red;padding:15px;margin-top:30px"
  );
  question.textContent = text.myQuestion;

  answer.setAttribute("style", "text-align:center;disply:none;color:red;");
  answer.textContent = text.myAnswer;

  //delete button functionality
      del.textContent = "Delete"; //changed to text for clarity
   
  del.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from toggling the answer
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    flashCard.remove();
  });

  //   del.className = "fa-minus";
  //   del.addEventListener("click", () => {
  //     contentArray.splice(delThisIndex, 1);
  //     localStorage.setItem("items", JSON.stringify(contentArray));
  //       // window.location.reload();
  //       flashCard.remove();
  //   });

  flashCard.addEventListener("click", () => {
    // if (answer.style.display == "none") answer.style.display = "block";
    // else answer.style.display = "none";

    answer.style.display = answer.style.display === "none" ? "block" : "none";
  });

  flashCard.appendChild(question);
  flashCard.appendChild(answer);
  flashCard.appendChild(del);

  //   document.querySelector("#flashCards").appendChild(flashCard);
  flashCards.appendChild(flashCard);
};

contentArray.forEach((item, index) => flashCardMaker(item, index));

const addFlashCard = () => {
  console.log("hello");
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  if (question.value.trim() === "" || answer.value.trim() === "") {
    alert("Please fill in both question and answer.");
    return;
  }

  const flashcard_info = {
    myQuestion: question.value,
    myAnswer: answer.value,
  };

  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));

  flashCardMaker(
    flashcard_info,
   
    contentArray.length - 1
  );

  question.value = "";
  answer.value = "";
//   document.getElementById("flashBox").style.display = "none";
};
