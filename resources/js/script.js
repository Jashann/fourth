window.onload = contentLoaded;

let nShow = false;
let sShow = false;
let clicked = false;

function contentLoaded() {
    // Start of Smooth Scrolling
    $('#header nav a').on('click', function (e) {
        e.preventDefault();
        // e.target === this; here
        let HASH = this.hash;
        if (HASH !== "") {
            if (window.innerWidth > 769)
                $('html,body').animate({
                    scrollTop: $(HASH).offset().top - 63
                }, 800);
            else
                $('html,body').animate({
                    scrollTop: $(HASH).offset().top - 92
                }, 800);

        }

    });

    // End of Smooth Scrolling


    //  Start of mobile header
    const headerM = document.querySelector(".container-m");

    header.onclick = function (e) {
        let target = e.target.id;

        if (target == "nav-tog") {
            let navbar = document.querySelector("header #navbar");
            clicked = true;
            if (!nShow) {
                if (sShow) {
                    searchbar.style.display = "none";
                    sShow = false;
                }
                navbar.style.display = "block";
                nShow = true;
            } else {
                navbar.style.display = "none";
                nShow = false;
            }
        }
        if (target == "search-i") {
            let searchbar = document.querySelector("#searchbar");
            clicked = true;
            if (!sShow) {
                if (nShow) {
                    navbar.style.display = "none";
                    nShow = false;
                }
                searchbar.style = "display : block";
                sShow = true;
            } else {
                searchbar.style = "display : none";
                sShow = false;
            }

        }
    } //End of header

    //  Start of Services
    //    const section4 = document.querySelector("#section-4"); 
    //    section4.addEventListener('click',hideOrShow);
    //    function hideOrShow(e)
    //    {
    //        if(e.target.tagName=="IMG")
    //        {
    //            let img = e.target;
    //            let service = img.parentElement;
    //            const p = service.querySelector("p");
    //            if(!p.classList.contains('open'))
    //                p.classList.add('open');
    //            else
    //                p.classList.remove('open');
    //            
    //        }
    //    }
    $('.services').on('click', function () {
        $(this).find('p').slideToggle();
    });

    //  End of Services


    //START OF BOOKMARKER
    loadItems();
    //   Start of add 
    document.querySelector('#add-btn').addEventListener('click', function (e) {
        e.preventDefault();
        let input = document.querySelector('#add-in').value;
        if (input !== "") {
            let arr;
            if (localStorage.getItem('items') !== null)
                arr = JSON.parse(localStorage.getItem('items'));
            else
                arr = [];

            arr.push(input);

            localStorage.setItem('items', JSON.stringify(arr));

            let li = document.createElement('li');
            let h5 = document.createElement('h5');
            let btn = document.createElement('button');
            li.classList = 'container-in item';
            h5.textContent = input;
            btn.classList = 'delete';
            btn.innerText = "Delete";
            li.append(h5);
            li.append(btn);
            document.querySelector('#bookmarker #lis').append(li)
            document.querySelector('#add-in').value = '';
        }
    });
    //   End of add

    //   Start of load
    function loadItems() {
        let arr;
        if (localStorage.getItem('items') !== null) {
            arr = JSON.parse(localStorage.getItem('items'));
            arr.forEach(function (item) {
                let li = document.createElement('li');
                let h5 = document.createElement('h5');
                let btn = document.createElement('button');
                li.classList = 'container-in item';
                h5.textContent = item;
                btn.classList = 'delete';
                btn.innerText = "Delete";
                li.append(h5);
                li.append(btn);
                document.querySelector('#bookmarker #lis').append(li);
            });
        }
    }
    //    End of load

    //   Start of Search
    const searchItem = document.querySelector('input#search-item');

    searchItem.onkeydown = function (e) {
        let arr = document.querySelectorAll('#bookmarker .item h5');
        let valLow = searchItem.value.toLowerCase();
        if (arr !== null) {
            arr.forEach(function (h5) {
                var txt = h5.textContent.toLowerCase();
                if (window.innerWidth > 769) {
                    if (txt.includes(valLow))
                        h5.parentElement.style.display = 'flex';
                    else
                        h5.parentElement.style.display = 'none';
                } else {
                    if (txt.includes(valLow))
                        h5.parentElement.style.display = 'block';
                    else
                        h5.parentElement.style.display = 'none';
                }
            });

        }
    }
    //    End of Search

    //    Start of Remove
    document.querySelector('#bookmarker').onclick = function (e) {
        let target = e.target;
        e.preventDefault();
        if (target.className === 'delete') {
            if (confirm('Are You Sure You Want To Delete') === true) {
                let arr;
                if (localStorage.getItem('items') !== null)
                    arr = JSON.parse(localStorage.getItem('items')); {
                    let li = target.parentElement;
                    let itemName = li.firstElementChild.textContent;
                    arr = arr.filter(function (item) {
                        if (item !== itemName)
                            return true;
                    });
                    localStorage.setItem('items', JSON.stringify(arr));
                    li.remove();
                }
            }
        }
    }
    //    End of Remove
    //END OF BOOKMARKER

    //START OF AGE CALCULATOR]
    if (document.querySelector('.ageform') !== null)
        document.querySelector('.ageform').addEventListener('submit', function (e) {
            e.preventDefault();
            const bdate = document.querySelector('input#bdate').value;
            const h3 = document.querySelector('#section-6 div h3');
            const loading = document.querySelector('#section-6 div img');
            if (bdate !== "") {
                // declaring variables
                let bYear, bMonth, bDay, cDate, cYear, cMonth, cDay, oYear, oMonth, oDay;

                //Getting values from bdate in String form & prasing into Float
                bYear = parseFloat(bdate.substring(0, 4));
                bMonth = parseFloat(bdate.substring(5, 7));
                bDay = parseFloat(bdate.substring(8, 10));
                //Getting current dates from the System
                cDate = new Date;
                cYear = cDate.getFullYear();
                cMonth = cDate.getMonth() + 1;
                cDay = cDate.getDate();
                //Calculating how old 
                oYear = cYear - bYear;
                if (bMonth >= cMonth) {
                    oYear--;
                    oMonth = (12 + cMonth) - bMonth;
                } else
                    oMonth = cMonth - bMonth;

                // oDay = parseFloat(oYear/4);
                // console.log(oDay);
                for (let i = bYear; i < cYear; i++) {
                    if ((i % 4 === 0 || i % 400 === 0) && i % 100 !== 0)
                        oDay++;
                }

                if (cDay >= bDay)
                    oDay = cDay - bDay;
                else {
                    oMonth--;
                    oDay = (31 + cDay) - bDay;

                    if (oMonth < 0) {
                        oMonth = 11;
                        oYear--;
                    }
                }
                const results = document.getElementById('results');
                h3.style.display = 'none';
                loading.style.display = 'block';
                setTimeout(function showresults() {
                    if (isFinite(oYear) && isFinite(oMonth) && isFinite(oDay)) {
                        let monthsY = Math.round(oMonth + (oYear * 12));
                        let monthsW = parseInt(oDay / 7);
                        let monthsD = Math.round(oDay % 7);
                        let weeksW = Math.round((monthsY * 4.34524) + monthsW);
                        let weeksD = Math.round((monthsY % 7) + monthsD);
                        let yDays = 365;
                        if ((cYear % 4 === 0 || cYear % 400 === 0) && cYear % 100 !== 0)
                            yDays = 366;

                        let name = document.querySelector('#section-6 #name').value;
                        if (name === "")
                            results.textContent = "Results : "
                        else
                            results.textContent = name;
                        let nxBd = yDays - Math.round((oMonth * 4.34524 * 7) + oDay);
                        loading.style.display = 'none';
                        document.querySelector('#section-6 .results').style.display = 'block';
                        document.querySelector('#section-6 .results #years').value = `${oYear} years, ${oMonth} months, ${oDay} days`;
                        document.querySelector('#section-6 .results #months').value = `${monthsY} months, ${monthsW} weeks, ${monthsD} days`;
                        document.querySelector('#section-6 .results #weeks').value = `${weeksW} weeks, ${weeksD} days`;
                        document.querySelector('#section-6 .results #nxbd').value = `${nxBd} Remaining Days`;
                    }
                }, 2000);
            } // End of if block
            else {
                loading.style.display = 'block';
                setTimeout(function showresults() {
                    h3.style.display = 'block';
                    h3.style = 'color : red';
                    h3.textContent = 'Error(Incorrect Input)';
                    document.querySelector('#section-6 .results').style.display = 'none';
                    loading.style.display = 'none';
                }, 2000);
            }
        });
    //END OF AGE CALCULATOR

    //Start OF Word Guessing
    let game = document.querySelector('#guess-g');
    let guessleft = 3;
    game.onclick = function (e) {
        e.preventDefault();
        const input = document.querySelector("#input-g");
        const words = [];
        let randomNum = 0,
            randomWord = '';
        const spans = document.querySelectorAll("#guess-g #words span");
        // spans into array
        spans.forEach(function (span, i) {
            words[i] = span.textContent.toLowerCase();
        });
        // generate random 
        randomNum = parseInt(Math.random() * (words.length + 1));
        randomWord = words[randomNum];
        // Span into input
        if (e.target.tagName === 'SPAN')
            input.value = e.target.innerText;
        // Adding an event listener to input and checking
        if (e.target.tagName === 'BUTTON') {
            let userChoice = input.value.toLowerCase();
            if (userChoice === randomWord)
                showMsg('you chose right,YOU WON !!', 'green', 0);
            else {
                guessleft--;
                showMsg(`your chose (${userChoice}) was wrong ,YOU LOST !! Choices left : ${guessleft}`, 'red', guessleft);
                console.log(guessleft);
            }

            function showMsg(msg, col, cleft) {
                input.style.border = `1.5px solid ${col}`;
                document.querySelector('#win').textContent = msg;
                if (cleft <= 0) {
                    document.querySelector('#rword').textContent = `The random word : ${randomWord}`;
                    document.querySelector('#section-7 .message h3').textContent += " Game Over";
                    let btn = document.querySelector("#section-7 button");
                    btn.textContent = "Play Again";
                    btn.className += 'play-again';
                }
            }
            game.addEventListener('mousedown', function (e) {
                if (e.target.className.includes('play-again'))
                    window.location.reload();
            });

        };
    } //End OF Word Guessing

    // Start of the Movie List

    class Movie {
        constructor(title, cast, dir) {
            this.title = title;
            this.cast = cast;
            this.dir = dir;
        }
    }

    class UI {
        // Adding into UI 
        addMovieToList(movie) {
            // Creating Various Elements
            let dtitle = (document.createElement('td'));
            let dcast = document.createElement('td');
            let ddir = document.createElement('td');
            let dx = document.createElement('td');
            let tr = document.createElement('tr');
            // Putting data into table row
            tr.innerHTML =
                `<td>${movie.title}</td>
            <td>${movie.cast}</td>
            <td>${movie.dir}</td>
            <td class="delete">X</td>`
            // Appending tr to tbody
            document.querySelector('#section-7 table tbody').appendChild(tr);
        }
        clearInputs() {
            let allInputs = document.forms['form-m'].querySelectorAll("input[type='text']");
            allInputs.forEach(function (input) {
                input.value = '';
            });
        }
        showAlert() {
            let h3 = document.createElement('h3');
            h3.id = 'alert';
            h3.appendChild(document.createTextNode('Please fill all inputs'));
            h3.style = 'color:red';
            document.querySelector('#section-7 .container-full > div:nth-child(2)').insertBefore(h3, document.querySelector('#form-m'));
            setTimeout(function () {
                document.querySelector('#alert').remove();
            }, 3000);
        }
    } // End of UI class


    class Store {
        addMovieToLS(movie) {
            let store = new Store();
            let array = [];
            if (store.getMovies() !== null) {
                array = store.getMovies();
                array.push(movie);
                localStorage.setItem('movies', JSON.stringify(array));
            } else {
                array[0] = movie;
                localStorage.setItem('movies', JSON.stringify(array));
            }
        }
        getMovies() {
            let array;
            if (localStorage.getItem('movies') !== null) {
                array = JSON.parse(localStorage.getItem('movies'));
                return array;
            }
            return null;
        }
        loadMovies() {
            let store = new Store();
            if (store.getMovies() !== null) {
                let array = store.getMovies();
                let ui = new UI();
                array.forEach(function (movie) {
                    ui.addMovieToList(movie);
                });
            }
        }
        removeMovieFromLS(title) {
            let i = 0;
            let array = store.getMovies();
            array.forEach(function (movie, index) {
                if (movie.title.toLowerCase() === title.toLowerCase()) {
                    array.splice(index, 1);
                }
            });
            console.log(array);
            localStorage.setItem('movies', JSON.stringify(array));
        }
    }
    let store = new Store();
    store.loadMovies();

    document.forms['form-m'].addEventListener('submit', function (e) {
        e.preventDefault();
        let ui = new UI();
        let allInputs = document.forms['form-m'].querySelectorAll("input[type='text']");
        if (allInputs[0].value === '' || allInputs[1].value === '' || allInputs[2].value === '')
            ui.showAlert();
        else {
            let movie = new Movie(allInputs[0].value, allInputs[1].value, allInputs[2].value);
            let store = new Store();
            ui.addMovieToList(movie);
            store.addMovieToLS(movie);
            ui.clearInputs();
        }
    });
    document.querySelector('#section-7 table').onclick = function (e) {
        let target = e.target;
        if (target.className === 'delete') {
            let title = target.parentElement.children[0].textContent; // returns title
            store.removeMovieFromLS(title);
            target.parentElement.remove();
        }
    }
    // End of the Movie List

    getResponse();
    // Start of Get Response
    function getResponse()
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET","https://api.exchangeratesapi.io/latest?base=USD ",true);
        xhr.onload = function()
        {
            if(this.status===200)
            {
                    const selectF = document.querySelector('#cf-select');
                    const selectT = document.querySelector('#ct-select');
                    const response = JSON.parse(xhr.responseText);
                    const rates = response.rates; // Stores Currency Name as Key & Currency Rate as value
                    let currencyNames = Object.keys(rates);   // Stores Currency Name in array e.g INR,USD so forth
                    const currencyRates = Object.values(rates) // Stores currency rates in array
                    let selectFIndex = 0;
                    let selectTIndex = 0;
                    let sCurrencyFRate = 0;
                    let sCurrencyFName = 0;
                    let sCurrencyTRate = 0;
                    let sCurrencyTName = 0;
                    let inputF = document.querySelector('input#amount');
                    let inputT = document.querySelector('input#result');
                    const base = response.rates['USD'];  // Base is always 1;
                    // Start of Load Currency
                    // calling loading function after dom is loaded
                    loadCurrency();

                    function loadCurrency()
                    {
                        // console.log(response);
              
                        currencyNames.forEach(function(key) // Key refers to currency of a country e.g INR,USD so forth
                        {
                            selectF.innerHTML += `<option value=${key}> ${key} </option>`;
                            selectT.innerHTML += `<option value=${key}> ${key} </option>`;
                        });
                        }
                        // End of Load Currency
                        
                        // When value of any of two select tag changes find index of keys
                        selectF.addEventListener('change',function()
                        {
                            selectFIndex = selectF.selectedIndex;
                            sCurrencyFName = currencyNames[selectFIndex];
                            sCurrencyFRate = currencyRates[selectFIndex];
                            sCurrencyFBase = base/sCurrencyFRate;
                            clearAmt();
                        });
                        selectT.addEventListener('change',function()
                        {
                            selectTIndex = selectT.selectedIndex;
                            sCurrencyTName = currencyNames[selectTIndex];
                            sCurrencyTRate = currencyRates[selectTIndex];
                            clearAmt();
                        });

                        // clearning input amt on focus
                        inputF.onfocus = clearAmt;
                        function clearAmt(){
                            inputF.value = '';
                        };

                        // Start of Form Submit
                        document.querySelector('form.card').addEventListener('submit',function(e)
                        {
                            e.preventDefault();
                            let amt = inputF.value;
                            let amtUSD = amt*sCurrencyFBase;
                            let converted = amtUSD*sCurrencyTRate;
                            inputF.value = "";
                            inputF.value = `${amt}       [${sCurrencyFName}]`;
                            inputT.value = `${converted}       [${sCurrencyTName}]`;
                        }); // End of Form Submit
            } // End of if block (status===200)
        }   // End of onload block
        xhr.send();
    } // End of Get Response


} //End of contentLoaded

// Start of Window Size Function
function size() {
    let w = window.innerWidth;
    if ((sShow === true || nShow === true) && w >= 958 && clicked === true) {
        document.querySelector("#navbar").style.display = 'block';
        document.querySelector("#searchbar").style.display = 'block';
        sShow = false;
        nShow = false;
    }
    if ((sShow === false || nShow === false) && w <= 568 && clicked === true) {
        document.querySelector("#navbar").style.display = 'none';
        document.querySelector("#searchbar").style.display = 'none';
        sShow = true;
        nShow = true;
    }
}
document.body.onresize = size;
// End of Window Size Function