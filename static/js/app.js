// Read the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Log the URL
d3.json(url).then(function(data) {
    console.log(data);
});


// Initialize the page
function init()
{
    // Select dropdown menu using d3 and assign a value
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then(function(data) {        
        
        // Define a variable for the sample names and attach them to the dropdown
        let names = data.names;        
        names.forEach((id) =>
        {
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });
        
        // Define the first sample and log it
        let sample1 = names[0];
        console.log(sample1);

        // createMetadata(sample1);
        createBarChart(sample1);
        // createBubbleChart(sample1);
    });
};

// Function to show the bar chart
function createBarChart(sample) {
    d3.json(url).then(function(data) {

        let samples = data.samples;
        let values = samples.filter(result => result.id == sample);
        let valueData = values[0];

        // Define the vairables for the graphs
        let sample_values = valueData.sample_values;
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_samples;

        console.log(sample_values, otu_ids, otu_labels);

        let bar = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: 'bar',
            orientation: 'h'
        };
          
          Plotly.newPlot("bar", [bar])
    });
};

// // Function to show the bubble chart
// function createBubbleChart(sample) {
//     d3.json(url).then(function(data) {

//         let sample 
//     });
// }

// Initialize webpage
init();