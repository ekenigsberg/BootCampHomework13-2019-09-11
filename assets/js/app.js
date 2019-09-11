// declare total size of SVG
let intTotalWid = 960;
let intTotalHgt = 500;

// set chart margins
let objMargin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// set "active" SVG size (ie, total size minus margins)
let intActiveWid = intTotalWid - objMargin.left - objMargin.right;
let intActiveHgt = intTotalHgt - objMargin.top - objMargin.bottom;

// append an SVG within the "scatter" div
let svg = d3.select("#scatter")
  .append("svg")
  .attr("width", intTotalWid)
  .attr("height", intTotalHgt);

// append a group ("g" tag) within the SVG. Almost everything gets appended to this tag.
let g = svg.append("g")
  .attr("transform", `translate(${objMargin.left}, ${objMargin.top})`);

// open csv
d3.csv("assets/data/data.csv")
  .then(arrState=>{

    // 1) cast data
    arrState.forEach(obj=>{
      obj.income = +obj.income;
      obj.obesity = +obj.obesity;
    });

    // 2) create scale functions
    let fnXScale = d3.scaleLinear()
      .domain([d3.min(arrState, d => d.income), d3.max(arrState, d => d.income)])
      .range([0, intActiveWid]);

    let fnYScale = d3.scaleLinear()
      .domain([d3.min(arrState, d => d.obesity), d3.max(arrState, d => d.obesity)])
      .range([intActiveHgt, 0]);

    // 3) create axis functions
    let fnXAxis = d3.axisBottom(fnXScale);
    let fnYAxis = d3.axisLeft(fnYScale);

    // 4) append axis functions to G tag
    g.append("g")
      .attr("transform", `translate(0, ${intActiveHgt})`)
      .call(fnXAxis);
    g.append("g")
      .call(fnYAxis);

    // 5) create circles
    let objCir = g.selectAll("circle")
			.data(arrState)
			.enter()
			.append("circle")
			.attr("cx", obj=>fnXScale(obj.income))
			.attr("cy", obj=>fnYScale(obj.obesity))
			.attr("r", "10")
			.attr("fill", "lightblue")
			.attr("opacity", "1")
		
		// 6) create text labels. Note: instead of selecting all text tags, I select
		// only those tags with the "circlelabel" class
    let objTxt = g.selectAll(".circlelabel")
			.data(arrState)
			.enter()
			.append("text")
			.attr("class", "circlelabel")
			.attr("dx", obj=>fnXScale(obj.income) - 7)
			.attr("dy", obj=>fnYScale(obj.obesity) + 4)
			.text(obj=>obj.abbr)
      .attr("fill", "white")
      .attr("font-size", 10);

			
    // 7) create tooltip function
    let fnToolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(obj=>{
        return (`<strong>${obj.state}</strong><br>Income: $${obj.income.toLocaleString()}<br>Obesity: ${obj.obesity}%`);
      });

    // 8) bind tooltip function to chart
    g.call(fnToolTip);

    // 9) create listeners to show & hide tooltip
    objCir.on("click", function(obj) {				// circle: on click
      fnToolTip.style("display", "block");
      fnToolTip.show(obj, this);
    })
      .on("mouseout", function(obj, index) {	// circle: on mouseout
        fnToolTip.hide(obj);
      });

    objTxt.on("click", function(obj) {				// text: on click
      fnToolTip.style("display", "block");
			fnToolTip.show(obj, this);
    })
      .on("mouseout", function(obj, index) {  // text: on mouseout
        fnToolTip.hide(obj);
      });

    // 10) label axes
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - objMargin.left + 40)
      .attr("x", 0 - (intActiveHgt / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity");

    g.append("text")
      .attr("transform", `translate(${intActiveWid / 2}, ${intActiveHgt + objMargin.top + 30})`)
      .attr("class", "axisText")
      .text("Income");
  });
