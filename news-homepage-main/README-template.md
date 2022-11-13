# Frontend Mentor - News homepage solution

This is a solution to the [News homepage challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/news-homepage-H6SWTa1MFl). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Toggle the mobile menu (requires some JavaScript)

### Screenshot

[Desktop Version](./screenshots/desktop.png)
[Mobile Version](./screenshots/mobile.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript
- [Bootstrap](https://getbootstrap.com/) - Official Page
- [Pushbar.js](https://oncebot.github.io/pushbar.js/) - JS library

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

- How to use a good Nesting with the grid of Bootstrap:

<!-- <div class="col-12 col-md">
  <div class="row">
    <div class="col-4 divImg">
      <img src="./assets/images/image-retro-pcs.jpg">
    </div>
    <div class="col-8">
      <div class="row">
        <div class="col d-flex flex-column align-items-start">
          <h3>01</h3>
          <span class="span-purple fw-bold my-2 text-start">Reviving Retro PCs</span>
          <p class="text-start">What happens when old PCs are given modern upgrades?</p>
        </div>
      </div>
    </div>
  </div> 
</div> -->

- How to create a pushbar with the plugin Pushbar.js:

<div data-pushbar-id="menu-mobile" data-pushbar-direction="right" class="pushbar menu-mobile"></div>

<button data-pushbar-target="menu-mobile" class="border-0 bg-transparent"></button>

<script>
  var pushbar = new Pushbar({
    blur: true,
    overlay: true
  });
</script>

### Continued development

I´m still learning about bootstrap and how to use it, specially the grid system, my goal is improve my html/css/js skills.

### Useful resources

- [How to Create the Menu for mobile](https://www.youtube.com/watch?v=DTIm2nZ6yqg) - This helped me to create the menu. I really liked this plugin and i´ll try to continue using it.
- [The Bootstrap docs](https://getbootstrap.com/docs/5.2/getting-started/introduction/) - This is teh official page from BS and helped me to use all the stuff of BS. I'd recommend it to anyone still learning this concept.

## Author

- My GitHub - [@freddyval7](https://github.com/freddyval7)
- Frontend Mentor - [@freddyval7](https://www.frontendmentor.io/profile/freddyval7)
- Instagram - [@ftdev7](https://www.instagram.com/ftdev7/)
