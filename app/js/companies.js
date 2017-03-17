"use strict";


$(document).ready(function() {
    var companies;
    var news;
    var companiesLocationList = [];
    var chartData = [];
    var partners = [];
    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/frontTestTask/company/getList',
        success: function (data) {
            companies = data;
            $('.j-comp-total-count').html(companies.list.length);
            for (var i = 0; i < companies.list.length; i++) {
                $("<li class='company-name'></li>").appendTo($(".j-comp-list-box__ul"));
                companiesLocationList.push(companies.list[i].location.name);
                partners.push(companies.list[i].partners);
            }
            console.log(partners);
            chartData = doublicate(companiesLocationList);
            addChart(chartData);
            $.each($('.company-name'), function (a) {
                $("<a class='company-name-a'></a>").html(companies.list[a].name).appendTo(this)
            });
            $('.company-name-a').on('click', function () {
                var activeCompany = $(this).html();
                $('.company-name').removeClass('active');
                $(this).parent().addClass('active');
                $(".comp-partners").slideDown(500);
                return true;
            });
            $(".comp-partners").on('click', function(){
                $(this).slideUp(500);
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/frontTestTask/news/getList',
        success: function (data) {

            news = data;
            for (var i = 0; i < news.list.length; i++) {
                $("<li class='carousel-box clearfix'></li>").html($("<img src='' alt='' class='author-photo'>").attr('src',news.list[i].img)).appendTo($(".carousel"));
            }
            $.each($('.carousel-box'), function(i) {
                $("<h3></h3>").html(news.list[i].author).appendTo(this);
                $("<p></p>").html(truncate(news.list[i].description, 185)).appendTo(this);
                $("<span class='author'>Author:</span>").appendTo(this);
                $("<p class='author-name'></p><br>").html(news.list[i].author).appendTo(this);
                $("<span class='public'>Public:</span>").appendTo(this);
                $("<p class='public-date'></p>").html(datePublic(+news.list[i].date)).appendTo(this);
            });
            $('.carousel').bxSlider();
        }
    });
});
function addChart(arr) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable(arr);

        var options = {
            is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 3) + '...';
    }
    return str;
}
function datePublic(date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = '' + date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "." + month + "." + year;
}
function find(array, value) {

    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return i;
    }

    return -1;
}
function doublicate(arr) {
    var resultArr = [['Countries','Percentage']];
    var result = {};
    arr.forEach(function(a){
        result[a] = result[a] + 1 || 1;
    });
    for (var key in result) {
        resultArr.push([key, result[key]])
    }
    return resultArr;
}
