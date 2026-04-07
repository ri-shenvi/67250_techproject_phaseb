/**
 * MonoMuse site JavaScript (course project).
 *
 * External libraries (see HTML <head> on each page for CDN links):
 * - jQuery — https://jquery.com/ (home, exhibitions, membership: animations, gallery, accordion)
 * - Leaflet — https://leafletjs.com/ (explore.html; map tiles © OpenStreetMap contributors)
 * Embedded video: exhibitions.html uses YouTube iframe (YouTube/Google terms apply).
 */

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

    var greetingElement = document.getElementById("timeGreeting") || document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.innerHTML = message + " — welcome to MonoMuse.";
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
// Responsive navigation (hamburger)
// -----------------------------

function toggleNav() {
    var navLinks = document.getElementById("navLinks");
    var btn = document.querySelector(".nav_hamburger");

    if (navLinks) {
        navLinks.classList.toggle("responsive");
    }

    if (btn && navLinks) {
        btn.setAttribute("aria-expanded", navLinks.classList.contains("responsive"));
    }
}

document.querySelectorAll(".nav_hamburger").forEach(function (el) {
    el.addEventListener("click", toggleNav);
});


// -----------------------------
// Part 5: OpenStreetMap + Leaflet
// (See https://leafletjs.com/examples/quick-start/)
// -----------------------------

function initMonoMuseMap() {
    if (typeof L === "undefined") {
        return;
    }

    var mapEl = document.getElementById("map");
    if (!mapEl) {
        return;
    }

    var museumLat = 40.4435;
    var museumLng = -79.945;
    var zoom = 16;

    var map = L.map("map").setView([museumLat, museumLng], zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([museumLat, museumLng])
        .addTo(map)
        .bindPopup("<strong>MonoMuse</strong><br>Conceptual location near Carnegie Mellon University, Pittsburgh.")
        .openPopup();
}

initMonoMuseMap();


// -----------------------------
// Increment 4 Part 5: Read More / Read Less Toggle
// -----------------------------

function initExhibitionGallery() {
    if (typeof jQuery === "undefined") {
        return;
    }

    var $img = $("#gallerySlideImg");
    if (!$img.length) {
        return;
    }

    var $cap = $("#galleryCaption");
    var slides = [
        {
            src: "../static/museum.jpg",
            alt: "Exterior of the MonoMuse building at dusk with illuminated signage on the facade"
        },
        {
            src: "../static/gallery-digital.svg",
            alt: "Stylized abstract graphic in museum colors representing the Digital Dreams exhibition theme"
        },
        {
            src: "../static/gallery-code.svg",
            alt: "Stylized abstract graphic suggesting code and layout for the Code and Canvas exhibition theme"
        }
    ];

    var index = 0;

    function showAt(i) {
        index = (i + slides.length) % slides.length;
        var s = slides[index];
        $img.fadeOut(180, function() {
            $img.attr("src", s.src).attr("alt", s.alt);
            if ($cap.length) {
                $cap.text("Image " + (index + 1) + " of " + slides.length + ": " + s.alt);
            }
            $img.fadeIn(180);
        });
    }

    $("#galleryPrev").on("click", function() {
        showAt(index - 1);
    });

    $("#galleryNext").on("click", function() {
        showAt(index + 1);
    });

    if ($cap.length) {
        $cap.text("Image 1 of " + slides.length + ": " + slides[0].alt);
    }
}

function initMembershipAccordion() {
    if (typeof jQuery === "undefined") {
        return;
    }

    var $root = $(".membership-accordion");
    if (!$root.length) {
        return;
    }

    $root.find(".accordion-trigger").on("click", function() {
        var $btn = $(this);
        var panelId = $btn.attr("aria-controls");
        var $panel = $("#" + panelId);
        $panel.slideToggle(220, function() {
            $btn.attr("aria-expanded", $panel.is(":visible"));
        });
    });
}

if (typeof window.jQuery !== "undefined") {
    $(function() {
        $("#readLess").on("click", function() {
            $("#longIntro").slideUp(280);
            $("#readLess").hide();
            $("#readMore").show();
        });

        $("#readMore").on("click", function() {
            $("#longIntro").slideDown(280);
            $("#readLess").show();
            $("#readMore").hide();
        });

        initExhibitionGallery();
        initMembershipAccordion();
    });
}


// -----------------------------
// Ticket checkout (validation, total, confirmation redirect)
// -----------------------------

var TICKET_UNIT_PRICE = 18;

var TICKET_TYPE_LABELS = {
    general: "General",
    student: "Student",
    member: "Member"
};

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clearCheckoutErrors() {
    var form = document.getElementById("checkoutForm");
    if (!form) {
        return;
    }

    form.querySelectorAll(".field-error").forEach(function (el) {
        el.textContent = "";
    });

    form.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
    });
}

function setCheckoutError(inputId, errSpanId, message) {
    var input = document.getElementById(inputId);
    var err = document.getElementById(errSpanId);

    if (err) {
        err.textContent = message;
    }

    if (input) {
        input.setAttribute("aria-invalid", "true");
    }
}

function validateCheckoutForm() {
    var ok = true;
    var firstInvalid = null;

    var visitDate = document.getElementById("visitDate");
    var ticketType = document.getElementById("ticketType");
    var quantity = document.getElementById("quantity");
    var email = document.getElementById("email");
    var zipCode = document.getElementById("zipCode");

    if (!visitDate || !visitDate.value) {
        setCheckoutError("visitDate", "err-visitDate", "Please choose a visit date.");
        ok = false;
        firstInvalid = firstInvalid || visitDate;
    } else if (visitDate.min && visitDate.value < visitDate.min) {
        setCheckoutError("visitDate", "err-visitDate", "Visit date cannot be in the past.");
        ok = false;
        firstInvalid = firstInvalid || visitDate;
    }

    if (!ticketType || !ticketType.value) {
        setCheckoutError("ticketType", "err-ticketType", "Please select a ticket type.");
        ok = false;
        firstInvalid = firstInvalid || ticketType;
    }

    var qtyRaw = quantity ? quantity.value.trim() : "";
    var qtyNum = parseInt(qtyRaw, 10);
    if (!quantity || qtyRaw === "" || !/^\d+$/.test(qtyRaw)) {
        setCheckoutError("quantity", "err-quantity", "Enter the number of tickets (1–10).");
        ok = false;
        firstInvalid = firstInvalid || quantity;
    } else if (isNaN(qtyNum) || qtyNum < 1 || qtyNum > 10) {
        setCheckoutError("quantity", "err-quantity", "Quantity must be a whole number from 1 to 10.");
        ok = false;
        firstInvalid = firstInvalid || quantity;
    }

    var emailVal = email ? email.value.trim() : "";
    if (!emailVal) {
        setCheckoutError("email", "err-email", "Email is required.");
        ok = false;
        firstInvalid = firstInvalid || email;
    } else if (!isValidEmail(emailVal)) {
        setCheckoutError("email", "err-email", "Enter a valid email address (for example, name@example.com).");
        ok = false;
        firstInvalid = firstInvalid || email;
    }

    var zipVal = zipCode ? zipCode.value.trim() : "";
    if (zipVal !== "" && !/^\d{5}$/.test(zipVal)) {
        setCheckoutError("zipCode", "err-zip", "ZIP code must be exactly 5 digits, or leave this field blank.");
        ok = false;
        firstInvalid = firstInvalid || zipCode;
    }

    if (firstInvalid && typeof firstInvalid.focus === "function") {
        firstInvalid.focus();
    }

    return ok;
}

function updateCheckoutTotal() {
    var quantity = document.getElementById("quantity");
    var priceSummary = document.getElementById("priceSummary");

    if (!quantity || !priceSummary) {
        return;
    }

    var q = parseInt(quantity.value, 10);
    if (isNaN(q) || q < 1) {
        q = 0;
    }

    var total = q * TICKET_UNIT_PRICE;
    priceSummary.textContent = "Total: $" + total.toFixed(2) + " ($" + TICKET_UNIT_PRICE + " per ticket)";
}

function initCheckoutPage() {
    var form = document.getElementById("checkoutForm");
    if (!form) {
        return;
    }

    var visitDate = document.getElementById("visitDate");
    var quantity = document.getElementById("quantity");

    if (visitDate) {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mo = today.getMonth() + 1;
        var da = today.getDate();
        var mm = mo < 10 ? "0" + mo : String(mo);
        var dd = da < 10 ? "0" + da : String(da);
        var isoToday = yyyy + "-" + mm + "-" + dd;
        visitDate.setAttribute("min", isoToday);

        var params = new URLSearchParams(window.location.search);
        var prefill = params.get("date");
        if (prefill && /^\d{4}-\d{2}-\d{2}$/.test(prefill) && prefill >= isoToday) {
            visitDate.value = prefill;
        }
    }

    if (quantity) {
        quantity.addEventListener("input", updateCheckoutTotal);
        quantity.addEventListener("change", updateCheckoutTotal);
    }

    updateCheckoutTotal();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearCheckoutErrors();

        if (!validateCheckoutForm()) {
            return;
        }

        var q = parseInt(document.getElementById("quantity").value, 10);
        var total = q * TICKET_UNIT_PRICE;
        var typeKey = document.getElementById("ticketType").value;

        var order = {
            visitDate: document.getElementById("visitDate").value,
            ticketType: typeKey,
            ticketTypeLabel: TICKET_TYPE_LABELS[typeKey] || typeKey,
            quantity: q,
            email: document.getElementById("email").value.trim(),
            zip: document.getElementById("zipCode").value.trim(),
            mailingList: document.getElementById("mailingList").checked,
            total: total
        };

        sessionStorage.setItem("monomuseOrder", JSON.stringify(order));
        window.location.href = "confirmation.html";
    });
}

function initConfirmationPage() {
    var container = document.getElementById("orderConfirmation");
    if (!container) {
        return;
    }

    var raw = sessionStorage.getItem("monomuseOrder");
    if (!raw) {
        container.innerHTML =
            "<p>We could not find a completed order. If you just submitted one, try returning from checkout again.</p>" +
            '<p><a class="cta" href="checkout.html">Back to checkout</a></p>';
        return;
    }

    var order;
    try {
        order = JSON.parse(raw);
    } catch (err) {
        container.innerHTML = "<p>There was a problem reading your order. Please <a href=\"checkout.html\">try checkout again</a>.</p>";
        return;
    }

    var mailingNote = order.mailingList
        ? "You are subscribed to our mailing list."
        : "You did not join the mailing list.";

    var zipNote = order.zip ? "ZIP code on file: " + order.zip + "." : "No ZIP code was provided.";

    container.innerHTML =
        "<p><strong>Thank you—your museum tickets are reserved.</strong> This is a simulated order; no payment was processed.</p>" +
        "<p>We sent a confirmation to <strong>" +
        escapeHtml(order.email) +
        "</strong> (simulated in this demo).</p>" +
        "<ul>" +
        "<li><strong>Visit date:</strong> " +
        escapeHtml(order.visitDate) +
        "</li>" +
        "<li><strong>Ticket type:</strong> " +
        escapeHtml(order.ticketTypeLabel || order.ticketType) +
        "</li>" +
        "<li><strong>Quantity:</strong> " +
        String(order.quantity) +
        "</li>" +
        "<li>" +
        zipNote +
        "</li>" +
        "<li>" +
        mailingNote +
        "</li>" +
        "</ul>" +
        '<p class="order-total">Order total: $' +
        Number(order.total).toFixed(2) +
        "</p>" +
        '<p><a class="cta" href="tickets.html">Browse more dates</a> <a class="cta" href="../index.html">Home</a></p>';
}

function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

initCheckoutPage();
initConfirmationPage();