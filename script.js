btn.addEventListener("click", run);

class Search {
    constructor() {
        this.searchText = input.value;
        this.API = {
                'KEY': "AIzaSyDyl1MZJ_Pgw3KYNeoHipZK1rFa8wZP_Wg",
                'CX': "715a88c4d97dc4f10",
                'URL': new URL('https://www.googleapis.com/customsearch/v1?'),
            };
        this.response = undefined;
        this.data = '';
        this.resultElement = undefined;
    }
}

async function run() {
    let search = new Search();
    
    loadingIndicatorStart();  
    await getResponse(search);
    await makeResult(search);
    document.append(resultDiv);
    
    loadingIndicatorEnd();
}

async function getResponse(search) {
    let url = search.API.URL;
    
    url.searchParams.set('q', search.searchText);
    url.searchParams.set('key', search.API.KEY);
    url.searchParams.set('cx', search.API.CX);
    
    const response = await fetch(url, {
        method: "GET",
    });
    
    search.response = response;
}

async function makeResult(response) {
    let resultDiv = makeResultDiv();
    let resultContent;
    if (result.ok) {
        let data = await getData();
        resultContent = makeListWithDownload(data);
    } else {
        resultContent = makeFailureMessage(response.status);
    }
    resultDiv.append(resultContent);
    return resultDiv;
}

async function getData(response) {
    const json = await response.json();
    return json;
}
function makeListWithDownload(data) {
    let listNode = makeList(data);
    listNode.after(makeJSONDownload(data));
    return listNode;
} 
    
function makeList(data) {
    let ul = document.createElement("ul");
    
    for (item of json.items) {
        let li = document.createElement("li");
        li.innerText = item.title + " ";

        let link = document.createElement("a");
        link.innerHTML = "Link";
        link.href = item.link;
        li.append(link);
        ul.append(li);
    }
    
    return ul;
}

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

function makeFailureMessage(status) {
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
