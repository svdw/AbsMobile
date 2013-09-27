/* Global */
//var serviceUrl = "http://localhost:2914/Services/ArtikelWebService.svc/";
var serviceUrl = "http://magazijn.vtir.be/Services/ArtikelWebService.svc/";

/* pages */

$(document).on('pagebeforeshow', '#productgroep1', function () {
    $.mobile.showPageLoadingMsg();

    var lvwProductgroep1 = $("#productgroep_1");
    lvwProductgroep1.children().remove();
    
    $.ajax({
        type: "GET",
        url: serviceUrl + "GetHoofdproductGroepen",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>"),
                    a = $("<a></a>").attr("href", "#productgroep2").attr("data-transition", "slide").text(msg.d[i].GroepsNaam),
                    uniqueId = $('<input>').attr({
                        type: 'hidden',
                        value: msg.d[i].ID
                    });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadSubProductgroepen($(hiddenElement).val());
                });

                $(li).append(uniqueId);
                $(li).append(a);
                lvwProductgroep1.append(li);
            }
            lvwProductgroep1.listview("refresh");

            return false;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
});

function loadSubProductgroepen(hoofdproductgroepID) {
    var param = JSON.stringify({ hoofdproductgroep: hoofdproductgroepID });

    $.mobile.showPageLoadingMsg();

    var lvwProductgroep2 = $("#productgroep_2");
    lvwProductgroep2.children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetSubProductGroepen",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>"),
                    a = $("<a></a>").attr("href", "#productgroep3").attr("data-transition", "slide").text(msg.d[i].GroepsNaam),
                    uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadDetailProductgroepen($(hiddenElement).val());
                });

                $(li).append(uniqueId);
                $(li).append(a);
                lvwProductgroep2.append(li);
            }
            lvwProductgroep2.listview("refresh");

            return false;

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadDetailProductgroepen(subproductgroepID) {
    var param = JSON.stringify({ subproductgroep: subproductgroepID });

    $.mobile.showPageLoadingMsg();

    var lvwProductgroep3 = $("#productgroep_3");
    lvwProductgroep3.children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetDetailProductGroepen",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>"),
                    a = $("<a></a>").attr("href", "#artikels").attr("data-transition", "slide").text(msg.d[i].GroepsNaam),
                    uniqueId = $('<input>').attr({
                    type: 'hidden',
                    value: msg.d[i].ID
                });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadArtikelsByGroep($(hiddenElement).val());
                });

                $(li).append(uniqueId);
                $(li).append(a);
                lvwProductgroep3.append(li);
            }
            lvwProductgroep3.listview("refresh");

            return false;

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadArtikelsByGroep(detailproductgroepID) {
    var param = JSON.stringify({ detailproductgroep: detailproductgroepID });

    $.mobile.showPageLoadingMsg();

    var lvwArtikelOverzicht = $("#lvwArtikels");
    lvwArtikelOverzicht.children().remove();

    $.ajax({
        type: "POST",
        url: serviceUrl + "GetArtikelsByProductgroep",
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            for (i = 0; i <= msg.d.length - 1; i++) {
                var li = $("<li></li>"),
                    img = $("<img />").attr("src", "data:image/jpg;base64," + msg.d[i].Afbeelding),
                    a = $("<a></a>").attr("href", "#details").attr("data-transition", "slide"),
                    h2 = $("<h2>" + msg.d[i].Titel + "</h2>"),
                    p = $("<p>Artikelnummer: " + msg.d[i].ArtikelNr + "</p>"),
                    uniqueId = $('<input>').attr({
                        type: 'hidden',
                        value: msg.d[i].ID
                    });

                $(li).tap(function () {
                    var hiddenElement = $(this).find("input");
                    loadArtikelDetails($(hiddenElement).val());
                });

                a.append(img);
                a.append(h2);
                a.append(p);
                $(li).append(uniqueId);
                $(li).append(a);
                lvwArtikelOverzicht.append(li);
            }
            lvwArtikelOverzicht.listview("refresh");

            return false;

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}

function loadArtikelDetails(artikelID) {
    var param = JSON.stringify({ artikel_id: artikelID });
    
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

function loadAtikelDetail(data) {
    $("#artikelTitel").html('<span style="font-weight: bold;">' + data.Titel + '</span>');
    $("#artikelBeschrijving").html('<p>' + data.Beschrijving + '</p>');
    $("#artikelAfbeelding").attr("src", "data:image/jpg;base64," + data.Afbeelding);

    $("#lblArtikelEenheid").html(data.Eenheid);
    $("#lblArtikelStock").html(data.Stock);
    $("#lblArtikelPrijs").html(data.Catalogusprijs);
    $("#lblArtikelLeverancier").html(data.Leverancier);
    /*
    var $img = $('container_img img'),
        h = $img.height();
    $img.css('margin-top', + h / -2 + "px"); //margin-top should be negative half of image height. This will center the image vertically when combined with position:absolute and top:50%.
    */
    return false;
}

function loadAtikelDetailAfterBarcodeScan(data) {
    $("#barcode_artikeldetail").show();
    
    $("#artikel_titel").append('<h2>' + data.Titel + '<h2>');
    //$("#artikel_beschrijving").html('<p>' + data.Beschrijving + '</p>').css('text-align', 'center');
    $("#artikel_beschrijving").html('<p>' + data.Beschrijving + '</p>')
    $("#artikel_img").attr("src", "data:image/jpg;base64," + data.Afbeelding);

    $("#lblEenheid").html(data.Eenheid);
    $("#lblStock").html(data.Stock);
    $("#lblPrijs").html(data.Catalogusprijs);
    $("#lblLeverancier").html(data.Leverancier);

    return false;
}

$(document).on('pagebeforeshow', '#scannen', function () {
    //Hide the fields
    $("#barcode_artikeldetail").hide();

    // are we running in native app or in browser?
    window.isphone = false;
    if (document.URL.indexOf("http://") === -1
                    && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if (window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        browserReady();
    }
});

function onDeviceReady() {
    // do everything here.
    $("#txtBarcode").tap(function () {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan(
	                  function (result) {
	                      getArtikelByBarcode(result.text);
	                  },
	                  function (error) {
	                      alert("Scanning failed: " + error);
	                  }
	                );
    });
}

function browserReady() {
    $('#txtBarcode').keydown(function (e) {
        if (e.keyCode == 13) {
            getArtikelByBarcode($('#txtBarcode').val());
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
            loadAtikelDetailAfterBarcodeScan(msg.d);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' + xhr.response + ' ' + xhr.responseText + ' ' + thrownError);
        }
    });
}