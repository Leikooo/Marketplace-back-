const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    deposit: { type: DataTypes.INTEGER, defaultValue: 0 },
    avatar: { type: DataTypes.STRING, defaultValue: 'default.png' },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    buyer_id: { type: DataTypes.INTEGER, allowNull: false },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'WAIT' },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING }
});

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    position_id: { type: DataTypes.INTEGER, allowNull: false  },
    category_id: { type: DataTypes.INTEGER, allowNull: false  },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, defaultValue: 'default.png' },
});

const Position = sequelize.define('position', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});


const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});


const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const Deposit = sequelize.define('deposit', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'WAIT' },
    payment_method: { type: DataTypes.STRING },
    transaction_id: { type: DataTypes.STRING },
});

const Dialog = sequelize.define('dialog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_member_id: { type: DataTypes.INTEGER, allowNull: false },
    second_member_id: { type: DataTypes.INTEGER, allowNull: false },
});

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dialog_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
});

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Item, { foreignKey: 'item_id' });
Item.hasMany(Comment, { foreignKey: 'item_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

Order.belongsTo(User, { foreignKey: 'buyer_id' });
Order.belongsTo(User, { foreignKey: 'seller_id' });
Order.belongsTo(Item, { foreignKey: 'item_id' });
User.hasMany(Order, { foreignKey: 'buyer_id' });
User.hasMany(Order, { foreignKey: 'seller_id' });
Item.hasMany(Order, { foreignKey: 'item_id' });

Item.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Item, { foreignKey: 'created_by' });

Position.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Position, { foreignKey: 'created_by' });

Position.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Position, { foreignKey: 'category_id' });

Item.belongsTo(Position, { foreignKey: 'position_id' });
Position.hasMany(Item, { foreignKey: 'position_id' });

Category.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Category, { foreignKey: 'created_by' });


Deposit.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Deposit, { foreignKey: 'user_id' });

Dialog.belongsTo(User, { foreignKey: 'first_member_id' });
User.hasMany(Dialog, { foreignKey: 'first_member_id' });

Dialog.belongsTo(User, { foreignKey: 'second_member_id' });
User.hasMany(Dialog, { foreignKey: 'second_member_id' });

Message.belongsTo(Dialog, { foreignKey: 'dialog_id' });
Dialog.hasMany(Message, { foreignKey: 'dialog_id' });

Message.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Message, { foreignKey: 'user_id' });

module.exports = {
    User,
    Order,
    Item,
    Position,
    Category,
    Comment,
    Deposit,
    Dialog,
    Message
}
