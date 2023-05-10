import pool from "../configs/connectDB";


let getAllUsers = async (req, res) => {
    const [rows, fiels] = await pool.execute('select * from users');
    return res.status(200).json({
        message: 'ok',
        user_id: rows[0].user_id
    })
}


let searchProducts = async (req, res) => {
    let searchName = req.body.searchName
    console.log(searchName)
    const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and hidden=0")
    console.log(rows)
    return res.status(200).json({
        result: rows
    })
}

let sendMessage = async (req, res) => {
    let { send_id, receive_id, detail } = req.body
    console.log(req.body)
    pool.execute('insert into message(send, receive, detail, time) values (?, ?, ?, NOW())', [send_id, receive_id, detail])
    return res.status(200).json({
        message: "ok"
    })
}

let getQuestionFromId = async (req, res) => {
    let qes_id = req.body.qes_id
    const [rows, fiels] = await pool.execute('SELECT * FROM questions WHERE qes_id=?', [qes_id])
    console.log(rows)
    return res.status(200).json({
        qes_id: rows[0].qes_id,
        user_id: rows[0].user_id,
        title: rows[0].title,
        detail: rows[0].detail,
        img_id: rows[0].img_id
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
    console.log(id)
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

let hiddenProduct = async (req, res) => {
    let product_id = req.body.product_id
    const [rows, fields] = await pool.execute("UPDATE products SET hidden = 1 WHERE product_id=?", [product_id])
    return res.status(200).json({
        "message": "ok"
    })

}

let unHiddenProduct = async (req, res) => {
    let product_id = req.body.product_id
    const [rows, fields] = await pool.execute("UPDATE products SET hidden = 0 WHERE product_id=?", [product_id])
    return res.status(200).json({
        "message": "ok"
    })

}

let comment = async (req, res) => {
    let { user_id, qes_id, cmt } = req.body
    const [rows, fields] = await pool.execute("INSERT INTO answers(user_id, qes_id, cmt, ans_date) VALUES(?, ?, ?, NOW())", [user_id, qes_id, cmt])
    const [row, field] = await pool.execute("SELECT answers.user_id,tendang_nhap, cmt, qes_id from answers, users where users.user_id=answers.user_id and ans_id = ?", [rows.insertId])
    return res.status(200).json({
        "message": row
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
    let { fac_id } = req.body
    // console.log(req.body)
    const [rows, fiels] = await pool.execute('SELECT * FROM `products` WHERE fac_id=? and hidden = 0', [fac_id]);

    if (rows.length == 0) {
        return res.status(201).json({
            message: 'Error'
        })
    }
    return res.status(200).json({
        data: rows
    })
}

let getInfoUser = async (req, res) => {
    let user_id = req.body.user_id
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [user_id])
    return res.status(200).json({
        email: rows[0].email,
        fac_id: rows[0].fac_id,
        tendang_nhap: rows[0].tendang_nhap
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
    console.log("ok r ne")
    return res.status(200).json({
        user_id: rows[0].user_id,
        email: rows[0].email,
        password: rows[0].password,
        tendang_nhap: rows[0].tendang_nhap,
        fac_id: rows[0].fac_id,
        img_id: rows[0].img_id
    })
}

let getMyProducts = async (req, res) => {
    let user_id = req.body.user_id
    const [rows, fields] = await pool.execute('SELECT product_id, name, price, subject, detail, img_id, hidden FROM products WHERE user_id = ?', [user_id])
    return res.status(200).json({
        data: rows
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

let historyOfChat = async (req, res) => {
    let { senderId, recipientId } = req.body
    const [rows, fields] = await pool.execute('SELECT * FROM message WHERE (send = ? and receive = ?) or (send = ? and receive = ?) ORDER BY time', [senderId, recipientId, recipientId, senderId])
    return res.status(200).json({
        'data': rows
    })
}

let getCmt = async (req, res) => {
    let qes_id = req.body.qes_id
    const [rows, field] = await pool.execute(
        'SELECT answers.user_id, tendang_nhap, qes_id, cmt from answers, users where answers.user_id=users.user_id and qes_id = ?', [qes_id]
    )
    return res.status(200).json({
        "data": rows
    })
}

module.exports = {
    getAllUsers, createNewUser, getUser, getRecommendedProducts,
    getImageFromId, uploadProduct, getQuestion, uploadQuestion_1, uploadQuestion_2,
    getQuestionFromId, sendMessage, searchProducts, getInfoUser, getMyProducts, hiddenProduct, unHiddenProduct,
    historyOfChat, comment, getCmt
}