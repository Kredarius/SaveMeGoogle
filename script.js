btn.addEventListener("click", getData);

let result;

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

    result = document.createElement("div");
    result.className = "result";

    if (+response.status === 200) {   
        const json = await response.json();

        let ul = document.createElement("ul");
        result.append(ul);
        for (item of json.items) {
            let li = document.createElement("li");
            li.innerText = item.title;

            let link = document.createElement("a");
            link.innerHTML = "Link";
            link.href = item.link;
            li.append(link);
            ul.append(li);
        }
        
        result.append(makeJSONDownload(json.items));

    } else {

        result.innerText = `Search "${searchText}" failed with status ${response.status}`;
    }

    document.body.append(result);
    document.body.style.backgroundColor = "";
    }

function makeJSONDownload(data) {
    let downloadLink = document.createElement("a");
    let blob = new Blob([JSON.stringify(data)], {type: 'application/json'});

    downloadLink.innerText = "Download as JSON";
    downloadLink.download = "search-results.json";
    downloadLink.href = URL.createObjectURL(blob);
}