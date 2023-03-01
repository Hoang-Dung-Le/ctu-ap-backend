import pool from "../configs/connectDB";


let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('select * from users');
    return res.render('index.ejs', { dataUsers: rows })
}



let getDetailPage = async (req, res) => {
    // console.log("check res params", req.params)
    let id = req.params.userId;
    // console.log("check id: ", id);
    let userId = await pool.execute(`select * from users where id = ?`, [id]);
    return res.send(JSON.stringify(userId[0]))
}

module.exports = {
    getHomePage
}