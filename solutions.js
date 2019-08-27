//Problem 1) 
//Write a function which prints ‘Done’ when all of the 10 requests are done from fetching a design with given id from server [GET: /design/{id: integer}]
function fetchImage(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(id)
        }, 1000);
    });
}

//Solution:

function mainOne() {
    const designIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10 design ids
    //as we need to fetch it from server so
    //let’s use promise for request execution and then process our
    //final result

    const promises = designIds.map(id => {
        return fetchImage(id);
    });

    //now as we have all designIds promises in promises variable so
    //wait for all of them to get done; because we want to execute
    //our final console AFTER that

    return Promise.all(promises)
        .then(results => console.log(`Done`))
        .catch(err => console.log(`occurred an error:`, err));
}

mainOne(); //calling the main function

//output
//---> Done


//Problem 2)

//Write a program to fetch 10 designs from server with their ids and then find the shape of each color property of all shapes from that design.

function fetchDesign(id) {
    return Promise.resolve({
        designId: id,
        shapes: [{
            shapeId: 'shape-rect',
            color: {
                r: 255,
                g: 255,
                b: 170
            },
        }, {
            shapeId: 'shape-square',
            color: {
                r: 255,
                g: 255,
                b: 170
            },
        }, {
            shapeId: 'shape-circle',
            color: {
                r: 255,
                g: 255,
                b: 170
            },
        }, {
            shapeId: 'shape-ellipse',
            color: {
                r: 0,
                g: 0,
                b: 0
            }
        }]
    });
}

//Solution:

function findAverage(array, key, avgOfKeys, totalLength) {
    const avgs = [];
    //sum of all items in the shapes...color.r
    //where a is the accumulator and b is the current object we are passing and
    //here we will access currentValue[key=color][x=r,g,b]
    avgOfKeys.forEach(x => {
        avgs.push(array.reduce((a, b) => a + b[key][x], 0) / totalLength)
    });
    return avgs;
}

function mainTwo() {
    const designIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10 design ids
    const avgOfKeys = ['r', 'g', 'b'];
    //fetch all requests and find the average of all shapes’ color property
    //as we do not have any constraint of executing all of them in sequence so
    //it doesn't matter which gets executed first else we could've put them in promise chain
    const promises = designIds.map(id => {
        return fetchDesign(id)
            .then(response => {
                //now, find the average of all color entities from all shapes
                //the order of entities passed here will give results accordingly
                const totalShapes = response.shapes.length;
                const average = findAverage(response.shapes, 'color', avgOfKeys, totalShapes);
                //it can be object too; but the codePair solution needed it to be a string
                //console.log(`Design ${id}:`, {r: average[0], g: average[1], b: average[2]});
                console.log(`Design ${id}: {r: ${average[0]} g: ${average[1]} b: ${average[2]}}`);
            })
            .catch(err => console.log(err));
    });

    return Promise.all(promises)
        .then(results => console.log(`Done`))
        .catch(err => console.log(`occurred an error:`, err));
}

mainTwo(); //calling the main function

//output
/* ---> Design 1: {r: 191.25, g: 191.25, b: 127.5}
---> Design 2: {r: 191.25, g: 191.25, b: 127.5}
---> Design 3: {r: 191.25, g: 191.25, b: 127.5}
---> Design 4: {r: 191.25, g: 191.25, b: 127.5}
---> Design 5: {r: 191.25, g: 191.25, b: 127.5}
---> Design 6: {r: 191.25, g: 191.25, b: 127.5}
---> Design 7: {r: 191.25, g: 191.25, b: 127.5}
---> Design 8: {r: 191.25, g: 191.25, b: 127.5}
---> Design 9: {r: 191.25, g: 191.25, b: 127.5}
---> Design 10: {r: 191.25, g: 191.25, b: 127.5} */
