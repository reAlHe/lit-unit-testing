import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  static properties = {
    name: { type: String },
    isEditable: { type: Boolean }
  };

  constructor() {
    super();
    this.name = 'Somebody';
    this.isEditable = false;
  }

  async fetchEditableStatus() {
    try {
      const response = await fetch('http://localhost:8082/');
      if (response.ok) {
        const data = await response.json();
        this.isEditable = data.isEditable;
        this.requestUpdate();
      } else {
        console.error('Error fetching editable status:', response.ok);
      }
    } catch (error) {
      console.error('Error fetching editable status:', error);
    }
  }

  async refreshEditableStatus() {
    await this.fetchEditableStatus();
  }

  render() {
    return html`
      <p>Hello, ${this.name}!</p>
      <input
        type="text"
        .value="${this.name}"
        ?disabled="${!this.isEditable}"
        @input="${(e) => this.name = e.target.value}">
      <button @click="${this.refreshEditableStatus}">Refresh Editable Status</button>
    `;
  }
}

customElements.define('simple-greeting', SimpleGreeting);
