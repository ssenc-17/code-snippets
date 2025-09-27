
async function loadProfile() {
    const promise = new Promise((resolve, reject) => {

        const div = document.createElement("div");
        div.classList.add("social-card");
        const img = document.createElement("img");
        img.src = "https://placehold.co/150x150?text=Loading..."
        img.classList.add("loader");
        setTimeout(() => {
            img.src = "https://picsum.photos/150?random=" + Math.random();
            img.classList.remove("loader");
            resolve();
        }, 1000);
        div.appendChild(img);
        window.icons.appendChild(div);
    });

    return promise;
}

function addStyles() {
    window.icons.classList.add("loaded");
}


await loadProfile()
await loadProfile()
await loadProfile()
addStyles()

// This console actually runs at the correct time
console.log("Finished")
