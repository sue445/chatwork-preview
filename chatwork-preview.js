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
});
