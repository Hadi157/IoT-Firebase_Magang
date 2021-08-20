/* eslint-disable no-unused-vars */
import { Display } from "../utilities/app-display";
import { appGetWebinar, getData, writeData } from "../utilities/app-firebase";
import home from "../../templates/home.html";


const displayHome = () => {
    let homeDisplay = new Display(async () => {
        $("body").append(home);
        console.log(getData())

        let tombol = $('.coba');
        tombol.on('click', () => {
            let data = 'ON'
            writeData(data);
        })
        $(() => {
            
        });
    });
    return homeDisplay.execute();
};

export { displayHome };
