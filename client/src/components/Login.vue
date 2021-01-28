<template>
  <div class="modal" :class="{ 'is-active': showLogin }">
    <div class="modal-background" @click="hideLogin"></div>
    <div class="modal-content">
      <div class="box">
        <h3 class="title is-3 has-text-centered">{{ title }}</h3>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-right has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Enter your username ..."
                v-model="username"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span
                v-if="!!passwordError"
                class="icon is-small is-right has-text-danger"
              >
                <i class="fas fa-exclamation-circle"></i>
              </span>
            </div>
            <p v-if="usernameError" class="help is-danger">
              {{ usernameError }}
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-right has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Enter your password ..."
                v-model="password"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <span
                v-if="!!passwordError"
                class="icon is-small is-right has-text-danger"
              >
                <i class="fas fa-exclamation-circle"></i>
              </span>
            </div>
            <p v-if="passwordError" class="help is-danger">
              {{ passwordError }}
            </p>
          </div>

          <div class="field">
            <div class="control">
              <button
                class="button is-link is-fullwidth is-size-5 has-text-weight-bold"
                type="submit"
              >
                {{ title }}
              </button>
            </div>
          </div>
          <div class="has-text-centered">
            <a @click="toggleAuth">{{ swapText }}</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["showLogin", "hideLogin"],
  setup() {
    const isLogin = ref(true);
    const username = ref("");
    const usernameError = ref("");
    const password = ref("");
    const passwordError = ref("");
    const store = useStore();

    const title = computed(() => {
      if (isLogin.value) {
        return "Login";
      } else {
        return "Signup";
      }
    });

    const swapText = computed(() => {
      if (isLogin.value) {
        return "Do not have an account? Signup";
      } else {
        return "Already have an account? Login";
      }
    });

    const toggleAuth = () => {
      isLogin.value = !isLogin.value;
    };

    const onSubmit = async () => {
      usernameError.value = "";
      passwordError.value = "";
      try {
        let action;
        if (isLogin.value) {
          action = "login";
        } else {
          action = "signup";
        }
        await store.dispatch(action, {
          username: username.value,
          password: password.value,
        });
      } catch (err) {
        if (err.response?.data?.error?.username !== undefined) {
          usernameError.value = err.response.data.error.username;
        }
        if (err.response?.data?.error?.password !== undefined) {
          passwordError.value = err.response.data.error.password;
        }
      }
    };
    return {
      usernameError,
      passwordError,
      username,
      password,
      title,
      swapText,
      toggleAuth,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.box {
  max-width: 500px !important;
  margin: 10rem auto !important;
}
</style>