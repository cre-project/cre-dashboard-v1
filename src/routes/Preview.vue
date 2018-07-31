<template>
    <div>
        <navigation-header selected="preview"></navigation-header>
        <h1 id="tc-header">Preview</h1>
        <button class="save" @click="showPreview=true">Display preview (doesn't work correctly yet)</button>
        <div id="preview" v-show="!showPreview">
            <section class="upload-img-wrapper" id="page1">
                <p class="transbox-1" id="p1-address">{{ address }}</p>
                <img class="hidden" id="background-pg1-preview" title="click to change picture">
                <input id="background-pg1" type="file" @input="loadImg">
                <i id="background-pg1-icon" class="material-icons clickable" style="font-size: 50px">add_a_photo</i>
                <p class="transbox-2" id="p1-text">Offering Memorandum</p>
            </section>
            <section class="upload-img-wrapper" id="page2">
                <img class="hidden" id="background-pg2-preview" title="click to change picture">
                <input id="background-pg2" type="file" @input="loadImg">
                <i id="background-pg2-icon" class="material-icons clickable" style="font-size: 50px">add_a_photo</i>
                <div class="transbox-3">
                <p id="p2-street">{{ street }}</p>
                <p id="p2-city">{{ city }}</p>
                <hr>
                <p id="p2-company">{{ company }}</p>
                <p id="p2-username">{{ firstname }}, {{ lastname }}</p>
                <p id="p2-email">{{ email }}</p>
                </div>
            </section>
            <section class="upload-img-wrapper" id="page3">
                <img class="hidden" id="background-pg3-preview" title="click to change picture">
                <input id="background-pg3" type="file" @input="loadImg">
                <i id="background-pg3-icon" class="material-icons clickable" style="font-size: 50px">add_a_photo</i>
                <p class="transbox-5" id="p3-title">Table of Contents</p>
                <div class="transbox-4">
                <br><br><br><br>
                <h2>Property Information</h2>
                <br><br>
                <h2>Property Photos</h2>
                <br><br>
                <h2>Recent Sales</h2>
                <br><br>
                <h2>Rent Comparables</h2>
                <br><br>
                <h2>Pricing and Financial Analysis</h2>
                </div>
            </section>
            <section class="upload-img-wrapper" id="page4">
                <img class="hidden" id="background-pg4-preview" title="click to change picture">
                <input id="background-pg4" type="file" @input="loadImg">
                <i id="background-pg4-icon" class="material-icons" style="font-size: 50px">add_a_photo</i>
                <p class="transbox-5" id="p3-title">Property Information</p>
            </section>
            <section class="upload-img-wrapper" id="page5">
                <img class="hidden" id="background-pg5-preview" title="click to change picture">
                <input id="background-pg5" type="file" @input="loadImg">
                <i id="background-pg5-icon" class="material-icons" style="font-size: 50px">add_a_photo</i>
                <div class="transbox-7">
                <br><br><br><br>
                <h3>Property Information</h3>
                <br><br><br><br>
                      <tr>
                          <th class="l-align"><h4>Property Address</h4></th>
                          <th class="l-align"><c1>{{ street }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Property City</h4></th>
                          <th class="l-align"><c1>{{ city }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Property State</h4></th>
                          <th class="l-align"><c1>{{ state }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Property Zip</h4></th>
                          <th class="l-align"><c1>{{ zip }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Number of Stories</h4></th>
                          <th class="l-align"><c1>{{ stories }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Year Built</h4></th>
                          <th class="l-align"><c1>{{ year }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>Lot Size Acres</h4></th>
                          <th class="l-align"><c1>{{ formatPrice (lot) }}</c1></th>
                      </tr>
                      <tr>
                          <th class="l-align"><h4>APN</h4></th>
                          <th class="l-align"><c1>{{ apn }}</c1></th>
                      </tr>
                </div>
            </section>
            <section class="upload-img-wrapper" id="page6">
                <img class="hidden" id="background-pg6-preview" title="click to change picture">
                <input id="background-pg6" type="file" @input="loadImg">
                <i id="background-pg6-icon" class="material-icons" style="font-size: 50px">add_a_photo</i>
                <p class="transbox-5" id="p3-title">Property Photos</p>
            </section>
            <section id="page7">
                <h1>Page 7 comes here</h1>
            </section>
            <section id="page8">
                <h1>Page 8 comes here</h1>
            </section>
            <section id="page9">
                <h1>Page 9 comes here</h1>
            </section>
            <section id="page10">
                <h1>Page 10 comes here</h1>
            </section>
            <section id="page11">
                <h1>Page 11 comes here</h1>
            </section>
        </div>
        <iframe v-if="showPreview" type="application/pdf" width="100%" height="900" frameborder="0" style="position:relative;z-index:999" :src="newPdf"></iframe>
    </div>
</template>
<script>
/* eslint-disable */
import JsPDF from 'jspdf'
import { mapState } from 'vuex';
import { upload } from '../store/tools/images'

export default {
  data () {
    return {
      showPreview: false
    }
  },
  methods: {
    loadNewImage (previewEl, button, imgName, evt) {
      let file = evt.target.files[0]
      let reader = new FileReader()
      let fileName = `images/${imgName}`

      reader.addEventListener('load', function (evt) {
        previewEl.src = evt.target.result
        previewEl.classList.remove('hidden')
        previewEl.classList.add('clickable')
        button.classList.remove('clickable')
        button.classList.add('hidden')
        upload(fileName, evt.target.result)
      })
      reader.readAsDataURL(file)
    },
    loadExistingImage (previewEl, button, url) {
      previewEl.src = url
      previewEl.classList.remove('hidden')
      previewEl.classList.add('clickable')
      button.classList.remove('clickable')
      button.classList.add('hidden')
    },
    loadImg (evt) {
      let id = evt.srcElement.id
      const preview = document.querySelector(`#${id}-preview`)
      const icon = document.querySelector(`#${id}-icon`)
      let fileName = `${this.userId}/${id}.png`
      this.loadNewImage(preview, icon, fileName, evt)
    },
    formatPrice (value) {
      let val = (value / 1).toFixed().replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    ...mapState({
      selectedValuation: state => state.valuations.selectedValuation,
      company: state => state.users.currentUser.companyName,
      firstname: state => state.users.currentUser.firstName,
      lastname: state => state.users.currentUser.lastName,
      email: state => state.users.currentUser.email
    }),
    address () {
      let property = this.selectedValuation.property
      return `${property.address || ''}, ${property.city || ''}`
    },
    street () {
      let property = this.selectedValuation.property
      return `${property.address || ''}`
    },
    city () {
      let property = this.selectedValuation.property
      return `${property.city || ''}`
    },
    state () {
      let property = this.selectedValuation.property
      return `${property.state || ''}`
    },
    zip () {
      let property = this.selectedValuation.property
      return `${property.zip || ''}`
    },
    year () {
      let property = this.selectedValuation.property
      return `${property.yearBuilt || ''}`
    },
    stories () {
      let property = this.selectedValuation.property
      return `${property.numberOfStories || ''}`
    },
    lot () {
      let property = this.selectedValuation.property
      return `${property.lotSize || ''}`
    },
    apn () {
      let property = this.selectedValuation.property
      return `${property.apn || ''}`
    },
    // company () {
      // let emptyUser = this.currentUser.emptyUser
      // return `${emptyUser.ompanyName || ''}`
    // },
    newPdf () {
      var doc = new JsPDF()

      // We'll make our own renderer to skip this editor
      var specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true
        },
        '.controls': function (element, renderer) {
          return true
        }
      }

      // All units are in the set measurement for the document
      // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
      // Default export is a4 paper, portrait, using milimeters for units
      doc.fromHTML(document.querySelector('#preview'), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      })
      return doc.output('datauristring')
    }
  }
}
</script>

<style scoped>
#preview {
  display: grid;
  grid-auto-rows: auto; 
  grid-template-columns: 1fr 3fr 3fr 2fr;
}
section {
  grid-column-start: 2;
  grid-column-end: 4;
  margin: auto;
  margin-left: 0;
  margin-top: 0.5em;
  height: 60em;
  width: 100%;
  padding: 0.5em 0.8em;
  border: 1px dashed darkgray;
  border-radius: 20px;
  vertical-align: middle;
}
.upload-img-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-img-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 50%;
  opacity: 0;
}
#background-pg1-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
}

#background-pg2-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.85;
}

#background-pg3-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
}

#background-pg4-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

#background-pg5-preview {
  position: absolute;
  width: 50%;
  height: 100%;
  left:  50%;
  opacity: 0.8;
}

#background-pg6-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.save {
  margin-left: 30em;
  width: 30%;
}

.transbox-1 {
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid black;
    border-radius: 25px;
    padding: 0.5em 0.8em;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
}

.transbox-2 {
    margin: 0px;
    background: linear-gradient( rgba(255,255,255,0.2), rgba(255,255,255,1));
    border-radius: 25px;
    padding: 1.1em 1.5em;
    overflow: hidden;
    position: absolute;
    vertical-align: middle;
}

.transbox-3 {
    margin: 0px;
    background: linear-gradient( rgba(8,8,8,0.4), rgb(8, 8, 8, 1));
    border-radius: 0px;
    padding: 25px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left:  65%;
    width: 500px;
    height: 100%;
    vertical-align: left;
}

.transbox-4 {
    margin: 2px;
    background: linear-gradient( rgba(8,8,8,0.7), rgb(8, 8, 8, 0.7));
    border-radius: 50px;
    padding: 25px;
    overflow: hidden;
    position: absolute;
    top: 30%;
    left:  0%;
    width: 925px;
    height: 100%;
    vertical-align: left;
}

.transbox-5 {
    margin: 2px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid black;
    border-radius: 25px;
    padding: 0.8em 0.8em;
    top: 25%;
    overflow: hidden;
    position: relative;
    vertical-align: top;
}

.transbox-7 {
    margin: 1px;
    background: linear-gradient( rgba(255,255,255,1), rgb(255, 255, 255, 1));
    border-radius: 0px;
    padding: 25px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left:  0%;
    width: 1059px;
    height: 100%;
    vertical-align: left;
}


#p1-address {
  color: #ffffff;
  position: absolute;
  margin: 5%;
  width: 90%;
  top: 10%;
  left: 30%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}

#p1-text {
  color: #000000;
  position: absolute;
  margin: 0%;
  width: 115%;
  top: 93.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}

#p2-street {
  color: #ffffff;
  position: absolute;
  margin: 0%;
  width: 400px;
  height: 100px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}

#p2-city {
  color: #ffffff;
  position: absolute;
  margin: 0%;
  width: 250px;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}

#p2-company {
  color: #ffffff;
  position: absolute;
  margin: 0%;
  width: 250px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}

#p2-username {
  color: #ffffff;
  position: absolute;
  margin: 0%;
  width: 250px;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: light;
}

#p2-email {
  color: #ffffff;
  position: absolute;
  margin: 0%;
  width: 250px;
  top: 90%;
  left: 50%;
   height: 75px;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 25px;
  text-align: center;
  font-weight: light;
}

hr {
    height: 1px;
    margin-top: 55%;
    border: 0;
    top: 40%;
    border-top: 1px solid rgb(5, 5, 5);
    padding: 2rem;
}

.material-icons {
    padding: 0.5rem;
    top: 50%;
    left: 50%;
    position: absolute;
    cursor: pointer;
}

h1 {
    width: 50%;
    color: #ffffff;
    margin: auto;
    width: 600px;
    margin-left: 1em;
    font-size: 50px;
    font-weight: lighter;
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
}

#p3-title {
  color: #ffffff;
  position: absolute;
  margin: 5%;
  width: 90%;
  top: 10%;
  left: 20%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 40px;
  text-align: center;
  font-weight: ligther;
  text-transform: uppercase;
}

h2 {
    width: 60%;
    color: #ffffff;
    margin: auto;
    margin-left: 4em;
    font-size: 30px;
    font-weight: normal;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    text-transform: uppercase;
}

h3 {
    width: 60%;
    color: #000000;
    margin: auto;
    margin-left: 4em;
    font-size: 30px;
    font-weight: normal;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    text-transform: uppercase;
}

h4 {
    width: 100%;
    color: #000000;
    margin: auto;
    margin-left: 4em;
    font-size: 25px;
    font-weight: normal;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
}

c1 {
    width: 60%;
    color: #000000;
    margin: auto;
    margin-left: 4em;
    font-size: 25px;
    font-weight: bolder;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    text-transform: uppercase;
}

</style>