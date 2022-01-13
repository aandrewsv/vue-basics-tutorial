const CustomInput = {
  template: `
		  <label>
			  {{ this.label }}
			  <input :type="type" v-model="inputValue">
		  </label>
	  `,
  props: ["label", "type", "modelValue"],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};

const LoginForm = {
  template: `
    <form @submit.prevent="handleSubmit">
		<h2>{{ textState }}</h2>
		<custom-input
			v-for="(input, i) in inputs"
			:key="i"
			v-model="input.value" 
			:label="input.label" 
			:type="input.type"
		/>
		<button>Log in</button>
    </form>
  `,
  components: {
    CustomInput,
  },
  data() {
    return {
      textState: "Login Form",
      inputs: [
        {
          label: "Email",
          value: "",
          type: "email",
        },
        {
          label: "Password",
          value: "",
          type: "password",
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      console.log({
        email: this.inputs[0].value,
        password: this.inputs[1].value,
      });
    },
  },
};

const TestBox = {
  template: `
		  <div class="box"></div>
	`,
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  unmounted() {
    console.log("unmounted");
  },
};

const ToggleShowBox = {
  template: `
  		<h2>{{ textState }}</h2>
  		<button @click="toggleBox">{{isVisible ? "Hide Box" : "Show Box"}}</button>
		  <test-box v-if="isVisible" />
	`,
  data() {
    return {
      textState: "ToggleShowBox",
      isVisible: false,
    };
  },
  methods: {
    toggleBox() {
      this.isVisible = !this.isVisible;
    },
  },
  updated() {
    console.log("updated");
  },
  components: {
    TestBox,
  },
};

const ModifyTextState = {
  template: `
    <h2>Modifica estados con eventos</h2>
		<button @click="pushExclamation">!</button>
    <button @click="pushInterrogation">?</button>
    <button @click="arrowLeft">{{"<---"}}</button>
    <div class="textarea">
		  <textarea v-model="textState" rows="5" />
    </div>
    <div class="textState">
      <p>{{ textState }}</p>
    </div>
	`,
  data() {
    return {
      textState:
        "Modifica el estado haciendo click en los botones de arriba o escribiendo en esta area",
    };
  },
  methods: {
    pushExclamation() {
      this.textState = this.textState + "!";
    },
    pushInterrogation() {
      this.textState = this.textState + "?";
    },
    arrowLeft() {
      this.textState = this.textState.slice(0, this.textState.length - 1);
    },
  },
};

const app1 = {
  components: {
    LoginForm,
  },
};
const app2 = {
  components: {
    ToggleShowBox,
  },
};
const app3 = {
  components: {
    ModifyTextState,
  },
};

Vue.createApp(app1).mount("#app1");
Vue.createApp(app2).mount("#app2");
Vue.createApp(app3).mount("#app3");
