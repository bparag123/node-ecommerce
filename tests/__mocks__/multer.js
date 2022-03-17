//This is a mocking of the multer Module
//Here i require single function of multer module so defined as i required
//This will run as defined below when multer.single() is called
module.exports =
    () => ({
        single: () => {
            return (req, res, next) => {
                req.file = {
                    originalname: 'sample.name',
                    mimetype: 'sample.type',
                    path: 'sample.url',
                    buffer: Buffer.from('whatever'), // this is required since `formData` needs access to the buffer
                }


                return next()
            }
        },
    })