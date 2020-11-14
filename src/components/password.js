class Password extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrap-input validate-input"
           data-target="refreshable.passwordInput"
      >
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
          data-target="refreshable.passwordField"
          minlength="8"
          maxlength="32"
          required
        >
        <span class="focus-input" data-placeholder=""></span>
      </div>
    `;
  }
}

customElements.define('password-component', Password);
