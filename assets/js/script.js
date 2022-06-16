const urlGen = (query, limit, offset) => {
    return `https://api.giphy.com/v1/gifs/search?api_key=FHk6jUO6NkZMD3zUDAmFlDUuCQrNX16L&q=${query}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
}

getData = (url) => {
    const showMoreBtn = document.getElementById("show-more-btn");
    const wrapper = document.getElementById("results-wrapper");
    (async () => {
        let res = await fetch(url);
        let data = await res.json();
        data.data.forEach(gif => {
            wrapper.innerHTML += `
        <div class="w-11/12 bg-gray-600 mx-auto py-4 md:py-14 px-10 rounded-lg shadow">
            <iframe src="${gif.embed_url}" class="w-full"></iframe>
        </div>
        `
        })
        showMoreBtn.classList.remove("hidden");
    })();
}


window.onload = () => {
    let page = 0, offset = 0, limit = 20;


    const form = document.getElementById("giphy-form");
    const showMoreBtn = document.getElementById("show-more-btn");
    const searchInput = document.getElementById("search-input");

    form.addEventListener('submit', event => {
        event.preventDefault();
        getData(urlGen(searchInput.value, limit, 0));
    });

    showMoreBtn.addEventListener('click', () => {
        page++;
        offset = page * limit;
        getData(urlGen(searchInput.value, limit, offset));
    });
}