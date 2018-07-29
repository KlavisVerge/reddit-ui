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
          width: 100%;
        }

        paper-card {
          width: 100%;
        }

        .padding-class {
          padding: 15px 0 15px 0;
        }

        a {
          text-decoration: none;
        }
      </style>
      <paper-spinner id="spinner" active=[[active]]></paper-spinner>
      <paper-item><h3>[[displayname]] - Hot Reddit Posts</h3></paper-item>

      <template is="dom-repeat" items="[[posts]]">
        <div class="wrapper">
          <paper-card>
            <div class="padding-class">
              <a href=[[item.permalink]] target="_blank">[[item.title]]</a>
            </div>
          </paper-card>
        </div>
      </template>
    `;
  }
  static get properties() {
    return {
      game: {
        type: String,
        value: 'Fortnite',
      },
      displayname: {
        type: String,
        value: 'Fortnite'
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        value: true
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
    let err = false;

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
      err = true;
    })
    .then(response => {
      if(err){
        return;
      }
      this.$.spinner.active = false;
      this.posts = response.data;
    });
  }
}

window.customElements.define('reddit-ui', RedditUi);
