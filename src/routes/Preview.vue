<template>
  <div>
    <navigation-header selected="preview"></navigation-header>
  <div class="html-preview">
      <section class="page page-1">
          <div id="page-1" class="page-1 background" :style="{'background-image': 'url(' + require('../assets/Untitled.jpg') + ')'}">
              <button class="image-upload" data-target="page-1"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-1" class="img-inputer"/>
              <div class="header">
                  <div class="offering">OFFERING MEMORANDUM</div>
              </div>
              <div class="footer">
                  <div class="headline">
                      1 2 6 7 N O R T H L A U R E L A V E N U E , W E S T H O L L Y W O O D , C A 9 0 0 4 6
                  </div>
                  <div class="subline">
                      A 22-Unit + One Non-Conforming Unit Apartment Building Located in the Supply-Constrained West Hollywood Submarket of Los Angeles
                  </div>
                  <div class="underline">
                  </div>
              </div>
          </div>
      </section>
      <section class="page page-2">
          <div id="page-2" class="background" :style="{'background-image': 'url(' + require('../assets/Untitled_02.jpg') + ')'}">
              <button class="image-upload" data-target="page-2"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-2" class="img-inputer"/>
              <div class="sidebar right">
                  <div class="address-num">
                      1267
                  </div>
                  <div class="address-str">
                      LAUREL AVENUE
                  </div>
                  <div class="brand">
                      MARCUS & MILLICHAP
                  </div>
                  <div class="logo">
                  </div>
              </div>
          </div>
      </section>
      <section class="page page-3">
          <div id="page-3" class="background">
              <button class="image-upload" data-target="page-3"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-3" class="img-inputer"/>
              <div class="sidebar">
                  <div class="header">
                      <div class="title">
                          <div class="left-column">TABLE OF CONTENTS</div>
                      </div>
                  </div>
                  <ul class="toc-list">
                      <li style="display: none;"><div class="left-column">FIRM INFORMATION </div><span class="toc-page-num">4</span></li>
                      <li style="display: none;"><div class="left-column">AGENT BIO </div><span class="toc-page-num">5</span></li>
                      <li><div class="left-column">PROPERTY PHOTOS </div><span class="toc-page-num">6</span></li>
                      <li><div class="left-column">RECENT SALES </div><span class="toc-page-num">8</span></li>
                      <li><div class="left-column">RENT COMPARABLES </div><span class="toc-page-num">11</span></li>
                      <li><div class="left-column">PRICING AN FINANCIAL ANALYSIS </div><span class="toc-page-num">13</span></li>
                  </ul>
              </div>
              <div id="side-img" class="background side-img">
                  <button class="image-upload" data-target="side-img"><i class="fas fa-camera"></i></button>
                  <input type="file" name="side-img" class="img-inputer"/>
              </div>
          </div>
      </section>
      <section class="page page-4" style="display: none;">
          <div class="vertical title right">FIRM INFORMATION</div>
      </section>
      <section class="page page-5" style="display: none;">
          <div class="vertical title right">AGENT BIO</div>
      </section>
      <section class="page page-6" :style="{'background-image': 'url(' + require('../assets/Untitled_05.jpg') + ')'}">
          <div class="vertical title right">PROPERTY PHOTOS</div>
          <div id="page-6" class="background">
              <button class="image-upload" data-target="page-6"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-6" class="img-inputer"/>
          </div>
      </section>
      <section class="page page-7">
          <div class="title">PROPERTY PHOTOS</div>
          <div class="photos">
              <div class="photo">
                  <div id="photo-1" class="background"></div>
                  <button class="image-upload" data-target="photo-1"><i class="fas fa-camera"></i></button>
                  <input type="file" name="photo-1" class="img-inputer"/>
              </div>
              <div class="photo">
                  <div id="photo-2" class="background"></div>
                  <button class="image-upload" data-target="photo-2"><i class="fas fa-camera"></i></button>
                  <input type="file" name="photo-2" class="img-inputer"/>
              </div>
              <div class="photo">
                  <div id="photo-3" class="background"></div>
                  <button class="image-upload" data-target="photo-3"><i class="fas fa-camera"></i></button>
                  <input type="file" name="photo-3" class="img-inputer"/>
              </div>
              <div class="photo">
                  <div id="photo-4" class="background"></div>
                  <button class="image-upload" data-target="photo-4"><i class="fas fa-camera"></i></button>
                  <input type="file" name="photo-4" class="img-inputer"/>
              </div>
          </div>
      </section>
      <section class="page page-8" :style="{'background-image': 'url(' + require('../assets/Untitled_07.jpg') + ')'}">
          <div class="vertical title left">RECENT SALES</div>
          <div id="page-8" class="background">
              <button class="image-upload" data-target="page-8"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-8" class="img-inputer"/>
          </div>
      </section>
      <section class="page page-9" :style="{'background-image': 'url(' + require('../assets/Untitled_03.jpg') + ')'}">
          <div class="background">
              <div class="sidebar right">
                  <div class="header">
                      RECENT SALES
                  </div>
                  <ol>
                      <li>2A</li>
                      <li>11</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                  </ol>
              </div>
              <div class="map-holder">
                  <span class="helper"></span>
                  <img src="~@/assets/Untitled_08.jpg">
              </div>
          </div>
      </section>
      <section class="page sales-slide">
          <div class="title transparent">RECENT SALES</div>
          <div class="sales-items">
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div class="address"> 11 </div>
                  <ul class="item-list">
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                  </ul>
              </div>
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div class="address"> 11 </div>
                  <ul class="item-list">
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                  </ul>
              </div>
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div class="address"> 11 </div>
                  <ul class="item-list">
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                  </ul>
              </div>
          </div>
      </section>
      <section class="page page-10" :style="{'background-image': 'url(' + require('../assets/Untitled.jpg') + ')'}">
          <div class="vertical title right">RENT COMPARABLES</div>
          <div id="page-10" class="background">
              <button class="image-upload" data-target="page-10"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-10" class="img-inputer"/>
          </div>
      </section>
      <section class="page page-11" :style="{'background-image': 'url(' + require('../assets/Untitled_03.jpg') + ')'}">
          <div class="background">
              <div class="sidebar left">
                  <div class="header">
                      RENT COMPARABLES
                  </div>
                  <ol>
                      <li>2A</li>
                      <li>11</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                  </ol>
              </div>
              <div class="map-holder right">
                  <span class="helper"></span>
                  <img src="~@/assets/Untitled_08.jpg">
              </div>
          </div>
      </section>
      <section class="page sales-slide">
          <div class="title transparent">RENT COMPARABLES</div>
          <div class="comparables-items">
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div>
                      <div class="address"> ADDRESS: </div>
                  </div>
              </div>
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div>
                      <div class="address"> ADDRESS: </div>
                  </div>
              </div>
              <div class="item">
                  <img src="~@/assets/Untitled_09.jpg">
                  <div>
                      <div class="address"> ADDRESS: </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="page page-12" :style="{'background-image': 'url(' + require('../assets/Untitled_10.jpg') + ')'}">
          <div class="vertical title right">PRICING & FINANCIAL ANALYSIS</div>
          <div id="page-12" class="background">
              <button class="image-upload" data-target="page-12"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-12" class="img-inputer"/>
          </div>
      </section>
      <section class="page page-13">
          <div class="title transparent">RENT ROLL</div>
          <table class="rent-rolls" >
              <thead>
                  <tr>
                      <th>Unit Number </th>
                      <th>Unit Type</th>
                      <th>Unit SF</th>
                      <th>Current Rent</th>
                      <th>Asking Rent</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>3</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>4</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>5</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>6</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>7</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>8</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>9</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>10</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>11</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>12</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>13</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>14</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <!-- <tr>
                      <td>15</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr> -->
                  <!-- <tr>
                      <td>16</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>17</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>18</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>19</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>20</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>21</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>22</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr>
                  <tr>
                      <td>23</td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                      <td> </td>
                  </tr> -->
              </tbody>
          </table>
      </section>
      <section class="page page-16">
          <div class="title transparent">FINANCIAL OVERVIEW</div>
          <div class="financial-holder">
              <div class="financial-left">
                  <table class="overview">
                      <tbody>
                          <tr>
                              <td>LOCATION</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td class="devider">ADDRESS</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Price</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Number of Units</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Price/Unit</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Gross Square Feet</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>PriceSF</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>CAP Rate- Current</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>CAP Rate- Pro Forma</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>GRM- Current GRM-</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Pro Forma Year Built</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Lot Size</td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div class="financial-right">
                  <div class="table-title">
                      Annualized Operating Data
                  </div>
                  <table class="details">
                      <tbody>
                          <tr>
                              <th class="first">Income</th>
                              <th>Current</th>
                              <th>Pro Forma</th>
                          </tr>
                          <tr class="highlighted">
                              <td>Gross Potential Rent</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Less: Vacancy/Deductions</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Gross Potential Income</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Other Income</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Effective Gross Income</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Lesss: Expenses</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr class="highlighted">
                              <td>Net Operating Income</td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <div class="table-title">
                      Expenses
                  </div>
                  <table class="details">
                      <tbody>
                          <tr>
                              <td>Real Estate Taxes Insurance</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Utilities - Electric</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Utilities - Water & Sewer</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Garbage</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Repairs & Maintenance</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Management Fee</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Landscaping</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td class="devider">Other Expenses</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr  class="highlighted">
                              <td>Total Expenses</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr  class="highlighted">
                              <td>Expenses/unit</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr class="highlighted">
                              <td>Expenses/SF</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr  class="highlighted">
                              <td>% of EGI</td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </section>
      <section class="page page-14">
          <div id="page-14" class="background">
              <button class="image-upload" data-target="page-14"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-14" class="img-inputer"/>
          </div>
      </section>
      <section class="page page-15">
          <div id="page-15" class="background">
              <button class="image-upload" data-target="page-15"><i class="fas fa-camera"></i></button>
              <input type="file" name="page-15" class="img-inputer"/>
              <div class="sidebar right">
                  <div class="address-num">
                      1267
                  </div>
                  <div class="address-str">
                      LAUREL AVENUE
                  </div>
                  <div class="brand">
                      MARCUS & MILLICHAP
                  </div>
                  <div class="logo">
                  </div>
              </div>
          </div>
      </section>
  </div>
  </div>
</template>
<script>
/* eslint-disable */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { mapState } from "vuex";
// import { upload } from "../store/tools/images";
// import { emptyComparable } from "../store/tools/templates";
// import GoogleMap from "@/components/GoogleMap";

export default {
  methods: {
    selectElementImage(button) {
      var input = document.getElementsByName(
        button.getAttribute("data-target")
      )[0];
      input.click();
    },
    setImgUrl(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var targetEl = document.getElementById(input.getAttribute("name"));

          if (targetEl.tagName == "DIV") {
            targetEl.style.backgroundImage = "url(" + e.target.result + ")";
          } else if (targetEl.tagName == "IMG") {
            targetEl.src = e.target.result;
          } else {
            console.log("Element does not support image visualisations");
          }
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
  onCreate() {
    var imgButtons = document.getElementsByClassName("image-upload");
    for (var i = 0; i < imgButtons.length; ++i) {
      imgButtons[i].addEventListener("click", function(button) {
        selectElementImage(this);
      });
    }

    var imgInputs = document.getElementsByTagName("input");

    for (var i = 0; i < imgInputs.length; ++i) {
      if (imgInputs[i].getAttribute("type") == "file") {
        imgInputs[i].addEventListener("change", function(input) {
          setImgUrl(this);
        });
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/preview.css";
@import "../assets/fonts/stylesheet.css";
</style>