"use strict";


$(document).ready(function() {
    var companies;
    var news;
    var companyList;
    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/frontTestTask/company/getList',
        success: function (data) {
            companies = data;
            $('.j-comp-total-count').html(companies.list.length);
            for (var i = 0; i < companies.list.length; i++) {
                $("<li class='company-name'></li>").html(companies.list[i].name).appendTo($(".j-comp-list-box__ul"));
            }
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://codeit.pro/frontTestTask/news/getList',
        success: function (data) {

            news = data;
            console.log(news);
            for (var i = 0; i < news.list.length; i++) {
                $("<li class='carousel-box clearfix'></li>").html($("<img src='' alt='' class='author-photo'>").attr('src',news.list[i].img)).appendTo($(".carousel"));
            }
            $.each($('.carousel-box'), function(i) {
                $("<h3></h3>").html(news.list[i].author).appendTo(this)
            });
            $.each($('.carousel-box'), function(i) {
                $("<p></p>").html(news.list[i].description).appendTo(this)
            });
            $.each($('.carousel-box'), function() {
                $("<span class='author'>Author:</span>").appendTo(this)
            });
            $.each($('.carousel-box'), function(i) {
                $("<p class='author-name'></p><br>").html(news.list[i].author).appendTo(this)
            });
            $.each($('.carousel-box'), function() {
                $("<span class='public'>Public: </span>").appendTo(this)
            });
            $.each($('.carousel-box'), function(i) {
                $("<p class='public-date'></p>").appendTo(this)
            });

            $('.carousel').bxSlider();

        }
    });
});
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 3) + '...';
    }
    return str;
}












