// Read the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize the page
function init() {
    // Select dropdown menu using d3 and assign a value
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then(function (data) {

        // Define a variable for the sample names and attach them to the dropdown
        let names = data.names;
        names.forEach((id) => {
            dropdownMenu.append("option")
                .text(id);
        });

        // Define the first sample and log it
        let sample1 = names[0];

        // createMetadata(sample1);
        optionChanged(sample1);
        // createBubbleChart(sample1);
    });
};

// Function to show the bar chart
function optionChanged(sample) {
    d3.json(url).then(function ({ metadata, samples }) {

        let meta = metadata.find(obj => obj.id == sample);

        d3.select(".panel-body").html("");
        Object.entries(meta).forEach(([key, val]) => {
            d3.select(".panel-body").append("h5").text(`${key.toUpperCase()}: ${val}`)
        })

        let { otu_ids, otu_labels, sample_values } = samples.find(result => result.id == sample);

        let bar = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        Plotly.newPlot("bar", [bar]);

        //   bubble chart

        let trace1 =
        {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker:
            {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        Plotly.newPlot("bubble", [trace1])



        // Metadata
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: meta.wfreq,
                title: { text: "<b> Belly Button Washing Frequency </b><br> Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 9] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gauge', data, layout);
    });
};

init();