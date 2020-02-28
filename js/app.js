var usersData = [];
var results = [];
var firstSearch = false;
$.get("https://sheetdb.io/api/v1/knwvt52fkyclp", function(data) {
  usersData = data;
});

$("input").keyup(function() {
  var inputData = $("input")
    .val()
    .toLowerCase();
  results = usersData.filter(function(item) {
    if (item.user.toLowerCase().includes(inputData)) {
      return true;
    }
    if (item.name.toLowerCase().includes(inputData)) {
      return true;
    }   
     if (item.lastname.toLowerCase().includes(inputData)) {
      return true;
    } 
  });

  if (!firstSearch) {
    $("body").addClass("results");
  }

  if (results.length == 0) {
    $("#noresults").addClass("show");
  } else {
    $("#noresults").removeClass("show");
  }

  $("#resultList").loadTemplate(
    $("#resultsTemplate"),
    results.map(function(item) {
      return {
        user: item.Usuario,
        name: item.Nombre,
        lastname: item.Apellido,
      };
    })
  );
});
