const Parse = require('parse/node');
const sharp = require('sharp');

const getSights = async (req, res) => {
  const Sights = Parse.Object.extend('Landmark');
  const sightsQuery = new Parse.Query(Sights);
  try {
    sightsQuery.ascending('order');
    const sights = await sightsQuery.find();
    console.log({ sights });
    res.status(200).json(sights);
  } catch (error) {
    console.log('error message: ', error);
    res.status(400).json({ message: 'An error ocurred trying to fetch the sights.' });
  }
};

const updateSight = async (req, res) => {
  const Sights = Parse.Object.extend('Landmark');
  const sightsQuery = new Parse.Query(Sights);

  const updatedSight = req.body;
  const sight = await sightsQuery.get(updatedSight.id);
  try {
    for (const det in updatedSight) {
      if (updatedSight[det] !== undefined) {
        if (det !== 'photo') {
          sight.set(det, updatedSight[det]);
        } else if (det === 'photo' && updatedSight.photo !== null) {
          const file = new Parse.File(
            'mainPhoto-' + updatedSight.id + '.png',
            { base64: updatedSight[det] },
            'image/png' || 'image/jpeg'
          );
          await file.save().then(response => {
            sight.set(det, response);
          }),
            error => {
              console.log('Error on loading image', error);
            };

          const fileData = await file.getData();
          const b64File = fileData.toString('base64');
          const imageBuffer = Buffer.from(b64File, 'base64');
          const newImageBuffer = await sharp(imageBuffer)
            .resize(Number(process.env.PHOTO_WIDTH), Number(process.env.PHOTO_HEIGHT))
            .toBuffer();

          const photoThumbnail = new Parse.File(
            'thumbPhoto-' + updatedSight.id + '.png',
            { base64: newImageBuffer.toString('base64') },
            'image/png' || 'image/jpeg'
          );
          await photoThumbnail.save().then(response => {
            sight.set('photoThumb', response);
          }),
            error => {
              console.log('Error on loading thumbnail image', error);
            };
        }
      }
    }

    sight.save({}, { useMasterKey: true }).then(() => {
      res.status(200).json({ message: 'Successfull update of ' + updatedSight.title });
    }),
      () => {
        res.status(400).json({ message: 'Update of ' + updatedSight.title + ' failed' });
      };
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'An error occured trying to update the sight.' });
  }
};

module.exports = {
  getSights,
  updateSight,
};
