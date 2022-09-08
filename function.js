// const readline = require('readline');
const validator = require('validator');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Jika tidak ada folder data
if (!fs.existsSync("./data")) {
    // maka buat folder tersebut
    fs.mkdirSync("./data");
}
// jika tidak ada file di dalam folder data
if (!fs.existsSync("./data/contacts.json")) {
    // maka buat file 
    fs.writeFileSync('./data/contacts.json', "[]");
}

// Untuk Membaca Data
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');

    // mengambil string JSON dan mengubah menjadi objek js
    const contacts = JSON.parse(file);
    return contacts;
}

// Membuat List kontak
const listContact = () => {
    // membuat varibel dengan mengambil f loadContact
    const contacts = loadContact();
    console.log('Contact List : ');
    // melakukan pengulangan sesuai list
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name} - ${contact.mobile}`);
    });
}

// Membuat detail data sesuai name
const detailContact = (name) => {
    const contacts = loadContact();

    // Buat varibel untuk menemukan data sesaui nama
    const findName = contacts.find((contact) => contact.name === name);

    // Pengkondisian bila nama yang di cari ada
    if (findName) {
        console.log(`Name : ${findName.name}
email : ${findName.email}
mobile : ${findName.mobile} `);
    } else {
        console.log(`Name not Found`);
    }


}
// Menghapus data
const deleteContact = (name) => {
    const contacts = loadContact();

    // Temukan data terlebih dahulu, lalu buat array baru dengan filter
    const findName = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());

    // Pengkodisian bila nama tidak di temukan
    if (findName.length === contacts.length) {
        console.log("This data does not exist")
    } else {
        // Membuat data  baru dengan array di file contacts.json
        fs.writeFileSync('data/contacts.json', JSON.stringify(findName));
        // Output ke terminal sesuai jawaban di pertanyaan
        console.log(`This data has been deleted`);
    }

}

// MengUpdate Data
const upContact = (namePre, newName, newEmail, newMobile) => {
    const contacts = loadContact();
    const arrN = [];

    // Temukan data terlebih dahulu, lalu buat array baru dengan filter
    const findName = contacts.findIndex((contact) => contact.name.toLowerCase() === namePre.toLowerCase());


    if (findName > -1) {
        if (newName) {
            contacts[findName].name = newName;
        }
        if (newEmail) {
            if (!validator.isEmail(newEmail)) {
                arrN.push('Account Email valid!');
            }
            contacts[findName].email = newEmail;
        }
        if (newMobile) {
            if (!validator.isMobilePhone(newMobile, "id-ID")) {
                arrN.push('Account Email valid!');
            }
            contacts[findName].mobile = newMobile;
        }
        if (arrN.length > 0) {
            console.log('Data invalid');
            return false;
        }
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // Output ke terminal sesuai jawaban di pertanyaan
    console.log(`data has been updated`);
}
// Menyimpan Data
const saveData = (name, email, mobile,) => {
    const contact = { name, email, mobile };
    const contacts = loadContact();

    // Bila nama ada yang sama
    const duplicate = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
        console.log('Contact Name is already recorded. Use another name');
        return false;
    }
    // validator
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Account Email invalid!');
            return false;
        }
    }
    if (!validator.isMobilePhone(mobile, "id-ID")) {
        console.log('No Phone invalid!');
        return false;
    }

    contacts.push(contact);
    // Membuat data di file contacts.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // Output ke terminal sesuai jawaban di pertanyaan
    console.log(`${contact.name} data has been saved`);
    // Keluar dari rl
    // rl.close();
}

module.exports = { listContact, saveData, detailContact, deleteContact, upContact };

// ==== Catatan =====
//node app add --name="yYannn" --email="abcgmail.com" --mobile="089656104174" ==> untuk run di terminal
