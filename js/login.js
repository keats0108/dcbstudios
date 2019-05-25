var intervalTimer;
var homeIntervalTimer;
function loginInterval()
{
	intervalTimer = setInterval(function areULoggedIn()
	{
		var imgInti = new Image();   // Create new image element
		var dInti=new Date();
		imgInti.src="https://myschool.dulwich-beijing.cn/pluginfile.php/41814/course/section/5555/IMG230.jpg?"+dInti.getTime();
		imgInti.onload = function(){
		 	self.location = "../home.html"
		};
	},1000)
}

function loginInterval2()
{
	homeIntervalTimer = setInterval(function areULoggedIn()
	{
		var imgInti = new Image();   // Create new image element
		var dInti=new Date();
		imgInti.src="https://myschool.dulwich-beijing.cn/pluginfile.php/41814/course/section/5555/IMG230.jpg?"+dInti.getTime();
		imgInti.onerror = function(){
		 	self.location = "../index.html"
		};
	},1000)
}

function stopTimer()
{
	clearInterval(intervalTimer);
}

function MySchool()
{
	window.open("https://myschool.dulwich-beijing.cn/login/index.php")
}