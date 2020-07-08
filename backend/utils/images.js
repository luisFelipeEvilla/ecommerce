const path = require("path");
const fs = require("fs");

const deleteImage = (url, res) => {
  //  remove server url and only get the folder path
  const imgPath = url.substring(url.lastIndexOf("uploads") - 1);
  //  img location on the server
  const serverImgPath = path.join(__dirname, "..", "public", imgPath);

  fs.unlink(serverImgPath, (error) => {
    //if the image don't existe in the server, ignore that
    if (error) {
      console.log(error);
        if (error.code === "ENOENT") {
            return;
        } else {
            return error;
        }
    }
    return
    });
};

module.exports = {
  deleteImage,
};
