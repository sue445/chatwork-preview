// via. http://d.hatena.ne.jp/okinaka/20090727/1248671860
$.fn.extend({
    insertAtCaret: function(before, after) {
        var o = this.get(0);
        o.focus();
        var s = o.value;
        var p = o.selectionStart;
        var np = p + before.length;
        o.value = s.substr(0, p) + before + after + s.substr(p);
        o.setSelectionRange(np, np);
        return this;
    }
});

var chatworklize = function(str){
    return str.
        replace(/\[info\]/g   , "<div class='info_tag'>").
        replace(/\[\/info\]/g , "</div>").
        replace(/\[title\]/g  , "<div class='title_tag'><span class='glyphicon glyphicon-info-sign'></span>").
        replace(/\[\/title\]/g, "</div>").
        replace(/\[hr\]/g     , "<hr>").
        replace(/\[qt\]/g     , "&ldquo;");
};

var show_info_preview = function(){
    $("#preview_area").empty();

    var info_text = "[info]";
    if($("#title_area").val().length > 0){
        info_text += "[title]" + $("#title_area").val() + "[/title]";
    }
    info_text += $("#info_area").val() + "[/info]";

    $("#copy_area").text(info_text);
    $("#preview_area").html(chatworklize(info_text));
};

var show_plain_preview = function(){
    $("#preview_area").empty();

    var info_text = $("#plain_area").val();
    $("#preview_area").html(chatworklize(info_text));
};

$(function(){
    $(".info_input").change(function(){
        show_info_preview();
    }).keyup(function(){
        show_info_preview();
    });

    $(".plain_input").change(function(){
        show_plain_preview();
    }).keyup(function(){
        show_plain_preview();
    });

    $('#editor-tab a:first').tab('show');

    $("#copy_area").click(function(){
        $(this).select();
    });

    $(".tag-completion-button").click(function(){
        var before = $(this).data("completion-before") || "";
        var after  = $(this).data("completion-after")  || "";

        var target;
        if($("ul#editor-tab li:eq(0)").hasClass("active")){
            target = "#info_area";
        } else {
            target = "#plain_area";
        }
        $(target).insertAtCaret(before, after).change();
    });
});
