btn.addEventListener("click", getData);

async function getData() {
    const KEY = "AIzaSyDyl1MZJ_Pgw3KYNeoHipZK1rFa8wZP_Wg";
    const CX = "715a88c4d97dc4f10";
    const searchText = input.value;
    let url = new URL('https://www.googleapis.com/customsearch/v1?');

    url.searchParams.set('q', searchText);
    url.searchParams.set('key', KEY);
    url.searchParams.set('cx', CX);

    loadingIndicatorStart();
    
    const response = await fetch(url, {
        method: "GET",
    });

    result = makeResultDiv();

    if (+response.status === 200) {   
        const json = await response.json();

        let ul = document.createElement("ul");
        result.append(ul);
        for (item of json.items) {
            let li = document.createElement("li");
            li.innerText = item.title + " ";

            let link = document.createElement("a");
            link.innerHTML = "Link";
            link.href = item.link;
            li.append(link);
            ul.append(li);
        }
        
        result.append(makeJSONDownload(json.items));

    } else {
        result.append(makeFailureMessage(searchText, response.status))
    }

    document.body.append(result);
    loadingIndicatorEnd();
    }
function 
function makeJSONDownload(data) {
    let downloadLinkAnchor = document.createElement("a");
    let blob = new Blob([JSON.stringify(data)], {type: 'application/json'});

    downloadLinkAnchor.innerText = "Download as JSON";
    downloadLinkAnchor.download = "search-results.json";
    downloadLinkAnchor.href = URL.createObjectURL(blob);

    return downloadLink;
}

function makeResultDiv() {
    let resultDiv = document.createElement("div");
    resultDiv.className = "result";
    return resultDiv;
}

function makeFailureMessage(searchText, status) {
    let paragraph = document.createElement("p");
    paragraph.innerText = `Search "${searchText}" failed with status ${status}`;
    return paragraph;
}

function loadingIndicatorStart() {
    document.body.style.backgroundColor = "gray";
}

function loadingIndicatorEnd() {
    document.body.style.backgroundColor = "";
}
