(function($) {
    var f_name = "netflix_slider";

    $.fn.init[f_name] = function(element, options) {
        var original_width = 0;
        if ($(window).width() > 400) {
            original_width = "240px";
        } else {
            original_width = "120px";
        }
        var def = {
            width: false,
            ratio: 1,
            url: [],
            width: original_width,
            videourl: [
                "https://storage.googleapis.com/coverr-main/mp4/Tourism.mp4",
                "https://staging.coverr.co/s3/mp4/Snow-motion.mp4",
                "https://staging.coverr.co/s3/mp4/Indian Tea Plantations.mp4",
                "https://staging.coverr.co/s3/mp4/Hill.mp4",
                "https://staging.coverr.co/s3/mp4/Flamez.mp4",
                "https://staging.coverr.co/s3/mp4/Breezy.mp4",
                "https://staging.coverr.co/s3/mp4/Candolim-Beach.mp4",
                "https://staging.coverr.co/s3/mp4/Beetle-Nut-Trees.mp4",
                "https://staging.coverr.co/s3/mp4/Wavez.mp4",
                "https://staging.coverr.co/s3/mp4/Ski_Train.mp4",
                "https://staging.coverr.co/s3/mp4/Cloud_Spots.mp4",
                "https://staging.coverr.co/s3/mp4/Mt_Baker.mp4"
            ]
        };
        options = $.extend(def, options);
        var e_width = options["width"];
        var parent = $(element);
        var elements = parent.find(".element");
        var videourl = options["videourl"];
        var allT = 0;
        var scroll_elements = 0;
        var max_scr = 0;

        function translateX(el, X) {
            $(el).css("transform", "translateX(" + X + "px)");
        }
        if (elements.length > 0 && videourl.length > 0) {
            function putFocus(el, p, action, min) {
                el = $(el);
                var tr = parseInt(e_width) * 0.25;
                var lg_max = elements.length;
                var lg_min = 0;
                if (scroll_elements < max_scr) {
                    lg_max = (scroll_elements + 1) * min;

                    lg_min = scroll_elements * min;
                }

                if ((p + 1) % min == 0 && max_scr > 0) {
                    n_button.toggleClass("visible");
                    if (p + 1 == pi) {
                        lg_min = 0;
                        if (action) {
                            allT += w * 0.25;
                            translateX(parent, allT);
                        } else {
                            allT -= w * 0.25;
                            translateX(parent, allT);
                        }
                    } else {
                        lg_max = elements.length;

                        if (action) {
                            allT -= w * 0.25;
                            translateX(parent, allT);
                        } else {
                            allT += w * 0.25;
                            translateX(parent, allT);
                        }
                    }
                }

                if (max_scr == scroll_elements && r_elements != min) {
                    var tp = (scroll_elements - 1) * min + r_elements;

                    if (p == tp) {
                        p_button.toggleClass("visible");
                        lg_min = 0;
                        if (action) {
                            allT += w * 0.25;
                            translateX(parent, allT);
                        } else {
                            allT -= w * 0.25;
                            translateX(parent, allT);
                        }
                    }
                }
                if ((p + 1) % min == 0 && max_scr > 0) {
                    lg_min = 0;
                    p_button.toggleClass("visible");
                    if (action) {
                    } else {
                    }
                }

                if (action == true) {
                    for (var i = p + 1; i < lg_max; i++) {
                        $(el[i]).css({
                            transform: "translateX(" + tr + "px)"
                        });
                    }

                    if (p != 0) {
                        for (var i = p - 1; i >= lg_min; i--) {
                            $(el[i]).css({
                                transform: "translateX(" + -tr + "px)"
                            });
                        }
                    }
                } else {
                    for (var i = p + 1; i < lg_max; i++) {
                        $(el[i]).css({
                            transform: ""
                        });
                    }
                    if (p != 0) {
                        for (var i = p - 1; i >= lg_min; i--) {
                            $(el[i]).css({
                                transform: ""
                            });
                        }
                    }
                }
            }

            var min = null;
            var nmin = null;
            var pi = 0;
            $(window).resize(function() {
                var w_w = $(window).width();
                var e_w = elements.length * parseInt(e_width) + 2;
                if (w_w < e_w) {
                    min = Math.floor(w_w / (parseInt(e_width) + 2));
                    max_scr = Math.floor(elements.length / min);
                    if (nmin == null) {
                        nmin = min;
                    }
                    if (nmin != min) {
                        scroll_elements = Math.floor(pi / min);

                        if (nmin < min) {
                            if (scroll_elements == 0) {
                                allT = 0;
                                pi = 0;
                            } else {
                                allT = -scroll_elements * (min - 1) * (w + 2);
                                pi = scroll_elements * min;
                            }
                            translateX(parent, allT);
                        } else if (scroll_elements == 0) {
                            pi = 0;
                            allT = 0;
                            translateX(parent, allT);
                        }
                        if (max_scr == scroll_elements) {
                            r_elements =
                                elements.length - scroll_elements * min;
                        }
                        nmin = min;
                        setArrow();
                    }
                } else {
                    min = elements.length + 1;
                }
            });
            $(window).resize();
            var w = parseInt(e_width);
            $.each(elements, function(j, e) {
                var el = $(e);
                el.css("width", e_width);
                el.data("firstHover", true);
                el.data("ev", j);

                el.data("ishover", false);
                el.on("mouseover", function() {
                    var firstHover = $(this).data("firstHover");
                    if (firstHover) {
                        $(this).data("firstHover", false);
                        $(this)
                            .data("v_preloader")
                            .show(0);
                        $(this)
                            .data("video")
                            .load();
                    }
                    var ishover = $(this).data("ishover");
                    if (!ishover) {
                        var x = $(this).data("ev");
                        if (x % min == 0) {
                            $(this).addClass("firstFocus");
                            allT += w * 0.25;
                            translateX(parent, allT);
                        } else {
                            $(this).addClass("focus");
                        }
                        putFocus(elements, x, true, min);
                        $(this).data("ishover", true);

                        // $(this).addClass('focus');
                    }
                });
                el.on("mouseleave", function() {
                    var ishover = $(this).data("ishover");
                    var x = $(this).data("ev");

                    if (ishover) {
                        if (x % min == 0) {
                            $(this).removeClass("firstFocus");
                            allT -= w * 0.25;
                            translateX(parent, allT);
                        } else {
                            $(this).removeClass("focus");
                        }
                        $(this).data("ishover", false);
                        putFocus(elements, x, false, min);
                    }
                });
                var video_container = el.find(".video_container");
                var theVideo = video_container.find("video");
                var theVideoSrc = theVideo.find("source");
                el.data("video", theVideo[0]);
                theVideoSrc[0].src = videourl[j];
                theVideo = theVideo[0];
                var v_preloader = el.find(".v_preloader");
                el.data("v_preloader", v_preloader);
                theVideo.addEventListener("canplay", function() {
                    $(this).click();
                    this.play();

                    var p = $(this)
                    .parent()
                    .parent();
                    p.data("v_preloader").fadeOut(200);
                });
            });
        }

        var now_elements = min;
        var r_elements = elements.length - min;
        var n_button = parent.parent().find(".after");
        var p_button = parent.parent().find(".previous");

        function setArrow() {
            if (scroll_elements == max_scr) {
                n_button.hide(0);
            }
            if (scroll_elements == 0) {
                p_button.hide(0);
                n_button.show(0);
            } else {
                p_button.show(0);
            }
            if (scroll_elements < max_scr && max_scr > 0) {
                n_button.show(0);
            } else if (max_scr == 0) {
                n_button.hide(0);
            }
            if (scroll_elements != max_scr)
                r_elements = elements.length - (scroll_elements + 1) * min;
        }
        var x0 = 0;
        var onts = false;
        parent.on("touchstart", function(e) {
            x0 = e.originalEvent.touches[0].pageX;
            onts = true;
        });
        parent.on("touchmove", function(e) {
            if (onts) {
                var n_x = e.originalEvent.changedTouches[0].pageX;
                var dff = n_x - x0;

                if (dff <= 0) {
                    //avanti
                    if (Math.abs(dff) > 10) {
                        if (max_scr > 0 && scroll_elements < max_scr)
                            n_button.click();
                        onts = false;
                    }
                } else {
                    if (Math.abs(dff) > 10) {
                        if (max_scr > 0 && scroll_elements > 0)
                            p_button.click();
                        onts = false;
                    }
                }
                x0 = n_x;
            }
        });
        parent.on("touchend", function() {
            onts = false;
        });
        var ntw = null;
        $(window).resize(function() {
            window.setTimeout(function() {
                ntw = $(window).width() - (w + 2) * min;
                setArrow();
                if (min == 1 || original_width == "120px") {
                    $(n_button).css("width", "32px");
                    $(p_button).css("width", "32px");
                } else {
                    $(n_button).css("width", "32px");
                    $(p_button).css("width", "32px");
                }
            }, 500);
        });
        $(window).resize();
        n_button.click(function() {
            scroll_elements++;
            pi = scroll_elements * min;
            var t_w = 0;

            if (scroll_elements == max_scr) {
                t_w = r_elements * (w + 2);
            } else {
                t_w = min * (w + 2);
            }
            allT -= t_w;
            translateX(parent, allT);
            setArrow();
        });
        p_button.click(function() {
            scroll_elements--;
            pi = scroll_elements * min;
            var t_w = 0;

            if (scroll_elements == max_scr - 1) {
                t_w = r_elements * (w + 2);
            } else {
                t_w = min * (w + 2);
            }
            allT += t_w;
            translateX(parent, allT);
            setArrow();
        });
    };

    $.fn[f_name] = function(options) {
        return this.each(function() {
            if (!$.data(this, f_name)) {
                $.data(this, f_name, new $.fn.init[f_name](this, options));
            }
        });
    };
})(jQuery);

$(document).ready(function() {
    $(".slider").netflix_slider();
});
