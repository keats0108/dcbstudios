$( document ).ready(function() 
{
    console.log( "ready!" );
	
	$("#enterSite").click(function() {
    $('html, body').animate({
			scrollTop: $("#frontPageLogin").offset().top
		}, 1000);
	});

	$("#backToTitle").click(function() {
    $('html, body').animate({
			scrollTop: $("#top").offset().top
		}, 500);
	});
	
	$('a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 1000);
		}
	});
	
	$(window).scroll(function(){
		$("#TitleCard").css("opacity", 1 - $(window).scrollTop() / 250);
	  });

	ScrollReveal({ reset: true });
	ScrollReveal().reveal('.login', { delay: 500});
	
	
	$("#MainSearchBar").on("keyup", function() 
	{
		var value = $(this).val().toLowerCase();
		$("#movieData tr").filter(function() 
		{
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
  	});
	
});

var intervalTimer;
var homeIntervalTimer;
function loginInterval()
{
	intervalTimer = setInterval(function areULoggedIn()
	{
		var imgInti = new Image();   // Create new image element
		var dInti=new Date();
		imgInti.src="https://myschool.dulwich-beijing.cn/pluginfile.php/1/theme_titusb4/headerlogo/1557251264/Dulwich%20College%20Beijing.png"+dInti.getTime();
		imgInti.onload = function(){
		 	self.location = "home.html"
		};
	},1000)
}
function loginInterval2()
{
	homeIntervalTimer = setInterval(function areULoggedIn()
	{
		var imgInti = new Image();   // Create new image element
		var dInti=new Date();
		imgInti.src="https://myschool.dulwich-beijing.cn/pluginfile.php/1/theme_titusb4/headerlogo/1557251264/Dulwich%20College%20Beijing.png"+dInti.getTime();
		imgInti.onerror = function(){
		 	self.location = "index.html"
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
var opened = false;
function searchNow()
{	
	if(opened==false)
	{
		$("#searchSquare").addClass("newSquareDimentions");
		$("#searchSquare").removeClass("oldSquareDimentions");
		$("body").addClass("noScroll");
		$("#MainSearchBar").addClass("show")
		$("#MainSearchBar").removeClass("hide")
		PopulateDatabase();
		opened = true;
		
	}
	else if(opened == true)
	{
		$("#searchSquare").addClass("oldSquareDimentions");
		$("#searchSquare").removeClass("newSquareDimentions");
		$("body").removeClass("noScroll");
		$("#MainSearchBar").addClass("hide")
		$("#MainSearchBar").removeClass("show")
		hideDatabase();
		opened=false;
	}
	
}
function openSearch()
{
	$("#searchSquare").addClass("newSquareDimentions");
		$("#searchSquare").removeClass("oldSquareDimentions");
		$("body").addClass("noScroll");
		$("#MainSearchBar").addClass("show")
		$("#MainSearchBar").removeClass("hide")
		PopulateDatabase();
		opened = true;
}

function PopulateDatabase()
{
	$("#MainSearchBar").val("");
	jQuery.get('/dcbmovies/Pages/Databases/MovieDatabase.csv', function(data) // getting the file
	{     
		var movie_data = data.split(/\r?\n|\r/);
		var table_data = '<table class="table table-bordered table-striped whiteColorTable table-hover">';
		console.log(movie_data)
		movie_data = movie_data.filter(function(v){return v!==''});
		for(var count = 0; count<movie_data.length; count++)
		{
			var cell_data = movie_data[count].split(",");
			
			if(count == 1)
			{
				table_data += '<tbody id="movieData">'
			}
		 	table_data += '<tr>';
		 	for(var cell_count=1; cell_count<cell_data.length-3; cell_count++)
			{
				if(count === 0)
				{
					table_data += '<th>'+cell_data[cell_count]+'</th>';
				}
				else 
				{
					if(cell_count===4)
					{
						table_data += '<td><button onClick="self.location=\'/dcbmovies/Pages/Players/DefaultPlayer.html\';localStorage.setItem(\'VideoLink\',\''+cell_data[cell_count]+'\');localStorage.setItem(\'VideoTitle\',\''+cell_data[2]+'\');" type="button" class="btn btn-secondary">Go To Video</button></td>'
						
					}
					else
					{
						table_data += '<td>'+cell_data[cell_count]+'</td>';
					}
					
				}
			}
			table_data += '</tr>';
		}
		table_data += '</tbody>'
		table_data += '</table>';
		$('#movieTableDiv').html(table_data);
		console.log(table_data);
	}); 
	
}
function PopulateVideo()
{
	var videoHTML = '<h3 id="videoTitle">'+localStorage.getItem("VideoTitle")+'</h3><div class="video"><video controls><source src="'+localStorage.getItem("VideoLink")+'"></video></div>'
	$("#videoContainer").html(videoHTML)
	
	if(localStorage.getItem("VideoTitle")==null || localStorage.getItem("VideoLink")==null)
	{
		$("#videoTitle").html("No Video Selected...")
	}
}
function PopulateRecent()
{
	var movieIDs = []; 
	jQuery.get('Databases/RecentlyReleasedDatabase.csv', function(data) // getting the file
	{     
		var idData = data.split(/\r?\n|\r/);
		idData = idData.filter(function(v){return v!==''});
		for(var count = 1; count<idData.length; count++)
		{
			var cell_data = idData[count].split(",");
			movieIDs.push(cell_data[0].trim())
		}
	}); 
	jQuery.get('Databases/MovieDatabase.csv', function(data) // getting the file
	{
		var movie_data = data.split(/\r?\n|\r/);
		var RecentRData = '<div class="row center-block container load-hidden recentlyReleased "><div class="col-lg-1 col-md-1 col-sm-1"></div><h5 class="FancyTitle col-md-4 col-lg-4 col-sm-4">&nbsp;&nbsp;&nbsp;Recently Released</h5><div class="col-lg-3 col-md-2 col-sm-2"></div><div class="col-lg-3 col-md-4 col-sm-4"></div><div class="col-lg-3 col-md-4 col-sm-4"></div></div>'
		RecentRData += '<div class="row container load-hidden recentlyReleased column-in-center">';
		
		movie_data = movie_data.filter(function(v){return v!==''});
		
		for(var count = 1; count<movie_data.length; count++)
		{
			var cell_data = movie_data[count].split(",");
			if(cell_data[0].trim() == movieIDs[count-1])
			{
				RecentRData += '<a class="overlayCard" onmouseover="setCardText(\''+cell_data[2]+'\',\''+cell_data[7]+'\')" href="javascript:GoToVideoRecentlyReleased(\''+cell_data[2]+'\',\''+cell_data[4]+'\')"><div class="col-lg-2 col-sm-3"><img src="'+cell_data[5]+'"></div></a>';
			
				if(count == 5)
				{
					RecentRData += '</div>'
					RecentRData += '<div class="row container load-hidden recentlyReleased column-in-center">';
				}
			}
		}
		RecentRData += '</div>'
		$('#RecentlyReleased').html(RecentRData);
		console.log(RecentRData);
		
		ScrollReveal({ reset: false });
		ScrollReveal().reveal('.recentlyReleased', { delay: 500});
		/*the function showInfo is executed on mouseover and mouseout*/
		$('.overlayCard').hover(function(){
			/*get the coordinates of the button element using jquery offset*/
			var offset = $(this).offset();	
			/*get the top Position of the info element. $(window).scrollTop() is used to calculate the right top coordinate of the button element after the window is scrolled*/
			var topOffset = $(this).offset().top- $(window).scrollTop();
			  /*set the position of the info element*/
				 $(".info").css({
					visibility: "visible",
					position:"fixed",
					top: (topOffset + -169)+ "px",
					left: (offset.left + 15) + "px",
				});
		},function(){
			$('.info').css({'left':-9999});
		});

	});
	
}
function PopulateSlideShow()
{
	var movieIDs = []; 
	jQuery.get('Databases/BannersDatabase.csv', function(data) // getting the file
	{     
		var idData = data.split(/\r?\n|\r/);
		idData = idData.filter(function(v){return v!==''});
		for(var count = 1; count<idData.length; count++)
		{
			var cell_data = idData[count].split(",");
			movieIDs.push(cell_data[0].trim())
		}
	}); 
	
	jQuery.get('Databases/MovieDatabase.csv', function(data) // getting the file
	{     
		var movie_data = data.split(/\r?\n|\r/);
		var slideShowData = '<div id="mainPageSlide" class="carousel slide" data-ride="carousel"><ul class="carousel-indicators"><li data-target="#mainPageSlide" data-slide-to="0" class="active"></li>';
		
		for(var count = 1; count<movieIDs.length; count++)
		{
			slideShowData+='<li data-target="#mainPageSlide" data-slide-to="'+count+'" id="dataslide'+count+'"></li>'
		}
		slideShowData+='</ul><div class="carousel-inner">'
		
		movie_data = movie_data.filter(function(v){return v!==''});
		for(var count = 1; count<movie_data.length; count++)
		{
			
			var cell_data = movie_data[count].split(",");
			if(cell_data[0].trim() == movieIDs[count-1])
			{		
				if(count == 1)
				{
					slideShowData += '<div class="carousel-item active"><a href="javascript:GoToVideoRecentlyReleased(\''+cell_data[2]+'\',\''+cell_data[4]+'\')"><img src="'+cell_data[6]+'" width="1100" height="500"></a><div class="carousel-caption jumbotron d-none d-sm-block"><h3>'+cell_data[2]+'</h3><p>'+cell_data[7]+'</p></div></div>'
				}
				else
				{
					slideShowData += '<div class="carousel-item"><a href="javascript:GoToVideoRecentlyReleased(\''+cell_data[2]+'\',\''+cell_data[4]+'\')"><img src="'+cell_data[6]+'" width="1100" height="500"></a><div class="carousel-caption jumbotron d-none d-sm-block"><h3>'+cell_data[2]+'</h3><p>'+cell_data[7]+'</p></div></div>'
				}
			}
		}
		slideShowData += '</div><a class="carousel-control-prev" id="previous" href="#mainPageSlide" data-slide="prev"><span class="carousel-control-prev-icon"></span></a><a id="next" class="carousel-control-next" href="#mainPageSlide" data-slide="next"><span class="carousel-control-next-icon"></span></a></div>'
		
		$('#slideContainer').html(slideShowData);
		
		$('#next')[0].click();
		window.setTimeout(function(){
			$('#previous')[0].click();
		},1500);
		
		console.log(slideShowData);
	});
}

function setCardText(Title,Description)
{
	var txt = '<h5 class="card-title">'+Title+'</h5><p class="card-text">'+Description+'</p>';
	$("#cardText").html(txt);
}

function hideDatabase()
{
	$('#movieTableDiv').html("");
	$("#MainSearchBar").val("");
}
function GoToVideoRecentlyReleased(Title, Link)
{
	localStorage.setItem("VideoLink",Link)
	localStorage.setItem("VideoTitle",Title)
	self.location = "/dcbmovies/Pages/Players/DefaultPlayer.html"
}
function categorySearch(category)
{
	openSearch()
	$("#MainSearchBar").val(category);
	window.setTimeout(function(){
		$("#movieData tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(category.toLowerCase()) > -1)
    	});
	},1000);
	
}

function minimizedCloseSearch()
{
	if(opened == true)
	{
		$("#searchSquare").addClass("oldSquareDimentions");
		$("#searchSquare").removeClass("newSquareDimentions");
		$("body").removeClass("noScroll");
		$("#MainSearchBar").addClass("hide")
		$("#MainSearchBar").removeClass("show")
		hideDatabase();
		opened=false;
	}
}

function areYouHome()
{
	if(location.pathname != "/dcbmovies/home.html")
	{
		self.location = "/dcbmovies/home.html"
	}
}