//construct list items for tags list
function makeList(data) {
    console.log(data);
}

//get tag names from ajax call to db
function getTagList() {
    //make tags list
    fetch("getTags.php", {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            }
        }).then(res => res.json())
        .then(data => makeList(data))
        .catch(error => console.error("Error: " + error));
}