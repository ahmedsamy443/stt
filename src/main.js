import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//  import axios from "axios";
import jQuery from "jQuery";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import swal from "vue-sweetalert2";
import ToggleButton from "vue-js-toggle-button";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
Vue.use(VueBootstrapTypeahead);
Vue.use(ToggleButton);

import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(VueSweetalert2);
Vue.use(swal);

Vue.use(jQuery);

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
