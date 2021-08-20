import { appSwitchPage } from "./app-display";
/**
 * @module app-init
 */
/**
 * All global initialization function placed here
 */
const initUtilitiesApp = () => {
    // Hot Module Replacement (Dev mode)
    if (module.hot) {
        module.hot.accept();
    }
    // Back/Forward browser Function
    window.onpopstate = function (e) {
        appSwitchPage(e.srcElement.location.href);
    };
    // Service worker here
};

export { initUtilitiesApp };
