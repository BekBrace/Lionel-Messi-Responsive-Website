const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = ""; //txt is each letter being written in typewriter
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// type method
TypeWriter.prototype.type = function () {
  // current index of word
  const current = this.wordIndex % this.words.length;
  // get full text of current word
  const fullTxt = this.words[current];
  // Check status if deleting
  if (this.isDeleting) {
    // if not deleting , Remove charachter
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // if deleting, Add charachter
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type speed
  let typeSpeed = 300;
  // typespeed while deleting - faster
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // make pause at the end
    typeSpeed = this.wait;
    // set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

// Init on dom load
document.addEventListener("DOMContentLoaded", init);

// function init
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init typewriter
  new TypeWriter(txtElement, words, wait);
}
