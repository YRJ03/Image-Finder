document.addEventListener('DOMContentLoaded', () => {
    const ACCESS_TOKEN = "rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc";
    const inputValue = document.getElementById('inputBox');
    const btn = document.getElementById('submitButton');
    let val = '';
    let page = 1;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        page = 1;
        document.getElementById('boxes').innerHTML = '';
        val = inputValue.value;
        inputValue.value = '';
        getData(val);
    });

    async function getData(val) {
        let response = await fetch(
            `https://api.unsplash.com/search/photos?query=${val}&client_id=${ACCESS_TOKEN}&page=${page}`
        );

        let result = await response.json();
        if (result.results.length < 1) {
            document.getElementById("boxes").innerHTML = `<h2 class="no-results">No Results Found</h2>`;
            document.getElementById("loadMore").classList.remove("visible");
            document.getElementById("pageFound").classList.add("pageVisible");
        } else {
            displayImg(result);
            document.getElementById("loadMore").classList.add("visible");
            document.getElementById("pageFound").classList.remove("pageVisible");
        }
    }

    function displayImg(res) {
        res.results.map((data) => {
            let div = document.createElement("div");
            div.setAttribute("id", "box");
            div.innerHTML =
                `<div class="box">
                    <div id="userInfo">
                        <img src=${data.user.profile_image.large} alt="image" id="profileImg">
                        <p id="proName">${data.user.name}</p>
                    </div>

                    <div id="imageInfo">
                        <img src=${data.urls.regular} alt="image" id="mainImg">
                        <p imgDec>${data.alt_description}</p>
                    </div>
                </div>`;
            
            document.getElementById("boxes").appendChild(div);
        });
    }

    document.getElementById('loadMore').addEventListener('click', () => {
        page++;
        getData(val);
    });
});
