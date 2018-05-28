'use strict';

var LineReader = require('n-readlines');

function readFeatureData(featureDataFilePath) {
    var featureData = [],
        feature,
        featureDataFile;

    featureDataFile = new LineReader(featureDataFilePath);
    while (feature = featureDataFile.next())
        featureData.push(feature.toString().split(',').map(Number));

    return featureData;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeWeights(weights) {
    var i;

    weights[0] = 0.0; // Bias
    for(i=1; i<weights.length; i++) {
        weights[i] = getRandom(-1, 1);
    }
}

function predict(featureData, weights) {
    var predictedResult,
        weightedSum,
        size = featureData.length-1, //last element is target result
        i;

    weightedSum = weights[0]; // Bias
    for(i=0; i<size; i++)
        weightedSum += (featureData[i] * weights[i+1]);

    predictedResult = (weightedSum >= 0) ? 1 : 0;

    return predictedResult;
}

function perceptronLearningAlgorithm(featureDataList, learningRate, epoch) {
    var //featureDataList,
        featureData,
        weights,
        prediction,
        target,
        error,
        sqError,
        trainedWeights = '',
        notYetCorrect,
        i,
        j,
        k;

    //featureDataList = readFeatureData(featureDataFilePath);
    weights = new Array(featureDataList[0].length);
    initializeWeights(weights);

    for(i=0; i<epoch; i++) {
        notYetCorrect = 0;
        for(k=0; k<featureDataList.length; k++) {
            featureData = featureDataList[k];
            prediction = predict(featureData, weights);
            target = parseFloat(featureData[featureData.length-1]);            
            error = target - prediction;
            sqError = Math.pow(error, 2);
            weights[0] += (error * learningRate); // Bias
            for(j=0; j<featureData.length-1; j++)
                weights[j+1] += (error * learningRate * featureData[j]);

            console.log('Target ' + target + ' Prediction ' + prediction);            
            if(target != prediction)
                notYetCorrect++;
        }

        console.log('Not yet correct ' + notYetCorrect);
    }
}


var dataset = [[2.7810836,2.550537003,0],
                [1.465489372,2.362125076,0],
                [3.396561688,4.400293529,0],
                [1.38807019,1.850220317,0],
                [3.06407232,3.005305973,0],
                [7.627531214,2.759262235,1],
                [5.332441248,2.088626775,1],
                [6.922596716,1.77106367,1],
                [8.675418651,-0.242068655,1],
                [7.673756466,3.508563011,1]];
perceptronLearningAlgorithm(dataset, 0.5, 5);