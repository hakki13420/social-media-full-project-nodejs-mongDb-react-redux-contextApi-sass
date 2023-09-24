module.exports.uploadFile = (req, res) => {
  console.log(req.file)
  return res.status(200).json(req.file.filename)
}
