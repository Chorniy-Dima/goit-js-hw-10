import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.show({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
                backgroundColor: "#59a10d",
                position: "topRight",
                titleColor: "#fff",
                messageColor: "#fff",
                iconColor: "#fff",
                progressBarColor: "#326101"
            });
        })
        .catch(delay => {
            iziToast.show({
                title: 'ERROR',
                message: `❌ Rejected promise in ${delay}ms`,
                backgroundColor: "#ef4040",
                position: "topRight",
                titleColor: "#fff",
                messageColor: "#fff",
                iconColor: "#fff",
                progressBarColor: "#b51b1b"
            });
        });
});
