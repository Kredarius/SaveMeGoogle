btn.addEventListener("click", getData);


async function getData() {
    const KEY = "AIzaSyDyl1MZJ_Pgw3KYNeoHipZK1rFa8wZP_Wg";
    const CX = "715a88c4d97dc4f10";
    const searchText = input.value;
    let url = new URL('https://www.googleapis.com/customsearch/v1?');

    url.searchParams.set('q', searchText);
    url.searchParams.set('key', KEY);
    url.searchParams.set('cx', CX);

    document.body.style.backgroundColor = "gray";

    const response = await fetch(url, {
        method: "GET",
    });

    const json = await response.json();

    let result = document.createElement("ul");
    for (item of json.items) {
        let li = document.createElement("li");
        li.innerText = item.title;
        result.append(li)
    }
    
    let downloadLink = document.createElement("a");
    let blob = new Blob([JSON.stringify(json.items)], {type: 'application/json'});

    downloadLink.innerText = "Download as JSON";
    downloadLink.download = "search-results.json";
    downloadLink.href = URL.createObjectURL(blob);
    
    result.append(downloadLink);

    document.body.append(result);
    document.body.style.backgroundColor = "";
    }