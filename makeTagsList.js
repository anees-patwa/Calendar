//construct list items for tags list
function makeList(data) {
    //clear form value
    $('#tag_name').val('');

    //clear list
    $list = document.getElementById("tagsList");
    $list.innerHTML = "";

    //construct list
    for (var key in data) {
        //create div container
        $container = document.createElement("div");
        $container.setAttribute("class", "form-group form-check");

        //create input element
        $input = document.createElement("input");
        $input.setAttribute("type", "checkbox");
        $input.setAttribute("name", data[key]);
        $input.setAttribute("class", "form-check-input");
        //$input.appendChild(document.createTextNode(data[key]));

        //create label
        $label = document.createElement("label");
        $label.setAttribute("class", "form-check-label");

        //append children as necessary
        $label.appendChild($input);
        $label.appendChild(document.createTextNode(data[key]));
        //$container.appendChild($input);
        $container.appendChild($label);
        $list.appendChild($container);

        $input.addEventListener("change", fetchData, false);


    }

    //fetchData();
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