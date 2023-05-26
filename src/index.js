// write your code here

const baseUrl = "http://localhost:3000/ramens";

//Page Load
document.addEventListener("DOMContentLoaded", async () => {
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        addRamen();
    });
    
    getRamens();
    
});

async function addRamen() {
    const divRamenForm = document.getElementById("new-ramen");
    const ramenName = document.getElementById("new-name").value;
    const ramenRest = document.getElementById("new-restaurant").value;
    const ramenImg = document.getElementById("new-image").value;
    const ramenRating = document.getElementById("new-rating").value;
    const ramenCmt = document.getElementById("new-comment").value;
    
    const fetchBody = {
        name: ramenName,
        restaurant: ramenRest,
        image: ramenImg,
        rating: ramenRating,
        comment: ramenCmt,
    }
    console.log(fetchBody);
    
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(fetchBody)
    };
    
    await fetchData(baseUrl, config);
    
    getRamens();
    
    divRamenForm.reset();
}

//Delete a ramen
async function deleteRamen(ramenId) {
    const config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        //body: JSON.stringify(fetchBody)
    };
    
    await fetchData(`http://localhost:3000/ramens/${ramenId}`, config);
    //getRamens();
    window.location.reload();
}

//Get all ramens and update DOM
async function getRamens() {
    const divRamenMenu = document.getElementById("ramen-menu");
    divRamenMenu.innerHTML = "";
    
    const divBtnDelete = document.createElement("div");
    const btnDelete = document.createElement("button");
    btnDelete.id = "btnDelete";
    btnDelete.textContent = "Delete";
    btnDelete.style.cursor = "pointer";
    btnDelete.type = "submit";
    btnDelete.addEventListener("click", () => deleteRamen(btnDelete.id));
    divBtnDelete.append(btnDelete);
    
    const imgRamenDetail = document.getElementsByClassName("detail-image")[0];
    const h2ImgName = document.getElementById("ramen-detail").getElementsByClassName("name")[0];
    const h3ImgRestaurant = document.getElementById("ramen-detail").getElementsByClassName("restaurant")[0];        
    const pImgRating = document.getElementById("rating-display");
    const pImgComment = document.getElementById("comment-display");
    
    const data = await fetchData(baseUrl, null);
    
    data.forEach(ramen => {
        const imgRamen = document.createElement("img");
        imgRamen.src = ramen.image;
        imgRamen.alt = ramen.name;            
        
        imgRamen.addEventListener("click", () => {
            imgRamenDetail.src = imgRamen.src;
            imgRamenDetail.alt = imgRamen.alt;
            
            h2ImgName.innerText = ramen.name;
            h3ImgRestaurant.innerText = ramen.restaurant;
            
            pImgRating.innerText = ramen.rating;
            pImgComment.innerText = ramen.comment;
            
            btnDelete.id = ramen.id;
            pImgComment.append(divBtnDelete);
        });
        divRamenMenu.append(imgRamen);
    });
}

//Generic Fetch method
async function fetchData(url, config) {
    let data = {};
    await fetch(url, config)
    .then(response => response.json())
    .then(jsResponse =>  data = jsResponse)
    .catch(e => console.log("[Fetch Error] ", e));
    return data;
};
