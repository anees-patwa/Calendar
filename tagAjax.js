function processResponse(data) {
    if (data.error) {
        console.error(data.eMessage);
    } else {

        getTagList();
        console.log("added successfully");
    }
}

function addTagAjax(event) {
    event.preventDefault();
    const tag = document.getElementById("tag_name").value;
    const token = document.getElementById("token").value;

    const data = {
        'tag': tag,
        'token': token
    }

    fetch("newTag.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json())
        .then(processResponse(data))
        .catch(error => console.error("Error: " + error));
}

//add event listener
document.getElementById("newTag_btn").addEventListener("click", addTagAjax, false);