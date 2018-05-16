<template>
  <div class="main">
        <h1>Services</h1>
        <ul>
          <li>Web Development - Responsive Websites up to the current standards of web design.</li>
          <li>App Development - Hybrid Web Apps, custom CRMs for businesses or project implementation.</li>
          <li>Graphic Design - Rebranding, Logo Design, and ANY Media Development you need.</li>
          <li>Marketing - Social Media marketing and Ad campaigns for your businesses growth.</li>
        </ul>
        <h2>The Founders</h2>
        <p class="blurb">At Screen Art Studios we to bring your ideas and our creative and technical power together to create something unique.<br/>
          Whether you have an idea for a new mobile application or if you need a complete rebranding of your company's media, Screen Art does it all.</p>
        <div class="bonImage"></div>
        <p class="bonbio">
          Bonham Goodman is the Lead Developer and a Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as an expert in backend API servers.
        </p>
        <div class="averyImage"></div>
        <p class="averybio">
          Avery Angel is a Developer and a Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as a Graphic Designer, and Photographer.
        </p>
        <div class="royceImage"></div>
        <p class="roycebio">
          Royce Birnbaum is the President and Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as an Author, Graphic Designer, and Photographer.
        </p>
        <div class="krisImage"></div>
        <p class="krisbio">
          Kristoffer St. John is the Vice President and Co-Founder of Screen Art Studios.
          A Full Stack Web Developer specializing in the Quick Venom Stack as well
          as an Artist, Graphic Designer, and Photographer.
        </p>
    </div>
</template>

<script>
export default {
  name: 'Info',
  data: function () {
    return {
      modal: 1
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='less'>
  @base-font:'Pathway Gothic One', sans-serif;

  .main {
    margin-top: 145px;
    margin-left: 5%;
    width: 90%;
    height: 68%;
    z-index: 10;
    position: fixed;
    background:rgba(0,0,0,0.6);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    color: #fff;
    overflow-y: scroll;
    font-family: @base-font;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(35, 3em);
  }
  h1 {
    text-align: center;
    grid-row: 1;
    grid-column-start: 1;
    grid-column-end: 11;
    font-size: 3em;
  }
  ul {
    grid-row-start: 7;
    grid-row-end: 12;
    grid-column-start: 1;
    grid-column-end: 11;
    line-height: 25px;
    margin-left: 5%;
  }
  h2 {
    text-align: center;
    grid-row: 12;
    grid-column-start: 1;
    grid-column-end: 11;
  }
  .royceImage {
    background-image: url('../assets/RoyceHeadshot.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 14;
    grid-row-end: 18;
  }
  .krisImage {
    background-image: url('../assets/KrisHeadshot.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 19;
    grid-row-end: 23;
  }
  .bonImage {
    background-image: url('../assets/BonHeadshot.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 24;
    grid-row-end: 28;
  }
  .averyImage {
    background-image: url('../assets/AveryHeadshot.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 29;
    grid-row-end: 33;
  }
  .roycebio {
    grid-row-start: 15;
    grid-row-end: 18;
    grid-column-start: 5;
    grid-column-end: 11;
  }
  .averybio {
    grid-column-start: 5;
    grid-column-end: 11;
    grid-row-start: 30;
    grid-row-end: 32;
  }
  .krisbio {
    grid-row-start: 20;
    grid-row-end: 24;
    grid-column-start: 5;
    grid-column-end: 11;
  }
  .bonbio {
    grid-column-start: 5;
    grid-column-end: 11;
    grid-row-start: 25;
    grid-row-end: 28;
  }
  .blurb {
    text-align: center;
    font-size: 1.5em;
    background-color: #c22227;
    padding: 5px;
    border-radius: 10px;
    grid-row-start: 3;
    grid-row-end: 7;
    grid-column-start: 1;
    grid-column-end: 11;
  }
  @media only screen and (min-width:400px) {
  }
  @media only screen and (min-width:700px) {
    ul {
      font-size: 1.5em;
    }
    .blurb {
      font-size: 1.8em;
    }
    p {
      font-size: 1.4em;
    }
  }
    @media only screen and (min-width: 1000px) {
    }
    @media only screen and (min-width: 1400px) {
      ul {
        font-size: 2.5em;
        line-height: 50px;
      }
      .blurb {
        font-size: 2.2em;
      }
      p {
        font-size: 2em;
      }
    }
</style>
