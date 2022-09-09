<head>
		<link rel="stylesheet" href="../../css/convert.css">
	</head>
	<body>
		<a href="index.php"><img src="../../img/youtube/ytlogo.png" height="32px"></a>
<form method="get">
    <p><input type="text" name="q" placeholder="Enter keyword" value="<?php if(array_key_exists('q', $_GET)) echo $_GET['q']; ?>" required></p>
    <p>
        <?php $arr_orders = ['date', 'rating', 'relevance', 'title', 'viewCount']; ?>
        <select name="order" required>
            <option value="">Sort by</option>
            <?php foreach ($arr_orders as $order) { ?>
                <option value="<?php echo $order; ?>" <?php if(array_key_exists('order', $_GET) && ($order==$_GET['order'])) echo 'selected'; ?>><?php echo ucfirst($order); ?></option>
            <?php } ?>
        </select>
    </p>
    <p><input type="submit" value="Search"></p>
</form>
<?php
$api_key = 'YouTube API Key';
  
$arr_list = array();
if (array_key_exists('q', $_GET) && array_key_exists('order', $_GET)) {
    $formatted_keyword = implode("+", explode(" ", $_GET['q']));
    $url = "https://www.googleapis.com/youtube/v3/search?q=$formatted_keyword&order=". $_GET['order'] ."&part=snippet&type=video&maxResults=5&key=". $api_key;
  
    if (array_key_exists('pageToken', $_GET)) {
        $url .= "&pageToken=". $_GET['pageToken'];
    }
 
    $arr_list = getYTList($url);
}
  
function getYTList($api_url = '') {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $arr_result = json_decode($response);
    if (isset($arr_result->items)) {
        return $arr_result;
    } elseif (isset($arr_result->error)) {
        //print error $arr_result->error
    }
}
?>
<?php
if (!empty($arr_list)) {
    echo '<table>';
    foreach ($arr_list->items as $item) {
		echo "<tr><td><a href='convert2.php?id=" . $item->id->videoId . "'>" . $item->snippet->title . "</a><br>by " . $item->snippet->channelTitle . "<br>Published on " . $item->snippet->publishTime . "<br>" . $item->snippet->description . "</td></tr>";
    }
  
    $url = "?q=". $_GET['q'] ."&order=". $_GET['order'];
    if (isset($arr_list->prevPageToken)) {
        echo '<a href="'.$url.'&pageToken='.$arr_list->prevPageToken.'">Previous</a> -';
    }
  
    if (isset($arr_list->nextPageToken)) {
        echo ' <a href="'.$url.'&pageToken='.$arr_list->nextPageToken.'">Next</a>';
    }
}
?>
