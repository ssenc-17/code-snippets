
function loadProfile() {
    let returnValue = {};
    const div = document.createElement("div");
    div.classList.add("social-card");
    const img = document.createElement("img");
    img.src = "https://placehold.co/150x150?text=Loading..."
    img.classList.add("loader");
    setTimeout(() => {
        img.src = "https://picsum.photos/150?random=" + Math.random();
        img.classList.remove("loader");
        returnValue.succeeded = true;
    }, 1000);
    div.appendChild(img);
    window.icons.appendChild(div);
    return returnValue
}

function addStyles() {
    window.icons.classList.add("loaded");
}


const result1 = loadProfile()

function check() {
    if (result1.succeeded) {
        const result2 = loadProfile();
        
        function check() {
            if (result2.succeeded) {
                const result3 = loadProfile();
                
                function check() {
                    if (result3.succeeded) {
                        addStyles()
                        
                    } else {
                        setTimeout(check, 100);
                    }
                }
                check();
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    } else {
        setTimeout(check, 100);
    }
}
setTimeout(check, 100);

