
function real_time(time) {
    var m = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        w = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        d = new Date();

    time = parseInt(time);

    var delta = parseInt(d.getTime() / 1000) - time;

    if (delta < 0) {
        delta = 0;
    }

    if (delta < 3600 * 24) {
        if (delta < 60) {
            delta += '秒';
        } else if (delta < 3600) {
            delta = parseInt(delta / 60);
            delta += '分钟';
        } else {
            delta = parseInt(delta / 3600);
            delta += '小时';
        }
        delta += '前';
    } else {
        d.setTime(time * 1000);
        var t = [parseInt(d.getHours()), parseInt(d.getMinutes())];
        var alpha = t[0] > 12 ? (t[0] - 12) + ':' + t[1] + ' pm' : t[0] + ':' + t[1] + ' am';
        if (delta < 3600 * 48) {
            delta = '昨日' + alpha;
        } else if (delta < 3600 * 24 * 7) {
            delta = w[d.getDay()] + alpha;
        } else {
            delta = m[d.getMonth()] + d.getDate() + '日, ' + d.getFullYear() + ' ' + alpha;
        }
    }

    return delta;
}

function insert(text) {
  var ext = text.split('.').pop().toLowerCase();

  if (ext == 'jpg' || ext == 'gif' || ext == 'png' || ext == 'bmp') {
    tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<img src="'+text+'" />');
  } else {
    var name = text.split('/').pop();
    tinyMCEPopup.editor.execCommand('mceInsertContent', false, '<a href="'+text+'">'+name+'</a>');
  }
  
	tinyMCEPopup.close();
}

function size_format(value, dec) {
    var value = parseInt(value);
    var dec = dec || 2;
    var prefix_arr = [" B", " K", " M", " G", " T"];

    while (value > 1024) {
        value /= 1024;
        prefix_arr.shift();
    }

    return (Math.round(value * Math.pow(10, dec)) / Math.pow(10, dec)) + prefix_arr.shift();
}

$(function(){
// new_folder
$('#new_folder').click(function(){
    $('.bag').remove();
    var add = $('<input type="button" value="new" />');
    var td = $('<td colspan="3"></td>');
    var tr = $('<tr class="bag"></tr>');
    var input = $('<input type="text" class="text" name="folder_name" value="" />');
    td.append(input).append(' ').append(add);
    tr.append(td);
    add.click(function(){
        if (input.val()) {
            var form = $('form')[0];
            add.val('waiting...');
            add.unbind('click').attr('disabled','disabled');
            form.action = 'index.php?d='+d+'&a=new_folder&private_key='+private_key;
            form.submit();
        } else {
            notice('请输入目录名字');
        }
    });

    $('thead').prepend(tr);
});

function notice(msg) {
    var notice = $('<div class="notice">'+msg+'</div>');
    $('.container').prepend(notice);
    var timer = setInterval(function(){
        notice.hide('slow', function(){
            $(this).remove();
            clearInterval(timer);
        });
    }, 3000);
}

// new file
$('#new_file').click(function(){
    $('.bag').remove();
    var add = $('<input type="button" value="upload" />');
    var td = $('<td colspan="3"></td>');
    var tr = $('<tr class="bag"></tr>');
    var input = $('<input type="file" name="file_array" value="" />');
    td.append(input).append(' ').append(add);
    tr.append(td);
    add.click(function(){
        if (input.val()) {
            var form = $('form')[0];
            add.val('waiting...');
            add.unbind('click').attr('disabled','disabled');
            form.action = 'index.php?d='+d+'&a=new_file&private_key='+private_key;
            form.submit();
            
        } else {
            notice('请选择文件');
        }
    });

    $('thead').prepend(tr);
});

if (info != '') {
    notice(info);
}

$('.realtime').each(function(){
    var ctime = $(this).html();
    $(this).html(real_time(ctime));
});

$('.size_format').each(function(){
    var size = $(this).html();
    $(this).html(size_format(size));
});

$('.folder_info').hover(function(){
    var dir = $(this).find('a').html();
    var del = $('<span style="float:right;padding-top:2px;"><img src="library/famfamfam/action_stop.gif" /></span>');
    del.click(function() {
        if (confirm('确定删除目录 : '+dir+' ?')) {
            if (confirm('请再次确认操作 , 此操作会删除目录下的所有文件')) {
                del.unbind('click');
                location.href = '?d='+d+'/'+dir+'&a=delete&private_key='+private_key;
            }
        }
    });
    $(this).prepend(del);
},function(){
    $(this).parent().parent().find('span').remove();
});

$('.file_info').hover(function(){
    var filename = $(this).find('a').html();
    var url = $(this).find('a').attr('href');
    var htm = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"\
            width="110"\
            height="14"\
            id="clippy" style="display:inline;">\
    <param name="movie" value="library/clippy.swf"/>\
    <param name="allowScriptAccess" value="always" />\
    <param name="quality" value="high" />\
    <param name="scale" value="noscale" />\
    <param NAME="FlashVars" value="text='+url+'">\
    <param name="bgcolor" value="#eeeeee">\
    <embed src="library/clippy.swf"\
           width="110"\
           height="14"\
           name="clippy"\
           quality="high"\
           allowScriptAccess="always"\
           type="application/x-shockwave-flash"\
           pluginspage="http://www.macromedia.com/go/getflashplayer"\
           FlashVars="text='+url+'"\
           bgcolor="#eeeeee" /></object>';
    $(this).append('<span style="padding-left:5px;">'+htm+'</span>');
    var del = $('<span style="float:right;padding-top:2px;"><img src="library/famfamfam/action_stop.gif" /></span>');
    del.click(function() {
        if (confirm('确定删除文件 : '+filename+' ?')) {
            del.unbind('click');
            location.href = '?d='+d+'/'+filename+'&a=delete&private_key='+private_key;
        }
    });
    $(this).prepend(del);
}, function(){
    $(this).parent().parent().find('span').remove();
});


$('tr').hover(function(){
    $(this).css('background', '#eee');
},function(){
    $(this).parent().find('tr').css('background', '#fff');
});


});