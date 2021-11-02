import express from "express";
import multer from 'multer'
import path from 'path'

const router=express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,`uploads`)//נאל כי אין שגיאה וערך השני זה שם התקייה שאליה אנחנו רוצים להעלות את התמונות
    },
    filename(req,file,cb){
        console.log(`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)

        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)//באיזה שם לשמור את הקבצים שמעלים
        //Date.now() מוסיפים לשם של הקובץ את התאריך של ההלאה כדי שלי יהיה מצב של 2 קבצים באותו שם
        //path.extname(file.originalname)זה מחזיר את הסיומת של הקובץ כלומר את סוג הקובץ שהעלו זה מחזיר את הסוג ביחד עם נקודה לכן לא שמתי נקודה בנוסף
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    //filetypes זה ביטוי רגולרי
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)//פונקציה שבודקת שמעלים קובץ של תמונה ולא של משהו אחר
    },
  })



  router.post('/',upload.single('image'),(req,res)=>{
      res.send(`/${req.file.path}`)
  })






export default router