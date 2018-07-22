import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-spinner/paper-spinner.js";

/**
 * `reddit-ui`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RedditUi extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          text-align: center;
        }

        .wrapper {
          padding: 15px 0 15px 0;
        }

        .swipeable-container {
          width: 100%;
        }

        .padding-class {
          padding: 15px 0 15px 0;
        }
      </style>
      <paper-spinner id="spinner" active=[[active]]></paper-spinner>
      <paper-item>[[game]] - Hot Reddit Posts (Swipe to remove)</paper-item>

      <template is="dom-repeat" items="[[posts]]">
        <iron-swipeable-container class="swipeable-container">
          <div class="wrapper">
            <paper-card>
              <div class="padding-class">
                <a href=[[item.permalink]] target="_blank">[[item.title]]</a>
              </div>
            </paper-card>
          </div>
        </iron-swipeable-container>
      </template>
    `;
  }
  static get properties() {
    return {
      game: {
        type: String,
        value: 'Fortnite',
      },
      posts: {
        type: Array
      }
    };
  }

  ready() {
    super.ready();
    var url = 'https://3oemw4weak.execute-api.us-east-1.amazonaws.com/api/reddit-api';
    var data = {game: this.game};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => {
      this.$.spinner.active = false;
      console.error('Error:', error);
    })
    .then(response => {
      this.posts = response.data;
    });
  }
}

window.customElements.define('reddit-ui', RedditUi);
