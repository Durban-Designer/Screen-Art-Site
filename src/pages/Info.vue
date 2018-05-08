<template>
  <div class="main">
    <div class="modal">
      <div class="services">
        <h1>Services</h1>
        <ul>
          <li>Web Development - Responsive Websites up to the current standards of web design.</li>
          <li>App Development - Hybrid Web Apps, custom CRMs for businesses or project implementation.</li>
          <li>Graphic Design - Rebranding, Logo Design, and ANY Media Development you need.</li>
          <li>Marketing - Social Media marketing and Ad campaigns for your businesses growth.</li>
        </ul>
        <p class="blurb">At Screen Art Studios we to bring your ideas and our creative and technical power together to create something unique.<br/>
          Whether you have an idea for a new mobile application or if you need a complete rebranding of your company's media, Screen Art does it all.</p>
      </div>
      <h2>The Founders</h2>
      <div class="bon">
        <div class="bonImage"></div>
        <p class="bio">
          Bonham Goodman is the Lead Developer and a Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as an expert in backend API servers.
        </p>
      </div>
      <div class="avery">
        <div class="averyImage"></div>
        <p class="bio">
          Avery Angel is a Developer and a Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as a Graphic Designer, and Photographer.
        </p>
      </div>
      <div class="royce">
        <div class="royceImage"></div>
        <p class="bio">
          Royce Birnbaum is the President and Co-Founder of Screen Art Studios. A Full Stack Web Developer
          specializing in the Quick Venom Stack as well as an Author, Graphic Designer, and Photographer.
        </p>
      </div>
      <div class="kris">
        <div class="krisImage"></div>
        <p class="bio">
          Kristoffer St. John is the Vice President and Co-Founder of Screen Art Studios.
          A Full Stack Web Developer specializing in the Quick Venom Stack as well
          as an Artist, Graphic Designer, and Photographer.
        </p>
      </div>
    </div>
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
    margin-left: 3%;
    width: 95%;
    height: 68%;
    z-index: 10;
    position: fixed;
    background:rgba(0,0,0,0.6);
    border-radius: 12px;
    box-shadow: 2px 2px 4px #000;
    color: #fff;
    overflow: hidden;
    font-family: @base-font;
  }
  h1 {
    text-align: center;
    grid-row: 1;
  }
  h2 {
    text-align: center;
    width: 100%;
    margin-top: 250px;
  }
  .modal {
    overflow-y: scroll;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(11, 200px);
  }

  .royce {
    grid-row: 4;
    margin-left: 5%;
  }

  .royceImage {
    background-image: url('../assets/RoyceHeadshot.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin-left: 10%;
  }

  .kris {
    margin-left: 5%;
    grid-row: 6;
  }

  .krisImage {
    background-image: url('../assets/KrisHeadshot.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin-left: 10%;
  }

  .bon {
    grid-row: 8;
    margin-left: 5%;
  }

  .bonImage {
    background-image: url('../assets/BonHeadshot.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin-left: 10%;
  }

  .avery {
    grid-row: 10;
    margin-left: 5%;
  }

  .averyImage {
    background-image: url('../assets/AveryHeadshot.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin-left: 10%;
  }

  .services {
    grid-row: 1;
  }
  .bio {
    width: 70%;
    margin-left: 15%;
  }
  .blurb {
    text-align: center;
    font-size: 1.5em;
    background-color: #c22227;
    padding: 5px;
    border-radius: 10px;
  }
  @media only screen and (min-width:400px) {
    .royceImage {
      margin-left: 20%;
    }
    .krisImage {
      margin-left: 20%;
    }
    .bonImage {
      margin-left: 20%;
    }
    .averyImage {
      margin-left: 20%;
    }
  }
  @media only screen and (min-width:700px) {

    p {
      font-size: 2em;
    }
    .blurb {
      font-size: 2.5em;
      line-height: 35px;
    }

    li {
      font-size: 1.4em;
      margin-left: 5%;
    }
    .royceImage {
      margin-left: 33%;
    }
    .krisImage {
      margin-left: 33%;
    }
    .bonImage {
      margin-left: 33%;
    }
    .averyImage {
      margin-left: 33%;
    }
  }
    @media only screen and (min-width: 1000px) {
      .royceImage {
        margin-left: 36%;
      }
      .krisImage {
        margin-left: 36%;
      }
      .bonImage {
        margin-left: 36%;
      }
      .averyImage {
        margin-left: 36%;
      }
      li {
        margin-left: 15%;
      }
    }
    @media only screen and (min-width: 1400px) {
      li {
        margin-left: 25%;
      }
      .royceImage {
        margin-left: 40%;
      }
      .krisImage {
        margin-left: 40%;
      }
      .bonImage {
        margin-left: 40%;
      }
      .averyImage {
        margin-left: 40%;
      }
    }
</style>
