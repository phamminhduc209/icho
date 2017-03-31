function DefaultEvent() {
    $("img.lazy, img.imgU").lazyload();
    $(".productrelate img.lazy").lazyload();
    $("#slidethumb").owlCarousel({
        items: 5,
        navigation: !0,
        slideSpeed: 300,
        pagination: !1,
        paginationSpeed: 400,
        autoHeight: !0,
        lazyFollow: !0,
        lazyLoad: !0
    });
    $("#slidedetail").owlCarousel({
        navigation: !0,
        slideSpeed: 300,
        pagination: !1,
        paginationSpeed: 400,
        singleItem: !0,
        autoHeight: !0,
        lazyFollow: !1,
        lazyLoad: !0,
        afterMove: function() {
            var u = $("input[name=hdProductCode]").val(),
                n = "",
                t = this.currentItem,
                i, r;
            $(".viewlarg").attr("href", "javascript:OpenPhotoSwipe(" + t + ")");
            $("#slidethumb").trigger("owl.goTo", t);
            $("#slidethumb .item img.active").removeClass("active");
            $("#itemthumb" + t).find("img").addClass("active");
            $(".detail-listcolor.view a.coloractived").removeClass("coloractived");
            $(".detail-listcolor.view a").each(function() {
                $(this).data("value") == $("#itemthumb" + t).data("color") && ($(this).addClass("coloractived"), n = "" + $(this).data("code"))
            });
            u !== n && n !== "" && ($("input[name=hdProductCode]").val(n), i = "", $(".ddlColor ul li").each(function() {
                $(this).data("value") + "" === n && (i = $(this).html())
            }), $(".ddlColor a").data("value", n), $(".ddlColor a").html(i), r = $(".ddlColor a").data("id"), $(".ddlColor a").data("shockprice") ? loadProductShockPrice(r, n) : ReloadPriceByProductCode(r, n))
        },
        afterInit: function() {
            $(".owl-default").remove()
        }
    });
    $("#slidethumb .item").click(function() {
        $("#slidedetail").trigger("owl.goTo", $(this).data("index"));
        $("#slidethumb .item img.active").removeClass("active");
        $(this).find("img").addClass("active")
    });
    var n = !1;
    $(".article img").each(function() {
        if (!n) {
            n = !0;
            var t = $(".article"),
                r = t.offset().top,
                u = $(this).offset().top,
                i = t.width();
            t.find("div.end").height(i / 3)
        }
    });
    $(".para .viewmore").click(function() {
        $(".para").find("span").removeClass("hide");
        $(this).remove()
    });
    $(".detail-listcolor a").click(function() {
        var r = $(this).data("value"),
            n, i, t;
        $(this).hasClass("change") ? ($(".detail-listcolor a.change.coloractived").removeClass("coloractived"), $(".detail-listcolor a").each(function() {
            $(this).data("value") == r && $(this).hasClass("change") && ($(this).addClass("coloractived"), $("input[name=hdProductCode]").val($(this).data("code")))
        })) : ($(".detail-listcolor a.nochange.coloractived").removeClass("coloractived"), $(this).addClass("coloractived"), n = !1, $("#slidethumb .item").each(function() {
            if (r == $(this).data("color") && !n) {
                var t = $(this).data("index");
                $("#slidedetail").trigger("owl.jumpTo", t);
                $("#slidethumb").trigger("owl.jumpTo", t);
                $("#slidethumb .item img.active").removeClass("active");
                $("#itemthumb" + t).find("img").addClass("active");
                n = !0
            }
        }), n || (i = "", t = $(this).data("code"), $(".ddlColor ul li").each(function() {
            $(this).data("value") === t && (i = $(this).html())
        }), $(".ddlColor a").data("value", t), $(".ddlColor a").html(i), $("input[name=hdProductCode]").val(t), ReloadPriceByProductCode($(this).data("id"), $(this).data("code"))))
    });
    $("select[name=ddlQuantity]").change(function() {
        $("input[name=hdQuantity]").val($(this).find("option:selected").val())
    });
    $(".ddlColor a").click(function() {
        $(this).parent().find("ul").slideToggle(100)
    });
    $(".ddlColor li").click(function() {
        var n = $(this).data("value"),
            t;
        n == undefined || n == "" || n == -1 ? ($(".dt-buynow span.error").html("(*)Vui lòng chọn màu"), $(".dt-buynow span.error").removeClass("hide"), $(".ddlColor").addClass("red")) : ($(".dt-buynow span.error").addClass("hide"), $(".ddlColor").removeClass("red"));
        $(".ddlColor a").html($(this).html());
        $("input[name=hdProductCode]").val(n);
        $(this).parent().slideToggle(100);
        t = $(".ddlColor a").data("id");
        $(".ddlColor a").data("shockprice") && ($(".detail-listcolor.view a").removeClass("coloractived"), $(".detail-listcolor.view a").each(function() {
            $(this).data("code") == n + "" && $(this).addClass("coloractived")
        }), loadProductShockPrice(t, n));
        ReloadPriceByProductCode(t, n)
    });
    $("div.dt-buynow label span").click(function() {
        var e = $("input[name=txtQuantity]").val(),
            n = TryParseInt(e, 0),
            u = $(this).parent().find("input").attr("min"),
            f = $(this).parent().find("input").attr("max"),
            t, i;
        if (n == 0 && $("input[name=txtQuantity]").val(1), t = n, $(this).hasClass("up") && (t = n >= f ? f : n + 1), $(this).hasClass("down") && (t = n <= u ? u : n - 1), i = parseInt($("#hdStockQuantity").val()), t > i) {
            $(".dt-buynow span.error").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".dt-buynow span.error").removeClass("hide");
            $(".fastbuy .contact .qoerror1").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".fastbuy .contact .qoerror1").show();
            $(".fastbuy .contact .qoerror").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".fastbuy .contact .qoerror").show();
            return
        }
        $(".dt-buynow span.error").addClass("hide");
        $(".fastbuy .contact .qoerror1").hide();
        $(".fastbuy .contact .qoerror").hide();
        $("input[name=txtQuantity]").val(t);
        var o = parseInt($(".fastbuy .price span").data("price")),
            h = parseInt($(".tempcart .num").html()),
            r = 0,
            s = o * t + r;
        $(".fastbuy .total span").html(formatNumeric(s));
        $newshipfee ? $(".fastbuy .shipfee span").html("Chưa bao gồm phí giao hàng") : r > 0 ? $(".fastbuy .shipfee span").html(formatNumeric(r)) : $(".fastbuy .shipfee span").html("Miễn phí");
        changePromotionStatus()
    });
    $(".fastbuy .quantity label span").click(function() {
        var f = $("input[name=txtQuantity]").val(),
            n = TryParseInt(f, 0),
            r = $(this).parent().find("input").attr("min"),
            u = $(this).parent().find("input").attr("max"),
            t, i;
        if (n == 0 && $("input[name=txtQuantity]").val(1), t = n, $(this).hasClass("up") && (t = n >= u ? u : n + 1), $(this).hasClass("down") && (t = n <= r ? r : n - 1), i = parseInt($("#hdStockQuantity").val()), t > i) {
            $(".dt-buynow span.error").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".dt-buynow span.error").removeClass("hide");
            $(".fastbuy .contact .qoerror1").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".fastbuy .contact .qoerror1").show();
            $(".fastbuy .contact .qoerror").html("Số lượng sản phẩm hiện tại chỉ còn " + i + " sản phẩm");
            $(".fastbuy .contact .qoerror").show();
            return
        }
        $(".dt-buynow span.error").addClass("hide");
        $(".fastbuy .contact .qoerror1").hide();
        $(".fastbuy .contact .qoerror").hide();
        $("input[name=txtQuantity]").val(t);
        updateFastBuyQuantity(t);
        changePromotionStatus()
    });
    initPromotionEvent();
    ValidateNumber($("input[name=txtQuantity]"));
    $("div.dt-buynow>a.buynow").click(function() {
        var i = $(this).parent().find("input[name=txtQuantity]").val(),
            n = $("input[name=hdProductCode]").val(),
            r, t;
        if (n == "") {
            $(".dt-buynow span.error").html("(*)Vui lòng chọn màu");
            $(".dt-buynow span.error").removeClass("hide");
            $(".ddlColor").addClass("red");
            return
        }
        r = parseInt($(".tempcart .num").html());
        t = getPromotionByQuantity();
        r > 0 ? (isShowPopup = !0, checkPromotionByQuantity() && addToCart($(this).data("pid"), i, n, !1, t)) : (isShowPopup = !1, checkPromotionByQuantity() && addToCart($(this).data("pid"), i, n, !1, t))
    });
    $(".fastbuy .contact .col1 label").click(function() {
        $(".fastbuy .contact .col1 label").removeClass("chon");
        $(this).addClass("chon")
    });
    $(".fastbuy .quantity input").blur(function() {
        var i = $("input[name=txtQuantity]").val(),
            t = TryParseInt(i, 0),
            n;
        t == 0 && ($("input[name=txtQuantity]").val(1), t = 1);
        t > 50 && ($("input[name=txtQuantity]").val(50), t = 50);
        n = parseInt($("#hdStockQuantity").val());
        t > n ? ($(".dt-buynow .error").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".dt-buynow .error").removeClass("hide"), $(".fastbuy .qoerror1").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".fastbuy .qoerror1").show(), $(".fastbuy .qoerror").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".fastbuy .qoerror").show(), $("input[name=txtQuantity]").val(n), updateFastBuyQuantity(n)) : ($(".dt-buynow .error").addClass("hide"), $(".fastbuy .qoerror1").hide(), $(".fastbuy .qoerror").hide(), updateFastBuyQuantity(t), changePromotionStatus())
    });
    $(".dt-buynow input").blur(function() {
        var i = $("input[name=txtQuantity]").val(),
            t = TryParseInt(i, 0),
            n;
        t == 0 && ($("input[name=txtQuantity]").val(1), t = 1);
        t > 50 && ($("input[name=txtQuantity]").val(50), t = 50);
        n = parseInt($("#hdStockQuantity").val());
        t > n ? ($(".dt-buynow .error").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".dt-buynow .error").removeClass("hide"), $(".fastbuy .qoerror1").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".fastbuy .qoerror1").show(), $(".fastbuy .qoerror").html("Số lượng sản phẩm hiện tại chỉ còn " + n + " sản phẩm"), $(".fastbuy .qoerror").show(), $("input[name=txtQuantity]").val(n), updateFastBuyQuantity(n)) : ($(".dt-buynow .error").addClass("hide"), $(".fastbuy .qoerror1").hide(), $(".fastbuy .qoerror").hide(), updateFastBuyQuantity(t), changePromotionStatus())
    });
    $(".fastbuy .contact .buynow").click(function() {
        var i = $("input[name=txtQuantity]").val(),
            n = $("input[name=hdProductCode]").val(),
            t, r;
        if (n == "") {
            $(".fastbuy .contact span.error").removeClass("hide");
            $(".fastbuy .ddlColor").addClass("red");
            return
        }
        t = getPromotionByQuantity();
        r = parseInt($(".tempcart .num").html());
        r > 0 ? (isShowPopup = !0, checkPromotionByQuantity() && addToCart($(this).data("pid"), i, n, !1, t)) : (isShowPopup = !1, checkPromotionByQuantity() && addToCart($(this).data("pid"), i, n, !1, t))
    })
}