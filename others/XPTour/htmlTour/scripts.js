
function setup()
{	eval("document.all." + main_nav + "_spacer.width=15");
	eval("document.all." + main_nav + ".removeAttribute('href')");
	eval("document.all." + main_nav + "_div.className = 'nav_header_selected'");
	eval("document.all." + main_nav + "_img.src= 'nav_" + main_nav + "_down.gif'");
	
	if(eval("document.all." + sub_nav))
	{
		if(eval("document.all." + sub_nav + ".className") == 'nav_blue_balls')
		{
			eval("document.all." + sub_nav + ".className = 'nav_blue_balls_selected'");
		}
		else
		{
			eval("document.all." + sub_nav + "_img.src = '" + main_nav + "_" + sub_nav + "_ghost.jpg'");
			eval("document.all.big_img.src= '" + main_nav + "_" + sub_nav + "_big.jpg'");
			eval("document.all." + sub_nav + ".className = 'ghost'");
		}
		
		eval("document.all." + sub_nav + ".removeAttribute('href')");	}
	
	//document.all.best_div.style.visibility="hidden"
	
	parent.footer.footer_setup(main_nav);
}function footer_setup(main_nav)
{
	eval("document.all.bot_nav_" + main_nav + ".className = 'nav_bottom_selected'");		
	eval("document.all.bot_nav_" + main_nav + ".removeAttribute('href')");}