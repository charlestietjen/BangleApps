const bg_forest = require('./assets/image/bg_forest');

function saveData() {
    var data = {
        message: "Hello, World!",
        timestamp: new Date().toISOString()
    };

    // Convert data to JSON string
    var jsonData = JSON.stringify(data);

    // Open a file in write mode and save the JSON string
    require('Storage').write('./mydata.json', jsonData);
    console.log('Data saved successfully!');
}

function loadData() {
    // Read the JSON string from the file
    var jsonData = require('Storage').read('./mydata.json');
    
    // Parse the JSON string back to a JavaScript object
    var data = JSON.parse(jsonData);
    
    console.log('Data loaded:', data);
}

Graphics.clear();
Graphics.drawImage(bg_forest);