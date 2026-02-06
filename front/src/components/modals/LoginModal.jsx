import React from "react";

function LoginModal() {
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="login-username" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="login-username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="register-email" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="register-email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="login-password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="login-password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
