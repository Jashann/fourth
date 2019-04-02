// Getting Data
const key = '4717cd5b-0579-465b-9bb9-df453c75c7cc';
let word = 'hate';
getData();

async function getData(word)
{
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
    const json = await response.json();
    return json;
}
// Structuring UI  

// Getting Word 
const dictionary = document.querySelector('#dictionary'); form = dictionary.querySelector('form'); input = form.querySelector('input');
definitionsH = dictionary.querySelector('#definitions'); typeH = dictionary.querySelector('#type'); relatedWordsH = dictionary.querySelector('#relatedWords');  
searchedWordH = dictionary.querySelector('#searchedWord'); findWordsH = document.querySelector("#findwords"); suggestionsH = document.querySelector('#suggestions');
form.onsubmit = function(e)
{
    e.preventDefault();
    word = input.value;
    changer();
}

function changer()
{ 
        input.value = "";
        if(word !=="")
        display()
}
// Calling at the Loading
changer();

// Showing Searched Content
function display()
{
    let json = getData(word);
    json.then(res =>
    {
        console.log(res);
        console.log(res[0]);
        if(res[0].fl === undefined)
            showOtherWords(res);
        else
        {
            suggestionsH.style = "display : none";   // Hiding Suggestions or find words
            relatedWordsH.style = "display : flex";

            clearDisplay(); // clearing display

            let type = res[0].fl;                  // returns string
            let definitions = res[0].shortdef;      // returns an array
            let relatedWords = res[0].meta.stems;   // returns an array;
            let relatedWordsWithType = res[0].uros; // returns an array, each item has ure(related word) & fl(type)

            searchedWordH.innerHTML = "";
            typeH.textContent = "";
            relatedWordsH.textContent = "";
            definitionsH.innerHTML = "";


            // Filling Text and Displaying
            searchedWordH.innerHTML = word;
            typeH.textContent = type;
            definitions.forEach(meaning=>
            {
                let li = document.createElement('li');
                li.append(document.createTextNode(meaning));
                definitionsH.append(li);
            });
            relatedWords.forEach(word=>
            {
                let li = document.createElement('li');
                li.append(document.createTextNode(word));
                li.classList.add("breadcrumb-item");
                relatedWordsH.append(li);
            });
        }
    })
    .catch(err => console.log(err));  
} // display function end
function showOtherWords(res)
{
    clearDisplay();
    res.forEach(word =>
        {
            suggestionsH.style = "display : block";
            relatedWordsH.style = "display : none";
            let li = document.createElement('li');
            li.append(document.createTextNode(word));
            li.classList.add("breadcrumb-item","find-word");
            findWordsH.append(li);
        });
}

function clearDisplay()
{
    findWordsH.textContent = "";
    searchedWordH.innerHTML = "";
    typeH.textContent = "";
    relatedWordsH.textContent = "";
    definitionsH.textContent = "";
}
