var images_array = [];
gallery_filter();

function gallery_filter(keyword) {
    images_array = [];
    for (var i = 1; i <= 30; i++) {
        if (keyword == null) {
            images_array.push("hobbies/Amandeep/hobby-food-" + ' ' + '(' + i + ')' + ".jpg");

        } else if (keyword == 'all') {
            images_array.push("hobbies/Amandeep/hobby-food-" + ' ' + '(' + i + ')' + ".jpg");

        } else {
            images_array.push("hobbies/hobby-" + keyword + "-" + ' ' + '(' + i + ')' + ".jpg");
        }

    }
    imagestocker();
}


function image_size_controller(index, mode) {
    if (mode == 'medium') {
        document.body.innerHTML += `<div class="size-container"><img id="zoomedimage" onclick="image_size_controller(${index}, 'large')" class="image-src-medium" src="${images_array[index]}"></div>"`;
    } else if (mode == 'large') {
        document.getElementById("zoomedimage").className = "image-src-large";
        document.getElementById("zoomedimage").setAttribute("onclick", "image_size_controller(" + index + ", 'full-screen')");
    } else if (mode == 'full-screen') {
        document.getElementById("zoomedimage").className = "image-src-fullscreen";
        document.getElementById("zoomedimage").setAttribute("onclick", "image_size_controller(" + index + ", 'exit')");
    } else if (mode == 'exit') {
        var elements = document.getElementsByClassName("size-container");
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function backward(index) {
    if (index > 0) {
        var temp = images_array[index];
        var index_next = index - 1

        images_array[index] = images_array[index_next];
        images_array[index_next] = temp;
        imagestocker();
    }
}

function fastforward(index) {
    var temp = images_array[index];
    images_array.splice(index, 1);
    images_array.push(temp);
    imagestocker();

}

function forward(index) {
    var temp = images_array[index];
    var index_next = index + 1

    images_array[index] = images_array[index_next];
    images_array[index_next] = temp;
    imagestocker();
}

function rewind(index) {
    var temp = images_array[index];
    images_array.splice(index, 1);
    images_array.unshift(temp);
    imagestocker();
}

function imagestocker() {
    console.log(images_array);

    document.getElementById("image-list").innerHTML = null;
    var i;
    for (i = 0; i < images_array.length; i++) {
        var current_image = images_array[i];

        var image = `<div class="container">
        <img indexno="${i}" src="${current_image}" alt="Image not found" class="image">
        <div class="overlay">
            <div class="image-button">
            <i class="first" onclick="rewind(${i})"></i>
            <i class="backward" onclick="backward(${i})"></i>
            <i class="zoom" onclick="image_size_controller(${i},'medium')"></i>
            <i class="forward" onclick="forward(${i})"></i>
            <i class="last" onclick="fastforward(${i})"></i>
            </div>
        </div>
    </div>`;
        document.getElementById("image-list").innerHTML += image;
    }
}