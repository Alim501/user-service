import React from "react";

function RegisterModal() {
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register</h5>
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
              <label for="register-username" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="register-username"
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
              <label for="register-password" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="register-password"
                required
              />
            </div>
            <div class="mb-3">
              <label for="register-confirm-password" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control"
                id="register-confirm-password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
