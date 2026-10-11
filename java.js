const search_form =document.querySelector(".search_form");

const input = document.querySelector(".input");

const imag_continer =document.querySelector(".image_continer");

const LoadMore = document.querySelector(".load_more_btn");

let page = 1;

async function  image_fetch(input_value, pageNo){
    try {
    if(pageNo === 1){
        imag_continer.innerHTML = "";
    }
    const api_key = "nu74ZsrGOA7uAM_jQCHLdiOvaQYPWk150i_n1U78A7Q";

    const api_url = `https://api.unsplash.com/search/photos/?query=${input_value}&per_page=28&page=${pageNo}&client_id=${api_key}`;

    const response = await fetch(api_url);

    const data = await response.json();

    data.results.forEach(photo => {
        //creat iamgeElement div
        const imageElement = document.createElement("div");
        imageElement.innerHTML = `<img src="${photo.urls.small}">`;
        imag_continer.appendChild(imageElement);

        // creat overlayElement div 

        const overlayElement = document.createElement('div');
        overlayElement.classList.add("overlay");

        // crear overlayText

        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;
        imageElement.appendChild(overlayElement);
        imag_continer.appendChild(imageElement);
        overlayElement.append(overlayText);
        console.log(overlayElement);
    });
    
    if(data.total_pages == pageNo){
        LoadMore.style.display = "none";
    }else{
        LoadMore.style.display = "inline";
    }

    } catch (error) {
        imag_continer.innerHTML = "<h2> ERR_INTERNET_DISCONNECTED </h2> ";
    }
}

search_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputText = input.value.trim();
    if(inputText != ""){
        page = 1;
        image_fetch(inputText, page);
    }else{
        imag_continer.innerHTML = "<h2>please enter your image</h2> ";
    }
})

LoadMore.addEventListener("click", ()=>{
    image_fetch(input.value.trim(), ++page);
})