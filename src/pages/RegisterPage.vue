<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username can only contain letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.firstName.alpha">
          First name can only contain letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.lastName.alpha">
          Last name can only contain letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.strong">
          Your password has to contain at least one digit and at least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>

          <b-form-invalid-feedback v-if="$v.form.email.required && !$v.form.email.emailFormat">
            Email is not in a valid format
          </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

import { mockRegister } from "../services/auth.js";
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        strong: (p) => {
          const atLeastOneDigitRegex = /\d/;
          const atLeastOneSpecialCharRegex = /[^a-zA-Z0-9]/;
          return atLeastOneDigitRegex.test(p) && atLeastOneSpecialCharRegex.test(p)
        }
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        emailFormat: (email) => {
          const validator = require('validator');
          return validator.isEmail(email);
        }
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
methods: {
  validateState(param) {
    const { $dirty, $error } = this.$v.form[param];
    return $dirty ? !$error : null;
  },
  async Register() {
    try {
      const userDetails = {
        username: this.form.username,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        password: this.form.password,
        country: this.form.country,
        email: this.form.email
      };
      
      console.log('User details:', userDetails);

      const response = await this.axios.post(
        this.$root.store.server_domain + "/Register", userDetails
      );
      this.$router.push("/login");
      console.log(response);
    } catch (err) {
      console.error('Registration error:', err); // Log the error details
      this.form.submitError = err.message || "Registration failed";
    }
  },
  onRegister() {
    this.$v.form.$touch();
    if (this.$v.form.$anyError) {
      return;
    }
    this.Register();
  },
  onReset() {
    this.form = {
      username: "",
      firstName: "",
      lastName: "",
      country: null,
      password: "",
      confirmedPassword: "",
      email: ""
    };
    this.$nextTick(() => {
      this.$v.$reset();
    });
  }
}
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>