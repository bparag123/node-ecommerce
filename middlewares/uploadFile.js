const config = require("../config")
const { google } = require("googleapis")
const { Readable } = require('stream')

const CLIENT_SECRET = config.CLIENT_SECRET
const CLIENT_ID = config.CLIENT_ID
const REDIRECT_URI = config.REDIRECT_URI
const REFRESH_TOKEN = config.REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
})

const upload = async (req, res, next) => {
    
    if (!req.file) {
        return res.json({
            message: "Please Provide file"
        })
    }

    //Generating the name of the file with date

    const randomString = new Date().getTime()
    const [name, extension] = req.file.originalname.split(".")
    const filename = `${name}-${randomString}.${extension}`

    //creating readable stream from file buffer
    const stream = Readable.from(req.file.buffer);

    //Uploading the file into the drive 

    const result = await drive.files.create({
        requestBody: {
            name: filename,
            mimeType: "image/png"
        },
        media: {
            mimeType: "image/png",
            body: stream
        }
    })
    //the id of uploaded file
    fileId = result.data.id
    
    //Create Permission to get the file url
    drive.permissions.create({
        fileId: fileId,
        requestBody:{
            role:"reader",
            type:"anyone"
        }
    })

    //This is setup for webview of the file
    // //Getting url for the file
    // const fileUrl = await drive.files.get({
    //     fileId: fileId,
    //     fields: "webViewLink, webContentLink"
    // })

    //appending the url for the file to store in the database
    
    req.fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
    next()

}
module.exports = upload