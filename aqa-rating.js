import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@nylon/aqa-font/aqa-font.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `aqa-rating`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AqaRating extends PolymerElement {
  static get template() {
    return html`
    <style>
      /****** Style Star Rating Widget *****/

      .resultRating {
        display: flex;
        width: auto;
        height: 30px;
        color: black;
      }

      .resultRating>div {
        padding: 0.5rem;
        margin: auto 0;
        font-family: TrirongRegular;
        font-size: 1rem;
      }

      .rating {
        border: none;
        float: left;
      }

      .section {
        margin-right: 0.5rem;
      }

      .rating>input {
        display: none;
      }

      .rating>label:before {
        margin: 5px;
        font-size: 1.25em;
        display: inline-block;
        content: "("atttr(value)")";
      }

      .rating>.half:before {
        content: "\\f089";
        position: absolute;
      }

      .rating>label {
        color: #1E88E5;
        float: right;
      }

      .avartar {
        display: flex;
        width: 25px;
        height: 25px;
        border: 2px solid #1E88E5;
        font-size: 15px;
        border-radius: 50%;
        /* margin-right: 5px; */
      }

      .avartar>div {
        margin: auto;
      }
      /***** CSS Magic to Highlight Stars on Hover *****/

      .rating>input:checked~label,
      /* show gold star when clicked */

      .rating:not(:checked)>label:hover,
      /* hover current star */

      .rating:not(:checked)>label:hover~label {
        background-color: #1E88E5;
        border-radius: 50%;
        color: white;
        cursor: pointer;
      }
      /* hover previous stars in list */

      .rating>input:checked+label:hover,
      /* hover current star when changing rating */

      .rating>input:checked~label:hover,
      .rating>label:hover~input:checked~label,
      /* lighten current selection */

      .rating>input:checked~label:hover~label {
        color: white;
        background-color: #64B5F6;
        border-radius: 50%;
      }
    </style>
    <fieldset class="rating">
      <template is="dom-repeat" items="[[itemreverse(items)]]">

        <input type="radio" id\$="star[[name]][[item.pointer]]" name\$="rating-[[name]]" checked\$="[[selectedValue(item.pointer,item.label)]]" value="[[item.value]]" on-tap="setValue" disabled="[[disabled]]">
        <label class="full section" for\$="star[[name]][[item.pointer]]" on-mouseover="showText" on-mouseout="clearText" on-click="setText" title="[[item.label]]" on-tap="setValue">
                    <div class="avartar">
                        <div>[[item.pointer]]</div>
                    </div>
                </label>
      </template>

      <input type="radio" id\$="star[[name]]0" name\$="rating-[[name]]" value="0" checked="" hidden="">
      <label class="full section" for\$="star[[name]]0" on-mouseover="showText" on-mouseout="clearText" on-click="setText" title="ไม่มีทักษะ" hidden="">
                <div class="avartar">
                    <div>0</div>
                </div>
            </label>
    </fieldset>

    <!-- <button on-click="test">show</button> -->
    <div class="resultRating">
      <div>[[value]]</div>
    </div>
`;
  }

  static get is() { return 'aqa-rating'; }
  static get properties() {
    return {
      title: {
        type: String,
        value: ''
      },
      value: {
        type: String,
        value: ''
      },
      disabled: {
        type: Boolean,
        value: false
      },
      active: {
        type: Boolean,
        value: true
      },
      name: {
        type: String,
        value: '0'
      },
      selected: {
        type: String,
        value: '',
        notify: true
      },
      items: {
        type: Array,
        value: []
      }
    }
  }
  setValue(e) {
    if (this.disabled)
      return
    let data = e.model.__data.item
    this.set('selected', data.value)
  }
  selectedValue(pointer, label) {
    // console
    if (pointer == this.selected) {
      // console.log(pointer,label)
      this.value = label;
      this.title = label;
      return true;
    }
    else return false
  }
  showText(e) {
    if (this.disabled)
      return
    this.active = false;
    this.value = e.currentTarget.title
  }
  clearText() {
    if (this.active != true)
      this.value = this.title;
  }
  itemreverse(val) {
    var arr = [];
    for (var index = val.length - 1; index >= 0; index--) {
      arr.push(Object.assign({}, val[index], { pointer: index.toString() }))
    }
    return arr;
  }
  setText(e) {
    if (this.disabled)
      return
    this.active = true
    this.value = e.currentTarget.title;
    this.title = e.currentTarget.title;
  }
}

window.customElements.define(AqaRating.is, AqaRating);
