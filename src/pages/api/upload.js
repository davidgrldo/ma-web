// import formidable from "formidable";
// import fs from "fs";
// import axios from "axios";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const handler = async (req, res) => {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             res.status(500).json({ error: "Error parsing the file" });
//             return;
//         }
//         const file = fs.createReadStream(files.file.filepath);

//         try {
//             const response = await axios.post(
//                 "http://localhost:8080/api/forecast/upload",
//                 file,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                     params: {
//                         period: fields.period,
//                     },
//                 }
//             );

//             res.status(200).json(response.data);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     });
// };

// export default handler;
