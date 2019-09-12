# BootCampHomework13-2019-09-11

[HTML](https://github.com/ekenigsberg/BootCampHomework13-2019-09-11/blob/master/index.html) and [JavaScript](https://github.com/ekenigsberg/BootCampHomework13-2019-09-11/blob/master/assets/js/app.js) solutions<br/>
to<br/>
[Data Analytics Boot Camp Homework #13](https://github.com/the-Coding-Boot-Camp-at-UT/UTAMCB201904DATA3/blob/master/16-D3/Homework/Instructions/README.md)

# Screenshots: Income vs. Obesity
![Screenshot](https://github.com/ekenigsberg/BootCampHomework13-2019-09-11/blob/master/assets/screenshot.png)

# Technical Insights

* I was pleased to discover the bug causing some of the circles' labels not to appear: `d3.selectAll("text")` was choosing other text tags on the page. Adding an `.attr(class="circleLabel")` line to the text labels, and using `d3.selectAll(".circleLabel")`, fixed it.
* I didn't implement the full bonus assignment, but I did add the Tooltips, and styled them a bit with CSS.
