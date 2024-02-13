The system is designed to retrieve the values entered in a spreadsheet and return them, as well as to produce the results of students based on the rule established in the challenge.
If the number of absences exceeds 25% of the total number of classes, the student will be in the 'Failed due to Absence' situation, regardless of the average.
If the situation is 'Final Exam,' it is necessary to calculate the 'Final Approval Grade' for each student according to the following formula:"
5 <= (m + naf)/2

Average (m) Situation:
m<5  - "Reprovado por Nota"
5<=m<7  - "Exame Final"
m>=7  - "Aprovado"

Commands used: 
Node.js (npm)
npm install init 
npm install express
npm install nodemon
npm install googleapis
npm install ejs

initialization
nodemon index.js

Steps done on Google Cloud:
1. Created new project
2. Added API
3. Added Key
4. Share spreadsheet with project
