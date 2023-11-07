const fs = require('fs');
const path = require('path');


const directoryPath = path.join(__dirname); 
const filePath = path.join(directoryPath, 'cadastro.txt');
const currentMonth = new Date().getMonth() + 1; 


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    const lines = data.split('\n');
    const birthdaysThisMonth = lines.filter(line => {
        const parts = line.split('|');
        if (parts.length < 3) return false; // Verifica se a linha tem todos os dados necessários

        const dateOfBirth = new Date(parts[2].trim());
        return dateOfBirth.getMonth() + 1 === currentMonth;
    });

    const outputFile = path.join(directoryPath, `aniversariantes_${currentMonth}.txt`);
    fs.writeFile(outputFile, birthdaysThisMonth.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error('Erro ao escrever o arquivo:', err);
            return;
        }
        console.log('Arquivo de aniversariantes gerado com sucesso!');
    });
});
