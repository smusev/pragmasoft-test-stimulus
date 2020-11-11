class Password extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrap-input validate-input" >
        <span class="fa-input-icon">
          <i class="fa fa-lock"></i>
        </span>
        <span class="btn-show-pass" >
          <i class="fa fa-eye" data-action="click->refreshable#togglePasswordVisiblity"></i>
        </span>
        <input
          id="password"
          class="input-field"
          type="password"
          name="password"
          placeholder="Password"
          data-target="refreshable.passwordInput"
          data-action="change->refreshable#hidePlaceholder"
          required
        >
        <span class="focus-input" data-placeholder=""></span>
      </div>
    `;
  }
}

customElements.define('password-component', Password);
