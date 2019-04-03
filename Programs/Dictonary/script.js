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

// Variables & Constants Declaration
const dictionary = document.querySelector('#dictionary'); form = dictionary.querySelector('form'); input = form.querySelector('input');
typeH = dictionary.querySelector('#type'); relatedWordsH = dictionary.querySelector('#relatedWords');  
searchedWordH = dictionary.querySelector('#searchedWord'); findWordsH = document.querySelector("#findwords"); suggestionsH = document.querySelector('#suggestions');
content = document.querySelector('#content');
form.onsubmit = function(e)
{
    e.preventDefault();
    word = input.value;
    input.value = "";
    changer(word);
}

function changer(w)
{ 
        if(w !=="")
        {
            word = w;
            display();
        }
}
// Calling at the Loading
changer('hate');

// Showing Searched Content
function display()
{
    let json = getData(word);
    json.then(res =>
    {
        console.log(res);
        if(res[0].fl === undefined)
            showOtherWords(res);
        else
        {
            suggestionsH.style = "display : none";   // Hiding Suggestions or find words
            relatedWordsH.style = "display : flex";

            clearDisplay(); // clearing display

            res.forEach((resource)=>
            {
            // create Elements
            let div = document.createElement("div");
            let h3 = document.createElement('h3');
            let ol = document.createElement('ol');
            div.classList.add("definitions");

            let h3text = resource.hwi.hw+" ("+resource.fl+") ";
            h3.textContent = h3text;

            let type = res[0].fl;                  // returns string
            let definitions = resource.shortdef;      // returns an array
            let relatedWords = res[0].meta.stems;   // returns an array;
            let relatedWordsWithType = res[0].uros; // returns an array, each item has ure(related word) & fl(type)

            searchedWordH.innerHTML = "";
    
            relatedWordsH.textContent = "";


            // Filling Text and Displaying
            searchedWordH.innerHTML = word;

            definitions.forEach(meaning=>
            {
                let li = document.createElement('li');
                li.append(document.createTextNode(meaning));
                ol.append(li);
            });
            div.append(h3);
            div.append(ol);
            content.append(div);
            relatedWords.forEach(word=>
            {

                let li = document.createElement('li');
                li.append(document.createTextNode(word));
                li.classList.add("breadcrumb-item");
                relatedWordsH.append(li);
            });
            })
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
    relatedWordsH.textContent = "";
    let definitionsH = dictionary.querySelectorAll('.definitions');
    definitionsH.forEach(def=>
    {
        def.remove();
    })
}

dictionary.addEventListener('click',e=>
{
    if(e.target.classList[1] === "find-word")
    {
        let text = e.target.textContent;
        changer(text);
    }
});
