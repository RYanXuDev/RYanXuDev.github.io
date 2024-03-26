document.addEventListener('DOMContentLoaded', function() 
{
	var navItems = document.querySelectorAll(".navbar a");

    navItems.forEach(function(item) 
	{
		item.addEventListener("click", function() 
		{
			navItems.forEach(function(navItem) 
			{
				navItem.classList.remove("active");
			});

			this.classList.add("active");
		});
    });
});

document.addEventListener('DOMContentLoaded', function() 
{
	var navItems = document.querySelectorAll(".navbar ul li");
    var currentPage = window.location.pathname;

    navItems.forEach(function(item) 
	{
		item.addEventListener("click", function() 
		{
			navItems.forEach(function(navItem) 
			{
				navItem.classList.remove("active");
			});

			this.classList.add("active");
		});
    });

    navItems.forEach(function(item) 
	{
		var link = item.querySelector("a");

		if (link && link.getAttribute("href") === currentPage) 
		{
			item.classList.add("active");
		}
	});
});

document.addEventListener("DOMContentLoaded", function() 
{
    var currentYearElement = document.getElementById("current-year");

    if (currentYearElement) 
	{
      currentYearElement.textContent = new Date().getFullYear();
    }
});