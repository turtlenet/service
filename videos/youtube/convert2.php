<html>
	<head>
		<link rel="stylesheet" href="../../css/convert.css">
	</head>
	<body>
		<a href="index.php"><img src="../../img/youtube/ytlogo.png" height="32px"></a>
	<?php
	$session = rand(1,99);
	exec('rm '.$session.'.flv');
	exec('pkill -f ffmpeg');
	exec('pkill -f youtube-dl');
	exec('rm movie.*');
	exec('rm *.part');
	$search = $_GET["id"];
	$progress = shell_exec('youtube-dl --force-ipv4 -q -o "movie.%(ext)s" --exec "ffmpeg -i {} -ar 22050 -f flv -s 320x240 -ab 32 -threads 4 -filter:v fps=fps=15 -ss 00:00:00 -to 00:05:00 '.$session.'.flv" '.$search.'');
	echo "<div style='text-align:center;'><object type='application/x-shockwave-flash' data='player.swf' width='384' height='256' id='flvplayer' style='visibility: visible;'>";
	echo "<param name='id' value='flvplayer'>";
	echo "<param name='wmode' value='transparent'>";
	echo "<param name='allowFullScreen' value='false'>";
	echo "<param name='allowScriptAccess' value='always'>";
	echo "<param name='quality' value='medium'>";
	echo "<param name='flashvars' value='filename=".$session.".flv'>";
	echo "</object></div>";
?>



<br><h2><?php $api_key = "api key here :)"; $url = "https://www.googleapis.com/youtube/v3/videos?id=" . $search . "&key=" . $api_key . "&part=snippet,contentDetails,statistics,status"; $json = file_get_contents($url); $getData = json_decode( $json , true); foreach((array)$getData['items'] as $key => $gDat){    $title = $gDat['snippet']['title']; $author = $gDat['snippet']['channelTitle']; $description = $gDat['snippet']['description']; $date = $gDat['snippet']['publishedAt']; } echo $title; ?></h2><?php echo $author ?><br>Published on <?php echo $date ?><br><?php echo $description ?>
</body>
</html>
