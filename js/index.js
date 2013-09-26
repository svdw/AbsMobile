/* productgroepen */

//var serviceUrl = "http://localhost:2914/Services/ArtikelWebService.svc/";
var serviceUrl = "http://magazijn.vtir.be/Services/ArtikelWebService.svc/";

function loadMainProductgroepen() {
    $("#productgroep_1").children().remove();

    $.ajax({
        type: "GET",
        url: serviceUrl + "GetHoofdproductGroepen",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>");
                var uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadSubProductgroepen($(hiddenElement).val());
                });

                var a = $("<a></a>").attr("href", "#productgroep2")
						    .attr("data-transition", "slide").text(msg.d[i].GroepsNaam);
                $(li).append(uniqueId);
                $(li).append(a);
                $("#productgroep_1").append(li);
            }
            $("#productgroep_1").listview("refresh");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadSubProductgroepen(hoofdproductgroepID) {
    var param = JSON.stringify({ hoofdproductgroep: hoofdproductgroepID });

    $.mobile.showPageLoadingMsg();

    $("#productgroep_2").children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetSubProductGroepen",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>");
                var uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadDetailProductgroepen($(hiddenElement).val());
                });

                var a = $("<a></a>").attr("href", "#productgroep3")
						    .attr("data-transition", "slide").text(msg.d[i].GroepsNaam);
                $(li).append(uniqueId);
                $(li).append(a);
                $("#productgroep_2").append(li);
            }
            $("#productgroep_2").listview("refresh");

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadDetailProductgroepen(subproductgroepID) {
    var param = JSON.stringify({ subproductgroep: subproductgroepID });

    $.mobile.showPageLoadingMsg();

    $("#productgroep_3").children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetDetailProductGroepen",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>");
                var uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadArtikelsByGroep($(hiddenElement).val());
                });

                var a = $("<a></a>").attr("href", "#artikels")
						    .attr("data-transition", "slide").text(msg.d[i].GroepsNaam);
                $(li).append(uniqueId);
                $(li).append(a);
                $("#productgroep_3").append(li);
            }
            $("#productgroep_3").listview("refresh");

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

/*  end productgroepen */

/* artikels */

function loadArtikelsByGroep(detailproductgroepID) {
    var param = JSON.stringify({ detailproductgroep: detailproductgroepID });

    $.mobile.showPageLoadingMsg();

    $("#lvwArtikels").children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetArtikelsByProductgroep",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>");
                var uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadArtikelDetails($(hiddenElement).val());
                });

                var a = $("<a></a>").attr("href", "#details")
						    .attr("data-transition", "slide").text(msg.d[i].Titel);
                $(li).append(uniqueId);
                $(li).append(a);
                $("#lvwArtikels").append(li);
            }
            $("#lvwArtikels").listview("refresh");

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function GetAllArtikels() {
    $.mobile.showPageLoadingMsg();

    $("#overzicht").children().remove();

    $.ajax({
        type: "GET",
        url: serviceUrl + "GetArtikels",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {                        

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>");
                var uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadArtikelDetails($(hiddenElement).val());
                });

                var a = $("<a></a>").attr("href", "#details")
						    .attr("data-transition", "slide").text(msg.d[i].Titel);
                $(li).append(uniqueId);
                $(li).append(a);
                $("#overzicht").append(li);
            }
            $("#overzicht").listview("refresh");

            /*
            var id = msg.d.ID;
            var st = msg.d.SomeText;
            var sl = msg.d.SomeList;
            var i = sl.length;
            var firstSlItem = sl[0];*/
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadArtikelDetails(artikelID) {
    var param = JSON.stringify({ artikel_id: artikelID });
    var params = new Object();
    params.artikelID = artikelID;
    $.ajax({
        type: "POST",
        url: serviceUrl + "GetArtikelByID",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            loadAtikelDetail(msg.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function getArtikelByBarcode(barcode) {
    var param = JSON.stringify({ barcode: barcode });

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetArtikelByBarcode",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            loadAtikelDetail(msg.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadAtikelDetail(data) {
    $("#artikelTitel").html('<span style="font-weight: bold;">' + data.Titel + '</span>').css('text-align', 'center');
    $("#artikelBeschrijving").html('<p>' + data.Beschrijving + '</p>').css('text-align', 'center');
    //$("#artikelAfbeelding").attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
    $("#artikelAfbeelding").attr("src", "data:image/jpg;base64," + data.Afbeelding);

    var $img = $('container_img img');
    var h = $img.height();
    $img.css('margin-top', +h / -2 + "px"); //margin-top should be negative half of image height. This will center the image vertically when combined with position:absolute and top:50%.
}

/* end artikels */