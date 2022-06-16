const urlGen = (query, limit = 30) => {
    return `https://api.giphy.com/v1/gifs/search?api_key=FHk6jUO6NkZMD3zUDAmFlDUuCQrNX16L&q=${query}&limit=${limit}&offset=0&rating=g&lang=en`;
}

getData = (url) => {
    const wrapper = document.getElementById("results-wrapper");
    (async () => {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data.data);
        data.data.forEach(gif => {
            wrapper.innerHTML += `
        <div class="w-11/12 bg-gray-600 mx-auto py-14 px-10 rounded-lg shadow">
            <iframe src="${gif.embed_url}" class="w-full"></iframe>
        </div>
        `
        })
    })();
}


window.onload = () => {
    const form = document.getElementById("giphy-form");
    form.addEventListener('submit', event => {
        event.preventDefault();
        const searchInput = document.getElementById("search-input").value;
        getData(urlGen(searchInput, 10));
    });
}