<template>
    <div>
        <navigation-header selected="preview"></navigation-header>
        <h1 id="tc-header">Preview</h1>
        <button @click="showPreview=true">Display preview (doesn't work correctly yet)</button>
        <div id="preview" v-show="!showPreview">
            <section class="upload-img-wrapper" id="page1">
                <i class="large material-icons" id="background-pg1-icon">add_a_photo</i>
                <img class="hidden" id="background-pg1-preview" title="click to change picture">
                <input id="background-pg1" type="file" @input="loadImg">
                <p id="p1-address">{{ address }}</p>
            </section>
            <section id="page2">
                <h1>Page 2 comes here</h1>
            </section>
            <section id="page3">
                <h1>Page 3 comes here</h1>
            </section>
            <section id="page4">
                <h1>Page 4 comes here</h1>
            </section>
            <section id="page5">
                <h1>Page 5 comes here</h1>
            </section>
            <section id="page6">
                <h1>Page 6 comes here</h1>
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
    }
  },
  computed: {
    ...mapState({
      selectedValuation: state => state.valuations.selectedValuation
    }),
    address () {
      let property = this.selectedValuation.property
      // TODO address formatting
      return `${property.address || ''}, ${property.city || ''}, ${property.zip || ''} ${property.state || ''}`
    },
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
  top: 0;
  opacity: 0;
}
#background-pg1-preview {
  background-size: cover;
  width: 100%;
  height: 100%;
}
#p1-address {
    /* TODO add styling here (position) */
}
</style>
