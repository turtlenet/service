<head>
	<link rel="stylesheet" type="text/css" href="../../../css/videos.css"/>
</head>
<body>
        <div style="text-align:center;">
			<div style="width:100%;background-color:#000;">
            <object type="application/x-shockwave-flash" data="../../resources/player.swf" width="384" height="256">
                <param name="wmode" value="transparent">
                <param name="allowFullScreen" value="false">
                <param name='flashvars' value='filename=wiinet-2-1.flv'>
            </object>
			</div>
            PART 1 - <a href="index2.html">PART 2</a>
            <h1>What's next for WiiNet? - Project update (June 2023)</h1>
            <div style="font-size:20px;"><?php class pageView { private $file = 'views.txt'; public function add_view() { $prev_count = file_get_contents($this->file); file_put_contents($this->file, $prev_count+1); } public function get_view() { $count = file_get_contents($this->file); return $count; } } $view = new pageView; $view->add_view(); echo $view->get_view().' views'; ?> - 
			June 3, 2023
			</div>
        </div>
        <table>
            <tr>
                <td> 
                    <a href="../"><img src="../pfp.jpg" style="max-width:100px;"></a>
                </td>
                <td>
                    <a href="../">WiiNet</a>
				</td>
				<td style="padding-left:20px;">
					<h2>Description</h2>
					soafen and Turtle discuss the current progress with WiiNet and future plans for the project, along with how you can help out!
				</td>
            </tr>
            </table>
    </body>
</html>
