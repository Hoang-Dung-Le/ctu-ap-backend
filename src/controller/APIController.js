import pool from "../configs/connectDB";


let getAllUsers = async (req, res) => {
    const [rows, fiels] = await pool.execute('select * from users');
    return res.status(200).json({
        message: 'ok',
        user_id: rows[0].user_id
    })
}

let getQuestion = async (req, res) => {
    const [rows, fiels] = await pool.execute('SELECT * FROM questions LIMIT 10')
    // console.log(rows)
    return res.status(200).json({
        "result": rows
    })
}

let getImageFromId = async (req, res) => {
    let id = req.body.img_id
    const [rows, fiels] = await pool.execute('SELECT * FROM images WHERE img_id = ?', [id]);

    if (rows.length == 0) {
        return res.status(201).json({
            message: 'Error'
        })
    }
    return res.status(200).json({
        img_id: rows[0].img_id,
        type: rows[0].type,
        url: rows[0].url
    })
}

let uploadProduct = async (req, res) => {
    console.log(req.body)
    let { user_id, price, img_id, fac_id, name, subject, author, detail } = req.body
    pool.execute('insert into products(user_id, price, type, img_id, fac_id, name,subject, author, detail, hidden, product_date) values(?, ?, 1, ?, ?, ?, ?, ?, ?,?, NOW())', [user_id, price, img_id, fac_id, name, subject, author, detail, 0])
    return res.status(200).json({
        messgae: 'ok'
    })
}

let uploadQuestion_1 = async (req, res) => {
    console.log(req.body)
    let { user_id, title, detail, img_id } = req.body
    pool.execute('insert into questions(user_id, title, detail, img_id) values(?,?,?,?)', [user_id, title, detail, img_id])
    return res.status(200).json({
        message: 'ok'
    })
}

let uploadQuestion_2 = async (req, res) => {
    console.log(req.body)
    let { user_id, title, detail } = req.body
    pool.execute('insert into questions(user_id, title, detail) values(?,?,?)', [user_id, title, detail])
    return res.status(200).json({
        message: 'ok'
    })
}


let getRecommendedProducts = async (req, res) => {
    const [rows, fiels] = await pool.execute('SELECT * FROM `products` LIMIT 3');

    if (rows.length == 0) {
        return res.status(201).json({
            message: 'Error'
        })
    }
    return res.status(200).json({
        data: rows
    })
}

let getUser = async (req, res) => {
    let { tendang_nhap, password } = req.body;
    const [rows, fiels] = await pool.execute('select * from users where tendang_nhap=? and password=?', [tendang_nhap, password]);
    if (rows.length == 0) {
        return res.status(201).json({
            message: "error"
        })
    }
    return res.status(200).json({
        user_id: rows[0].user_id,
        email: rows[0].email,
        password: rows[0].password,
        tendang_nhap: rows[0].tendang_nhap,
        fac_id: rows[0].fac_id,
        img_id: rows[0].img_id
    })
}

let createNewUser = async (req, res) => {
    // console.log(req.body)
    let { email, tendang_nhap, password, fac_id, img_id } = req.body
    // console.log(req)
    // let email = req.body.email
    // console.log(email)
    const [rows, fiels] = await pool.execute('select * from users where tendang_nhap=?', [tendang_nhap]);
    if (rows.length != 0) {
        return res.status(201).json({
            msg: "tài khoản đã tồn tại"
        })
    }
    if (!email || !tendang_nhap || !password || !fac_id || !img_id) {
        return res.status(200).json({
            message: 'missing'
        })
    }
    await pool.execute(`INSERT INTO users (email, tendang_nhap, password, fac_id, img_id) VALUES (?,?, ?, ?, ?);`, [email, tendang_nhap, password, fac_id, img_id])
    res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, getUser, getRecommendedProducts,
    getImageFromId, uploadProduct, getQuestion, uploadQuestion_1, uploadQuestion_2
}