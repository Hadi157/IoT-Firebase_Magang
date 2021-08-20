/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import { appRoute } from "../utilities/app-route";
import { appGetWebinar } from "../utilities/app-firebase";
import {alertTemplate} from "../utilities/app-display-template";
import firebase from "firebase/app";
import "firebase/firestore";

class Display {
    constructor(args) {
        this.callFunction = args;
    }

    execute() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                $(window).off();
                await this.callFunction();
                resolve(true);
            } catch (error) {
                $("body").append(alertTemplate("alert-danger", "Perhatian!", "<b>Terjadi kesalahan sistem</b><br>Mohon laporkan segera kepada administrator dan coba lagi dalam beberapa saat", true)).addClass("overflow-hidden");
                $(".alert").delay(500).fadeIn().delay(6000).fadeOut();
                setTimeout(() => {
                    $(".alert").remove();
                }, 8000);
                reject(error);
            }
        });
    }
}

class Loader {
    constructor(args, element) {
        this.callFunction = args;
        this.element = element;
    }

    async remove() {
        let states = await this.callFunction();
        if (states) {
            $(this.element).fadeOut(1500, () => {
                $(this.element).delay(1000).remove();
                $("body").removeClass("overflow-hidden");
                let checkMessage = localStorage.getItem("msg");
                if (checkMessage !== null) {
                    checkMessage = JSON.parse(checkMessage);
                    $("body").append(alertTemplate(checkMessage.kind, checkMessage.title, checkMessage.message));
                    $(".alert").delay(500).fadeIn().delay(6000).fadeOut();
                    setTimeout(() => {
                        $(".alert").remove();
                        localStorage.removeItem("msg");
                    }, 8000);
                }
            });
        } else {
            $("body").append(alertTemplate("alert-danger", "Perhatian!", "<b>Terjadi kesalahan sistem</b><br>Mohon laporkan segera kepada administrator dan coba lagi dalam beberapa saat", true)).addClass("overflow-hidden");
            $(".alert").delay(500).fadeIn().delay(6000).fadeOut();
            setTimeout(() => {
                $(".alert").remove();
            }, 8000);
            console.error(states);
        }
    }
}

const appSwitchPage = (url) => {
    window.history.pushState(null, null, url);
    appRoute();
};

export { Display, Loader, appSwitchPage };