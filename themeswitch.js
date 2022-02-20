const checkbox = document.getElementById('styleChk');
let navbar = document.querySelector("#navToggle")

// save function to save checked box into local storage
function save(){
    localStorage.setItem('themeSwitch', checkbox.checked);
}

// load function gets data from local storage and assigns it to checkbox id
function load(){
    var checked = localStorage.getItem('themeSwitch');
    checkbox.checked = checked;
}    //checkbox.checked = localStorage

// function that adds bootstrap darkmode class to navbar and removes lightmode class
function enableDarkMode(){
    navbar.classList.remove('navbar-light')
    navbar.classList.add('navbar-dark')
}
// function that add bootstrap lightmode class and removes darkmode class from navbar
function disableDarkMode(){
    navbar.classList.remove('navbar-dark');
    navbar.classList.add('navbar-light');
}



checkbox.addEventListener('click', () => {
    // loads dark theme when user checks checkbox
    if(localStorage.themeSwitch == 'true'){
        load();
        document.body.classList.add('dark');
        enableDarkMode();
    }
    // loads light theme when user unchecks checkbox
    else if(localStorage.themeSwitch == 'false'){
        document.body.classList.remove('dark');
        disableDarkMode();
    }
});

// if statement that initally loads darkmode theme if localstorage returns string true
if(localStorage.themeSwitch == 'true'){
    load();
    document.body.classList.add('dark');
    enableDarkMode();
}
// else if statement that initally loads lightmode theme if localstorage returns false
else if(localStorage.themeSwitch == 'false'){
    document.body.classList.remove('dark');
    disableDarkMode();
}




console.log(checkbox.checked)
    