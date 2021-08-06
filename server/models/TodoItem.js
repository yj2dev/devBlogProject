const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  refId: {
    type: String,
    required: true,
    default: "null",
  },
  memo: {
    type: String,
    required: true,
    default: "할 일을 입력해주세요",
  },
  succeed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      default: "제목 없음",
    },
    list: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    // list2: [
    //   {
    //     Type: String,
    //     default: "null",
    //   },
    // ],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Todo = mongoose.model("Todo", TodoSchema);
const List = mongoose.model("List", ListSchema);

module.exports = { Todo, List };