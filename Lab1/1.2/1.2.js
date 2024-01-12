let image = document.getElementsByClassName("img")[0];
let image_caption = document.getElementById("image_caption");

function image2019() {
    image.src = "2019.png";
    image.alt = "Australians pet ownership in 2019";
    image_caption.innerHTML = "Figure 1: Pet owned by Australians in 2019. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>";

}

function image2021() {
    image.src = "2021.png";
    image.alt = "Australians pet ownership in 2021";
    image_caption.innerHTML = "Figure 2: Pet owned by Australians in 2021. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>";
}

function image2019vs2021() {
    image.src = "2019vs2021.png";
    image.alt = "Compare Australians pet ownership in 2019 and 2021";
    image_caption.innerHTML = "Figure 3: Compare Australians pet ownership in 2019 and 2021. Data Source: <a href='https://animalmedicinesaustralia.org.au/wp-content/uploads/2021/08/AMAU005-PATP-Report21_v1.41_WEB.pdf'>Animal Medicines Australia Report</a>";
}