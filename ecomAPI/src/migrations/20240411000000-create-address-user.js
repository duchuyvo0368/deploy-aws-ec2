'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Kiểm tra xem bảng đã tồn tại chưa
            const tableExists = await queryInterface.sequelize.query(
                `SHOW TABLES LIKE 'AddressUsers'`,
                { type: queryInterface.sequelize.QueryTypes.SELECT },
            );

            if (tableExists.length === 0) {
                await queryInterface.createTable('AddressUsers', {
                    id: {
                        allowNull: true,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                    },
                    userId: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                        references: {
                            model: 'Users',
                            key: 'id',
                        },
                    },
                    shipName: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    shipAddress: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    shipEmail: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    shipPhoneNumber: {
                        type: Sequelize.STRING,
                        allowNull: true,
                    },
                    createdAt: {
                        allowNull: true,
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updatedAt: {
                        allowNull: true,
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                });
            } else {
                // Nếu bảng đã tồn tại, thêm khóa chính và AUTO_INCREMENT
                await queryInterface.sequelize.query(`
                    ALTER TABLE AddressUsers 
                    MODIFY COLUMN id INT  AUTO_INCREMENT,
                    ADD PRIMARY KEY (id),
                    MODIFY COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    MODIFY COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
                `);
            }
        } catch (error) {
            console.log('Migration error:', error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.dropTable('AddressUsers');
        } catch (error) {
            console.log('Rollback error:', error);
        }
    },
};
