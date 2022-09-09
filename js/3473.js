var newtmps = "1";
var tmps = "0";
var nb_id=1;
var iscnn = false;
function scroll(id)
{
    var elmt = document.getElementById(id);
    i=-1;
    while(elmt.scrollTop>i)
    {
        i=elmt.scrollTop;
        elmt.scrollTop+=1000;
    }
    return true;
}
function remplace(data, search, replace)
{
	var temp = data;
	var longueur = search.length;
	while(temp.indexOf(search) > -1)
	{
		pos = temp.indexOf(search);
		temp = (temp.substring(0, pos) + replace + temp.substring((pos + longueur), temp.length));
	}
	return temp;
}
function send_msg(id)
{
	if(!iscnn)
    {
        if(document.getElementById('tchat_'+id+'_pseudo').value != "")
        {
            document.getElementById('formu_3473').style.display='block';
            document.getElementById('pseudo_3473').style.display='none';
            document.getElementById('pseudo_ifs_3473').innerHTML = document.getElementById('tchat_3473_pseudo').value;
            iscnn = true;
        }
        else
        {
                alert('please type your gamertag.');
        }
        return false;
    }
    else
    {
        var pseudo="";var message="";
        if(document.getElementById('tchat_'+id+'_pseudo').value != "")
        {
        	pseudo = escape(document.getElementById('tchat_'+id+'_pseudo').value);
	        pseudo = remplace(pseudo,'+','%2B');
        }
        else
        {
                alert('please type a gamertag!');
        }
        if(document.getElementById('tchat_'+id+'_message').value != "")
        {
        	message = escape(document.getElementById('tchat_'+id+'_message').value);
	        message = remplace(message,'+','%2B');
        }
        else
        {
                alert('your message is empty..!');
        }
        var js_effets=document.createElement("script");
        js_effets.setAttribute("type", "text/javascript");
        js_effets.setAttribute("src", "http://services.webestools.com/chat/sendmsg-"+id+".js?pseudo="+pseudo+"&message="+message+"");
        document.getElementsByTagName("script")[0].parentNode.insertBefore(js_effets,document.getElementsByTagName("script")[0]);
        document.getElementById('tchat_'+id+'_message').value="";
		return null;
	}
}
function charge_msg(id,id2)
{
	if(id2==nb_id)
    {
        anc_scl = document.getElementById("tchat_p_aff_3473").scrollTop;
        var js_effets=document.createElement("script");
        js_effets.setAttribute("type", "text/javascript");
        js_effets.setAttribute("src", "http://services.webestools.com/chat/msg-"+id+".js?"+(new Date()));
        document.getElementsByTagName("script")[0].parentNode.insertBefore(js_effets,document.getElementsByTagName("script")[0]);
        setTimeout('charge_msg(3473,'+id2+');',5000);
	}
}
function insert(d,f,textarea,n)
{
	var input = document.getElementById(textarea);
	var scroll = input.scrollTop;
	input.focus();
	if(n)
	{
		if(typeof document.selection != 'undefined')
		{
			var range = document.selection.createRange();
			range.text = d + f;
			range = document.selection.createRange();
			range.select();
		}
		else if(typeof input.selectionStart != 'undefined')
		{
			var deb = input.selectionStart;
			var fin = input.selectionEnd;
			input.value = input.value.substr(0, deb) + d + f + input.value.substr(fin);
		}
		else
		{
			var pos;
			var re = new RegExp('^[0-9]{0,3}$');
			while(!re.test(pos))
			{
				pos = prompt("insertion (0.." + input.value.length + "):", "0");
			}
			if(pos > input.value.length)
			{
				pos = input.value.length;
			}
			input.value = input.value.substr(0, pos) + d + f + input.value.substr(pos);
		}
	}
	else
	{
		if(typeof document.selection != 'undefined')
		{
			var range = document.selection.createRange();
			var text_sel = range.text;
			range.text = d + text_sel + f;
			range = document.selection.createRange();
			if (text_sel.length == 0)
			{
				range.move('character', -f.length);
			}
			else
			{
				range.moveStart('character', d.length + text_sel.length + f.length);
			}
			range.select();
		}
		else if(typeof input.selectionStart != 'undefined')
		{
			var deb = input.selectionStart;
			var fin = input.selectionEnd;
			var text_sel = input.value.substring(deb,fin);
			input.value = input.value.substr(0, deb) + d + text_sel + f + input.value.substr(fin);
			var pos;
			if (text_sel.length == 0)
			{
				pos = deb + d.length;
			}
			else
			{
				pos = deb + d.length + text_sel.length + f.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
		else
		{
			var pos;
			var re = new RegExp('^[0-9]{0,3}$');
			while(!re.test(pos))
			{
				pos = prompt("insertion (0.." + input.value.length + "):", "0");
			}
			if(pos > input.value.length)
			{
				pos = input.value.length;
			}
			var insText = prompt("please type the text");
			input.value = input.value.substr(0, pos) + d + text_sel + f + input.value.substr(pos);
		}
	}
	input.scrollTop = scroll;
}
var tchat_index = "<style type=\"text/css\">"
+".contenu_3473{"
+"	width:650px;"
+"	height:450px;"
+"	padding:0px;"
+"	margin:auto;"
+"}"
+".ctn2_3473{"
+"	width:610px;"
+"	height:410px;"
+"	padding:20px;"
+"	margin:0px;"
+"	background-color:#2b2d30;"
+"}"
+".send_msg_3473{"
+"	padding:0px;"
+"	margin:0px;"
+"}"
+".head_msg_gauche_3473{"
+"	float:left;"
+"}"
+".head_msg_droite_3473{"
+"	float:right;"
+"}"
+".clean_3473{"
+"	clear:both;"
+"}"
+".input_msg_3473, .input_msg_3473:hover, .input_msg_3473:focus"
+"{"
+"	background:#40444b;"
+"	margin:0px;"
+"	border:0px;"
+"	padding:0px;"
+"	width:485px;"
+"	height:30px;"
+"	font-size:16px;"
+"	color:#b9bbbe;"
+"	padding-left:5px;"
+"	border-radius:0px;"
+"	-moz-border-radius:0px;"
+"	-webkit-border-radius:0px;"
+"	border-bottom-left-radius:5px;"
+"	-moz-border-radius-bottomleft:5px;"
+"	-webkit-border-bottom-left-radius:5px;"
+"}"
+".input_pseu_3473, .input_pseu_3473:hover, .input_pseu_3473:focus"
+"{"
+"	background:white;"
+"	margin:0px;"
+"	border:1px solid #dddddd;"
+"	border-radius:3px;"
+"	-moz-border-radius:3px;"
+"	-webkit-border-radius:3px;"
+"}"
+".img_3473{"
+"	border:0px;"
+"}"
+".message_ls_3473{"
+"	height:330px;"
+"	overflow:auto;"
+"	padding:5px;"
+"	background-color:#36393f;"
+"	border-radius:10px;"
+"	-moz-border-radius:10px;"
+"	-webkit-border-radius:10px;"
+"	color: #cdcdcd;"
+"	margin-bottom:20px;"
+"}"
+".date_3473{"
+"	color:#71757c;"
+"	font-size:0.9em;"
+"}"
+".champs_3473{"
+"	width:490px;"
+"	float:left;"
+"}"
+".btn_3473{"
+"	width:120px;"
+"	height:30px;"
+"	margin-left:490px;"
+"}"
+".emoti_3473{"
+"	width:480px;"
+"	height:20px;"
+"	background-color:#292b2f;"
+"	padding:5px;"
+"	border-top-left-radius:5px;"
+"	border-top-right-radius:5px;"
+"	-moz-border-radius-topleft:5px;"
+"	-moz-border-radius-topright:5px;"
+"	-webkit-border-top-left-radius:5px;"
+"	-webkit-border-top-right-radius:5px;"
+"}"
+".pseudo_3473{"
+"	width:610px;"
+"	height:22px;"
+"	text-align:center;"
+"	background:#202225;"
+"	color:#fff;"
+"	border-radius:10px;"
+"	-moz-border-radius:10px;"
+"	-webkit-border-radius:10px;"
+"	padding-top:19px;"
+"	padding-bottom:19px;"
+"}"
+".formu_3473{"
+"	display:none;"
+"}"
+".pseudo_ifs_3473{"
+"	height:30px;"
+"	overflow:hidden;"
+"	font-weight:bold;"
+"	text-align:center;"
+"}"
+".pseudo_ifs_3473 span"
+"{"
+"	background-color:#292b2f;"
+"	color:white;"
+"}"
+"</style>"
+"	<div class=\"contenu_3473\"><div class=\"ctn2_3473\">"
+"		<div class=\"message_ls_3473\" id=\"tchat_p_aff_3473\"></div>"
+"		<script type=\"text/javascript\">"
+"			charge_msg(3473,1);"
+"		</script>"
+"			<form onsubmit=\"send_msg(3473); return false;\" action=\"index.html\" method=\"post\">"
+"<div class=\"send_msg_3473\">"
+"     <div class=\"pseudo_3473\" id=\"pseudo_3473\">"
+"        <strong><img src=\"../img/B].png\"><label class=\"label\" for=\"tchat_3473_pseudo\"> Gamertag</label></strong> <input class=\"input_pseu_3473\" type=\"text\" name=\"pseudo\" id=\"tchat_3473_pseudo\" value=\"\" width=\"20\" /> <input type=\"submit\" value=\"Join\" />"
+"    </div>"
+"	<div class=\"formu_3473\" id=\"formu_3473\">"
+"        <div class=\"champs_3473\">"
+"            <div class=\"emoti_3473\">"
+"                <img src=\"../img/bold.png\" onclick=\"javascript:insert('[b]','[/b]','tchat_3473_message');\" alt=\"Bold\" /> <img src=\"../img/=D.png\" alt=\" :D \" onclick=\"javascript:insert(' :D ','','tchat_3473_message');\" /> <img src=\"../img/=].png\" alt=\" :) \" onclick=\"javascript:insert(' :) ','','tchat_3473_message');\" /> <img src=\"../img/=[.png\" alt=\" :( \" onclick=\"javascript:insert(' :( ','','tchat_3473_message');\" /> <img src=\"../img/=P.png\" alt=\" :p \" onclick=\"javascript:insert(' :p ','','tchat_3473_message');\" /> <img src=\"../img/8].png\" alt=\" flushed \" onclick=\"javascript:insert(' 8) ','','tchat_3473_message');\" /> <img src=\"../img/love.png\" alt=\" <3 \" onclick=\"javascript:insert('o)','','tchat_3473_message');\" /> <img src=\"../img/pissed.png\" alt=\" pissed \" onclick=\"javascript:insert(' :angry: ','','tchat_3473_message');\" /> <img src=\"../img/woozy.png\" alt=\" :content: \" onclick=\"javascript:insert(' :happy: ','','tchat_3473_message');\" /> <img src=\"../img/HUG.png\" alt=\" hug \" onclick=\"javascript:insert(' :sick: ','','tchat_3473_message');\" /> <img src=\"../img/pleading.png\" alt=\" pleading \" onclick=\"javascript:insert(' ;) ','','tchat_3473_message');\" /> <img src=\"../img/B].png\" alt=\" sunglasses \" onclick=\"javascript:insert(' :glasses: ','','tchat_3473_message');\" /></div>"
+"                <input class=\"input_msg_3473\" type=\"text\" name=\"message\" id=\"tchat_3473_message\" autocomplete=\"off\" value=\"\" />"
+"        </div>"
+"        <div class=\"btn_3473\"><div class=\"pseudo_ifs_3473\"><span id=\"pseudo_ifs_3473\"></span></div><input type=\"image\" style=\"margin:0px;padding:0px;border:0px;background:none;width:auto;\" src=\"../img/send.png\" value=\"Send\" /></div><div class=\"clean_3473\"></div>"
+"    </div>"
+"</div>"
+"			</form>"
+"           	</div></div>"
+"";
document.write(tchat_index);