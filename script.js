const searchForm = document.querySelector("form");
const SpeechRecognition = window.webkitSpeechRecognition;
const micMain = document.querySelector("#micPg");
const prevmicBtn = document.querySelector(".fa-microphone");
const first = document.querySelector("#a");
const close = document.querySelector(".fa-times");
var appended = false;
close.addEventListener("click", (e) => {
  micMain.style.display = "none";
  first.style.display = "block";
});
prevmicBtn.addEventListener("click", (e) => {
  micMain.style.display = "block";
  first.style.display = "none";
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    const micBtn = searchForm.querySelector("button");
    const micIcon = micBtn.firstElementChild;
    micBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (micIcon.classList.contains("fa-microphone")) {
        recognition.start();
      } else {
        recognition.stop();
      }
    });
    recognition.addEventListener("start", (e) => {
      console.log("speech recognition started");
      micIcon.classList.remove("fa-microphone");
      micIcon.classList.add("fa-microphone-slash");
    });
    recognition.addEventListener("end", (e) => {
      console.log("speech recognition stopped");
      micIcon.classList.remove("fa-microphone-slash");
      micIcon.classList.add("fa-microphone");
      searchForm.submit();
    });
    recognition.addEventListener("result", (e) => {
      if (appended === false) {
        const textArea = document.createElement("textarea");
        const inside = document.querySelector("#inside");
        textArea.setAttribute("id", "text");
        textArea.setAttribute("name", "query");
        inside.appendChild(textArea);
        appended = true;
      }
      console.log(e);
      const spokenText = e.results[e.resultIndex][0].transcript;
      const instruction = spokenText.toLowerCase().trim();
      if (instruction === "go") {
        searchForm.submit();
      } else if (instruction === "stop recording") {
        console.log("speech recognition stopped");
        recognition.stop();
      } else if (instruction === "reset") {
        searchForm.query.value = "";
      } else {
        searchForm.query.value = instruction;
      }
      console.log(instruction);
    });
  } else {
    const btn = searchForm.querySelector("button");
    btn.remove();
    console.log("not supported");
  }
});
