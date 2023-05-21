import LevelsSchema from '../../models/Levels.js';
import UserSchema from '../../models/User.js';
import UserModel from "../../models/User.js"

export const getLastTags = async (req, res) => {
  try {
    const posts = await LevelsSchema.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};



export const getAllLevels = async (req, res) => {
  try {
    const posts = await LevelsSchema.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка',
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const posts = await UserSchema.find().exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ошибка',
    });
  }
};

export const getOneLevel = async (req, res) => {

  try {
    const levelId = req.params.id;
    // const doc = await LevelsSchema.findById(postId)
    // res.json(doc);
    LevelsSchema.findOneAndUpdate(
      {
        _id: levelId
      },
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnOriginal: false
      },
      (err, doc) => {
        console.log("[ERROR]", err)
        if (err) {
          return res.status(500).json({
            message: "Ошибка не удалось!"
          })
        }
        if (!doc) {
          return res.status(404).json({
            message: "Нет такого уровня"
          })
        }
        res.json(doc)
      }


    )


    // LevelsSchema.findOneAndUpdate(
    //   {
    //     _id: postId,
    //   },
    //   {
    //     returnDocument: 'after',
    //   },
    //   (err, doc) => {
    //     console.log("[ERROR]", err)
    //     console.log("[DOC]", doc)
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).json({
    //         message: 'Не удалось вернуть статью',
    //       });
    //     }

    //     if (!doc) {
    //       return res.status(404).json({
    //         message: 'Статья не найдена',
    //       });
    //     }

    //     res.json(doc);
    //   }
    // )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить данные',
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const level = req.params.id;

    LevelsSchema.findOneAndUpdate(
      {
        _id: level,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Не найдена',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    LevelsSchema.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить',
    });
  }
};

export const changeLevel = async (req, res) => {
  const userId = req.body.id
  console.log(userId, "userId")
  try {
    const user = await UserModel.findOne({ _id: req.body.id });
    user.level = req.body.level
    user.passed_first_exam = true
    const userchech = await user.save();
    // await UserModel.updateOne(
    //   {
    //     _id: userId,
    //   },
    //   {
    //     ...user,
    //     level: req.body.level,
    //     passed_first_exam: true
    //   },
    // );
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось найти пользователя',
    });
  }
};


export const createLevel = async (req, res) => {
  console.log(req.body)
  try {
    const doc = new LevelsSchema({
      currentLevel: req.body.currentLevel,
      title: req.body.title,
      text: req.body.text,
      videoLink: req.body.videoLink,
      // imageUrl: req?.body?.imageUrl || "",

      parts: req.body.parts,
      user: req.userId,
    });

    const post = await doc.save();
    console.log("[wwwwww]", post)
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await LevelsSchema.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      },
    );

    res.json({
      success: true,
      data: doc
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить',
    });
  }
};


export const getLevelDetail = async (req, res) => {
  try {
    const postId = req.params.id;
    await LevelsSchema.findOneAndUpdate(
      {
        _id: postId,
      }
    );
    res.json({
      success: true,
      data: doc
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить',
    });
  }
};


export const getOneLevel_v2 = async (req, res) => {

  const postId = req.params.id;

  LevelsSchema.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewsCount: 1 } },
    { upsert: true, useFindAndModify: false },
  )
    .then(ress => {
      res.json(ress);
    })
    .catch(err => res.json({ message: "Не удалось получить данные" }));
};



export const createTestForLevel = async (req, res) => {

  console.log(req.body.examTest)

  const postId = req.params.id;

  LevelsSchema.findOneAndUpdate(
    { _id: postId },
    { examTest: req.body.examTest },
    { upsert: true, useFindAndModify: false },
  )
    .then(ress => {
      res.json(ress);
    })
    .catch(err => res.json({ message: "Не удалось добавить данные", err: err }));
};
