async function onSelectCountry() {

    const flatData = (originalData, originalSchema) => {
        console.log('originalSchema', originalSchema)
        const properties = Object.keys(originalSchema)

        const extractedData = originalData.map(item => {
            const { [properties[0]]: cases, [properties[1]]: date } = item
            return [Date.parse(date), parseInt(cases)]
        })
        return extractedData
    }

    const locationSelect = document.getElementById('location-select').value
    console.log('locationSelect', locationSelect)
    var dates = []

    const countries = await fetch('api.json')
        .then(response => response.json())
        .then(data => data['covid-stats']);

    const countryConfigure = countries.filter(countrie => countrie.name === locationSelect)[0]

    const request = await fetch(countryConfigure['get-history-api']).then(data => data.json())
    console.log('countryConfigure', countryConfigure['get-history-schema'])

    Promise.resolve(request).then(data => {
        const flattenData = flatData(data, countryConfigure['get-history-schema'])
        // console.log('flattenData', flattenData)
        // dates = [...normalizedData(flattenData)]
        console.log('flattenData', flattenData)
        // dates = flattenData

        dates = [[1585545300000, 942],
        [1585588500000, 1117],
        [1585668900000, 1238],
        [1585724700000, 1466],
        [1585762800000, 1649],
        [1585802700000, 1764],
        [1585837500000, 1860],
        [1585890000000, 2088],
        [1585924560000, 2322],
        [1585974900000, 2650],
        [1586007900000, 2784],
        [1586057700000, 3030],
        [1586093700000, 3219],
        [1586145000000, 3666],
        [1586179200000, 3851],
        [1586229600000, 3981],
        [1586266800000, 4312],
        [1586319600000, 4643],
        [1586346900000, 4714],
        [1586400300000, 5095]]
    })

    var options = {
        series: [{
            name: 'Cases:',
            data: dates
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Daily change',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Cases'
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    };

    return options
}




var chart = new ApexCharts(document.querySelector("#chart"), onSelectCountry());
chart.render();

