// -----------------------------
// Part 2: JavaScript Basics
// -----------------------------

// 1–2. Numeric addition
var x = 5;
var y = 7;
var z = x + y;
console.log(z);

// 3. String concatenation
var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

// 5–7. Function definition and calls
function sumPrint(x1, x2) {
    console.log(x1 + x2);
}

sumPrint(x, y);
sumPrint(A, B);

// 9–14. Conditional statement
if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}


// -----------------------------
// Arrays + Loops (Alerts)
// -----------------------------

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Banana found!");
            break;
        }
    }
}

function findTheBananaForEach(arr) {
    arr.forEach(function(item) {
        if (item === "Banana") {
            alert("Banana found!");
        }
    });
}

// Commented out after testing (per instructions)
// findTheBanana(L1);
// findTheBanana(L2);
// findTheBananaForEach(L1);
// findTheBananaForEach(L2);


// -----------------------------
// Part 3: Time-Based Greeting
// -----------------------------

var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var message = "";

    if (x < 5 || x >= 20) {
        message = "Good night";
    } else if (x < 12) {
        message = "Good morning";
    } else if (x < 18) {
        message = "Good afternoon";
    } else {
        message = "Good evening";
    }

    var greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.innerHTML = message + ", Welcome to MonoMuse";
    }
}

greeting(hour);


// -----------------------------
// Part 4: Dynamic Footer Year
// -----------------------------

function addYear() {
    var year = new Date().getFullYear();
    var footerYear = document.getElementById("copyYear");

    if (footerYear) {
        footerYear.innerHTML = "© " + year + " MonoMuse. All rights reserved.";
    }
}


// -----------------------------
// Increment 4 Part 4: Active Navigation Bar
// -----------------------------

function ActiveNav() {
    var navLinks = document.querySelectorAll(".nav_bar a");

    navLinks.forEach(function(link) {
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

ActiveNav();


// -----------------------------
// Increment 4 Part 5: Read More / Read Less Toggle
// -----------------------------

$("#readLess").click(function() {
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
});

$("#readMore").click(function() {
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
});


// -----------------------------
// Increment 4 Part 6: Ticket Form Interaction
// -----------------------------

function showPurchaseForm(date) {
    var purchaseForm = document.getElementById("purchaseForm");
    var selectedDate = document.getElementById("selectedDate");

    if (purchaseForm) {
        purchaseForm.style.display = "block";
    }

    if (selectedDate) {
        selectedDate.value = date;
    }
}

function submitPurchase() {
    alert("Redirecting to payment system.");
}