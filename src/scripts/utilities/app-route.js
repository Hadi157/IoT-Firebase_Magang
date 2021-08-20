import { Loader } from "./app-display";
import { displayHome } from "../display/app-home";
// import { appCheckLogin, appLogOut } from "./app-firebase";
import splashScreen from "../../templates/splash-screen.html";
import loading from "../../templates/loading.html";

/**
 * @module app-route
 */

/**
 * Do initialize routing for app
 */
const appRoute = async () => {
    let toRemove;
    // No scroll restoration every switch page
    if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
    if (sessionStorage.getItem("splash-screen") !== null) {
        $("body").html(loading).addClass("overflow-hidden");
        toRemove = ".loading";
    } else {
        $("body").html(splashScreen).addClass("overflow-hidden");
        sessionStorage.setItem("splash-screen", "true");
        toRemove = ".splash-screen";
    }
    
    let page = window.location.pathname;
    if (page == "" || page == "/" || page == undefined) page = "/dashboard";
    appLoad(page, toRemove);
};

const appLoad = (page, toRemove) => {
    // let webinarUrl = "/webinar" + page.match(/[/webinar/]\d+/g);

    if (page === "/home") {
        new Loader(() => displayHome(), toRemove).remove();}
};

export { appRoute };
