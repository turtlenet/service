var answer=['It is certain','It is<br>decidely so','Without a<br />doubt','Yes-<br />definitely','You may rely<br />on it','As I see it,<br>yes','Most likely','Outlook<br>good','Sign points to<br />yes','Yes','Reply hazy,<br />try again','Ask again later','Better not<br />tell you now','Cannot predict<br />now','Concentrate<br />and ask again','Don\'t<br />count on it','My<br />reply is no','My sources<br />say no','Outlook<br />not so good','Very<br />doubtful'];
window.srcoll(0,10);
	function roll(){
		var i=Math.floor(Math.random()*20);
		document.getElementById('ball').innerHTML='<span id="answer" style="font-size:20px; position:relative; opacity: 0; top:135px;background-color:#000152;color:#fff;">'+answer[i]+'</span>';
			fadeIn();
			setTimeout("fadeOut()",2500);
			}
			
				function fadeIn(){
					setTimeout("document.getElementById('answer').style.opacity=1.0",1000);
				}
				function fadeOut(){
					setTimeout("document.getElementById('answer').style.opacity=0",1100);
				}