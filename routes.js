const multer = require('multer');
const express = require('express');
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    } 
});

const upload = multer({
    storage: storage
});

module.exports = (app) => {
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.post('/upload', upload.single('image'), (req, res) => {
        req.session.filename = req.file.path;
        req.session.filterCount = 0;
        res.send(req.file.path);
    });

    app.get('/fileName', (req, res) => {
        res.send(req.session.filename)
    });

    app.get('/greyscale', async (req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                console.log(req.session)
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .greyscale(true)
                .withMetadata()
                .toFile(newFilePath);
                
            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    });

    app.get('/blur', async (req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .blur(10)
                .withMetadata()
                .toFile(newFilePath);

            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    });

    app.get('/invert', async(req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .negate({ alpha: false })
                .withMetadata()
                .toFile(newFilePath);

            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    })

    app.get('/red', async(req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .tint({ r: 255, g: 0, b: 0 })
                .withMetadata()
                .toFile(newFilePath);

            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    })

    app.get('/blue', async(req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .tint({ r: 0, g: 0, b: 255 })
                .withMetadata()
                .toFile(newFilePath);

            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    })

    app.get('/green', async(req, res) => {
        try{
            if (!fs.existsSync(req.session.filename)) {
                return res.status(404).send('File not found');
            }

            const fileInfo = path.parse(req.session.filename);
            const newFileName = `edit_${req.session.filterCount}_${fileInfo.base}`;
            const newFilePath = path.join(fileInfo.dir, newFileName);
            req.session.filterCount++;

            await sharp(req.session.filename)
                .tint({ r: 0, g: 255, b: 0 })
                .withMetadata()
                .toFile(newFilePath);

            res.send(newFilePath);
        } catch(error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image');
        }
    })
};