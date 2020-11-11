class Email extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrap-input validate-input" data-validate="wrong email">
        <span class="fa-input-icon">
          <i class="fa fa-user"></i>
        </span>
        <span class="btn-show-pass">
          <i class="fa fa-check" aria-hidden="true" data-target="refreshable.validCheckmark"></i>
        </span>
        <input
          class="input-field"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          data-action="change->refreshable#hidePlaceholder change->refreshable#validateInput"
          data-target="refreshable.emailInput"
          required
        />
        <span class="focus-input" data-placeholder=""></span>
      </div>
    `;
  }
}

customElements.define('email-component', Email);
