document.addEventListener("DOMContentLoaded", function () {
  var isPaid = false;

  function addToCart(itemName) {
    var cartList = document.getElementById("cartList");
    var li = document.createElement("li");
    li.textContent = itemName;
    cartList.appendChild(li);
  }

  function clearCart() {
    var cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
  }

  var addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var itemName = document.getElementById("itemName").value;
      addToCart(itemName);
      document.getElementById("itemName").value = "";
      isPaid = false;
      document.getElementById("successMessage").style.display = "none";
    });
  }

  var payBtn = document.getElementById("payBtn");
  if (payBtn) {
    payBtn.addEventListener("click", function (event) {
      event.preventDefault();

      if (!isPaid && document.getElementById("cartList").children.length > 0) {
        var cartList = document.getElementById("cartList");
        var gameTable = document.getElementById("gameTable");
        var successMessage = document.getElementById("successMessage");
        successMessage.textContent = "Uspešno ste platili.";
        successMessage.style.display = "block";
        clearCart();
        isPaid = true;
      }
    });
  }

  window.addEventListener("load", function () {
    clearCart();
  });

  document
    .getElementById("feedbackForm")
    .addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Molimo Vas da popunite sva polja.");
      return;
    }

    var formInputs = [
      { field: "Ime", value: name },
      { field: "Email", value: email },
      { field: "Poruka", value: message },
    ];

    var alertMessage = "Podaci iz forme:\n";
    for (var i = 0; i < formInputs.length; i++) {
      alertMessage += formInputs[i].field + ": " + formInputs[i].value + "\n";
    }

    alert(alertMessage);

    document.getElementById("feedbackForm").reset();
    document.getElementById("successMessage").textContent = "Forma poslata!";
    document.getElementById("successMessage").style.display = "block";
  }

  function submitFeedback(feedback) {
    document
      .getElementById("feedbackForm")
      .addEventListener("submit", submitForm);

    document
      .getElementById("downloadButton")
      .addEventListener("click", function () {
        var downloadData = JSON.stringify(feedback);
        var blob = new Blob([downloadData], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "feedback.json";
        a.click();
      });

    var serializedFeedback = feedback.map(function (item) {
      return item.field + ": " + item.value;
    });

    var feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = serializedFeedback
      .map(function (item) {
        return "<li>" + item + "</li>";
      })
      .join("");

    var feedbackCount = feedback.length.toString();
    return (
      "Hvala vam na slanju povratnih informacija. Ukupno ste poslali " +
      feedbackCount +
      " povratnih informacija."
    );
  }
});
