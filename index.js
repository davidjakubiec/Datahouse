fetch("./input.json")
.then(response => {
   return response.json();
})
.then(data => {
    
    //store average of current team's scores in array
    //each element is arithmetic mean of each team member's score of an attribute
    let teamScores = [];

    //iterate over attributes and initialize each score to zero
    for (let i = 0; i < Object.keys(data.team[0].attributes).length; i++) {
        teamScores[i] = 0;
        //add each team member's normalized contriubution to respective attribute
        for (let j = 0; j < data.team.length; j++) {
            teamScores[i] += Object.values(data.team[j].attributes)[i]/data.team.length;
        }
    }

    //initialize array to store applicant names for output
    let applicantNames = [];
    //initialize array to store each applicants final score for output
    let applicantScores = [];
    //initialize variables utilized in loop
    let applicantScore;
    let teamScore;
    //iterate over applicants
    for(let i = 0; i < Object.keys(data.applicants).length; i++) {
        applicantScores[i] = 0;
        applicantNames.push(data.applicants[i].name)
        //iterate over attributes
        //for each applicant, add the contribution of each of their attributes to calculate their final score;
        for (let j = 0; j < Object.keys(data.team[0].attributes).length; j++) {
            applicantScore =  Object.values(data.applicants[i].attributes)[j];
            teamScore = teamScores[j];
            applicantScores[i] += ((1-Math.abs(applicantScore-teamScore)/10)/Object.values(data.team[0].attributes).length);
        }
    }

    //initialize JSON formatted output
    let output = {
        "scoredApplicants": []
    }
    //Applicant final score constructor function
    function FinalScore(name, score) {
        this.name = name;
        this.score = score;
    }
    //Push applicant name and score information into output via constructor function
    for(let i = 0; i < applicantScores.length; i++) {
        output.scoredApplicants.push(new FinalScore(applicantNames[i],applicantScores[i]))
    }
    const table = document.querySelector('#Candidate')
    const tableHead = document.querySelector('#table-head')
    const tableHeadRow = document.querySelector('#table-head-row')
    const tableBody = document.querySelector('#table-body')

    const nameHeader = document.createElement('th')
    nameHeader.innerText = "Name"
    tableHeadRow.appendChild(nameHeader)

    const scoreHeader = document.createElement('th')
    scoreHeader.innerText = "Score"
    tableHeadRow.appendChild(scoreHeader)

    let applicantNameElement;
    let applicantScoreelement;
    let tr
    let tdName
    let tdScore
    for(let i = 0; i < applicantNames.length; i++) {
        tr = document.createElement('tr')
        tableBody.appendChild(tr)
        tdName = document.createElement('td')
        tdName.innerText = applicantNames[i];
        tr.appendChild(tdName)
        tdScore = document.createElement('td');
        tdScore.innerText = applicantScores[i];
        tr.appendChild(tdScore)
    }

    const div = document.querySelector('#jsonString')
    div.innerText = "In JSON format: " + JSON.stringify(output)

    console.log(output)
})
