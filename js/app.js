var usersData = [];
var results = [];
var firstSearch = false;
$.get("https://sheetdb.io/api/v1/knwvt52fkyclp", function(data) {
  usersData = data;
});

var search = function() {
  var inputData = $("input")
    .val()
    .toLowerCase();
  var curso = $("select").val();
  if (inputData.length > 0) {
    results = usersData.filter(function(item) {
      if (
        item.Usuario.toLowerCase().includes(inputData) &&
        (curso != 0 ? item.Curso == curso : true)
      ) {
        return true;
      }
      if (
        item.Apellido.toLowerCase().includes(inputData) &&
        (curso != 0 ? item.Curso == curso : true)
      ) {
        return true;
      }
      if (
        item.Nombre.toLowerCase().includes(inputData) &&
        (curso != 0 ? item.Curso == curso : true)
      ) {
        return true;
      }
    });

    console.log(results.length);

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
          pass: item.Contrasena,
          name: item.Nombre,
          lastname: item.Apellido
        };
      })
    );
  } else {
    results = [];
    $("#resultList").loadTemplate(
      $("#resultsTemplate"),
      results.map(function(item) {
        return {
          user: item.Usuario,
          pass: item.Contrasena,
          name: item.Nombre,
          lastname: item.Apellido
        };
      })
    );
  }

  if (!firstSearch) {
    $("body").addClass("results");
  }
};

$("input").keyup(function() {
  search();
});

$("select").change(function() {
  search();
});
