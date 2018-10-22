function processSignOut(data) {
    changeToGuestUI();
}

function signOut(event) {
    event.preventDefault();
    fetch("signOut.php", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            }
        }).then(res => res.json())
        .then(processSignOut(data))
        .catch(error => console.error("Error: +", error));
}

//add event listener
document.getElementById("signOut_btn").addEventListener("click", signOut, false);