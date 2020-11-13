class Email extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div
        class="wrap-input validate-input"
        data-target="refreshable.emailInput"
        >
        <span class="fa-input-icon">
          <i class="fa fa-user"></i>
        </span>
        <span class="btn-show-pass">
          <i class="fa" aria-hidden="true" data-target="refreshable.validCheckmark"></i>
        </span>
        <input
          class="input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <span class="focus-input" data-placeholder=""></span>
      </div>
    `;
  }
}

customElements.define('email-component', Email);
