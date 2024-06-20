const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your Sequelize instance is configured

const Schedule = sequelize.define('Schedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    collection_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending' // Example default value
    },
    enable_notification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true // Enable notifications by default
    }
}, {
    tableName: 'schedules',
    timestamps: false // Disable timestamps if not needed
});

module.exports = Schedule;
