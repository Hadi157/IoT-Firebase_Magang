import "core-js/stable";
import "regenerator-runtime/runtime";
/**
 * Bootstrap V5.0
 * {@link https://getbootstrap.com/docs/5.0/getting-started/introduction/ |Documentation}
 */
import "bootstrap/dist/css/bootstrap.min.css";
/**
 * Bootstrap Icon
 * {@link https://icons.getbootstrap.com/| Documentation}
 */
import "bootstrap-icons/font/bootstrap-icons.css";
/**
 * Google Fonts - Nunito
 */
import "@fontsource/nunito";
/**
 * Any other module/css
 */
import "../style/custom.css";
import { appRoute } from "./utilities/app-route";
import { initUtilitiesApp } from "./utilities/app-init";

initUtilitiesApp();
appRoute();
