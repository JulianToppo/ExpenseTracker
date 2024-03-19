const forgotPasswordRequests = require('../model/forgotPasswordRequests')

async function showReports() {
    console.log("inside show reports")
    const date = new Date();
    let month = date.getMonth();

    const userFound = await forgotPasswordRequests.findAll({
        where: {
            [Op.and]: [
                this.app.sequelize.fn('EXTRACT(MONTH from "createdAt") =', 3)
            ]
        }
    })

    console.log(userFound);
}

document.addEventListener("DOMContentLoaded", showReports)