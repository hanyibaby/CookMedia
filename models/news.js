var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var config    = require('../config');
var _         = require('lodash');

var NewsSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: ObjectId },
    top: { type: Boolean, default: false }, // 置顶帖
    good: {type: Boolean, default: false}, // 精华帖
    lock: {type: Boolean, default: false}, // 被锁定主题
    reply_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    collect_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    last_reply: { type: ObjectId },
    last_reply_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean },
    newsTab: {type: String},
    deleted: {type: Boolean, default: false},
});

NewsSchema.plugin(BaseModel);
NewsSchema.index({create_at: -1});
NewsSchema.index({top: -1, last_reply_at: -1});
NewsSchema.index({author_id: 1, create_at: -1});

NewsSchema.virtual('newsTabName').get(function () {
    var newsTab  = this.newsTab;
    var pair = _.find(config.newsTabs, function (_pair) {
        return _pair[0] === newsTab;
    });

    if (pair) {
        return pair[1];
    } else {
        return '';
    }
});

mongoose.model('News', NewsSchema);
