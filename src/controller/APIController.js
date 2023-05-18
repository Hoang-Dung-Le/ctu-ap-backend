import pool from "../configs/connectDB";
const crypto = require('crypto');
const nodemailer = require('nodemailer');


function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

let getAllUsers = async (req, res) => {
    const [rows, fiels] = await pool.execute('select * from users');
    return res.status(200).json({
        message: 'ok',
        user_id: rows[0].user_id
    })
}


let searchProducts = async (req, res) => {
    let { searchName, sort_selection, author, subject, fac_id } = req.body
    // console.log(searchName, sort_selection, author, subject)
    console.log('search name: ' + searchName)
    console.log('subject ' + subject)
    console.log('selection: ' + sort_selection)
    console.log('author ' + author)
    console.log('fac: ' + fac_id)
    if (fac_id !== '0') {
        console.log('chay vao if dau')
        if (sort_selection === '' && subject === '' && author === '') {
            console.log('chay vao sort 1 hehe')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and hidden=0 ORDER BY product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '1' && subject === '' && author === '') {
            console.log('chay vao sort 2')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '2' && subject === '' && author === '') {
            console.log('chay vao sort 3')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + "  and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }
        else if (sort_selection === '3' && subject === '' && author === '') {
            console.log('chay vao sort 4')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and hidden=0 ORDER BY price, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject === '' && author === '') {
            console.log('chay vao sort 5')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject !== '' && author === '') {
            // print('day chay vao')
            console.log('chay vao sort 6')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and subject='" + subject + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '1' && subject !== '' && author === '') {
            console.log('chay vao sort 7')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and subject='" + subject + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject !== '' && author === '') {
            console.log('chay vao sort 8')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and subject='" + subject + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject !== '' && author === '') {
            console.log('chay vao sort 9')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject !== '' && author === '') {
            console.log('chay vao sort 10')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject === '' && author !== '') {
            console.log('chay vao sort 11')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '1' && subject === '' && author !== '') {
            console.log('chay vao sort 12')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject === '' && author !== '') {
            console.log('chay vao sort 13')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject === '' && author !== '') {
            console.log('chay vao sort 14')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject === '' && author !== '') {
            console.log('chay vao sort 15')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject !== '' && author !== '') {
            console.log('chay vao sort 16')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }
        else if (sort_selection === '1' && subject !== '' && author !== '') {
            console.log('chay vao sort 17')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject !== '' && author !== '') {
            console.log('chay vao sort 18')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject !== '' && author !== '') {
            console.log('chay vao sort 19')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and subject='" + subject + "' hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject !== '' && author !== '') {
            console.log('chay vao sort 20')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and fac_id = " + fac_id + " and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else {
            console.log('chay vao sort error')
            return res.status(200).json({
                message: "error"
            })
        }
    }



    else {
        if (sort_selection === '' && subject === '' && author === '') {
            console.log('chay vao sort 1')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and hidden=0 ORDER BY product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '1' && subject === '' && author === '') {
            console.log('chay vao sort 2')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '2' && subject === '' && author === '') {
            console.log('chay vao sort 3')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%')  and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }
        else if (sort_selection === '3' && subject === '' && author === '') {
            console.log('chay vao sort 4')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and hidden=0 ORDER BY price, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject === '' && author === '') {
            console.log('chay vao sort 5')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject !== '' && author === '') {
            // print('day chay vao')
            console.log('chay vao sort 66')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and subject='" + subject + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        } else if (sort_selection === '1' && subject !== '' && author === '') {
            console.log('chay vao sort 7')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and subject='" + subject + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject !== '' && author === '') {
            console.log('chay vao sort 8')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and subject='" + subject + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject !== '' && author === '') {
            console.log('chay vao sort 9')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject !== '' && author === '') {
            console.log('chay vao sort 10')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject === '' && author !== '') {
            console.log('chay vao sort 11')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '1' && subject === '' && author !== '') {
            console.log('chay vao sort 12')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject === '' && author !== '') {
            console.log('chay vao sort 13')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject === '' && author !== '') {
            console.log('chay vao sort 14')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject === '' && author !== '') {
            console.log('chay vao sort 15')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '' && subject !== '' && author !== '') {
            console.log('chay vao sort 16')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY price")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }
        else if (sort_selection === '1' && subject !== '' && author !== '') {
            console.log('chay vao sort 17')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY name, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '2' && subject !== '' && author !== '') {
            console.log('chay vao sort 18')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY name DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '3' && subject !== '' && author !== '') {
            console.log('chay vao sort 19')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and subject='" + subject + "' hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else if (sort_selection === '4' && subject !== '' && author !== '') {
            console.log('chay vao sort 20')
            const [rows, fiels] = await pool.execute("SELECT * FROM `products` WHERE (name LIKE '%" + searchName + "%' or subject LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%') and author='" + author + "' and subject='" + subject + "' and hidden=0 ORDER BY price DESC, product_date DESC")
            const [r1, f1] = await pool.execute('SELECT DISTINCT author from products')
            const [r2, f2] = await pool.execute("SELECT DISTINCT subject from products")
            return res.status(200).json({
                result: rows,
                authors: r1,
                subjects: r2
            })
        }

        else {
            console.log('chay vao sort error')
            return res.status(200).json({
                message: "error"
            })
        }
    }





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
    const [rows, fiels] = await pool.execute('SELECT * FROM questions ORDER BY time')
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
    pool.execute('insert into questions(user_id, title, detail, time) values(?,?,?, NOW())', [user_id, title, detail])
    return res.status(200).json({
        message: 'ok'
    })
}


let getRecommendedProducts = async (req, res) => {
    let { fac_id } = req.body
    // console.log(req.body)
    const [rows, fiels] = await pool.execute('SELECT * FROM `products` WHERE fac_id=? and hidden = 0 ORDER By product_date desc', [fac_id]);

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
    let password_hashed = hashPassword(password)
    console.log(password_hashed)
    const [rows, fiels] = await pool.execute('select * from users where tendang_nhap=? and password=?', [tendang_nhap, password_hashed]);
    if (rows.length == 0) {
        return res.status(201).json({
            message: "error"
        })
    }
    console.log("ok r ne")
    return res.status(200).json({
        user_id: rows[0].user_id,
        email: rows[0].email,
        password: password_hashed,
        tendang_nhap: rows[0].tendang_nhap,
        fac_id: rows[0].fac_id,
        img_id: rows[0].img_id,
        isPrinter: rows[0].isPrinter
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
    let { email, tendang_nhap, password, fac_id } = req.body
    // console.log(req)
    // let email = req.body.email
    // console.log(email)
    // const [rows, fiels] = await pool.execute('select * from users where tendang_nhap=?', [tendang_nhap]);
    password = hashPassword(password)
    // const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    await pool.execute(`INSERT INTO users (email, tendang_nhap, password, fac_id, img_id) VALUES (?,?, ?, ?, 40);`, [email, tendang_nhap, password, fac_id])
    return res.status(200).json({
        "status": "ok"
    })
}

let historyOfChat = async (req, res) => {
    let { senderId, recipientId } = req.body
    const [r1, f1] = await pool.execute("UPDATE message SET isRead=1 WHERE send = ? and receive = ?", [recipientId, senderId])
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

let insertPrinttingShop = async (req, res) => {
    let { email, tendang_nhap, password, img_id, ten_cua_hang, sdt, dia_chi, thoi_gian_mo, thoi_gian_dong, mo_ta } = req.body
    let hasspass = hashPassword(password)
    const [row1, f1] = await pool.execute('insert into users(email, tendang_nhap, password, img_id, isPrinter) values(?, ?, ?, ?, 1)', [email, tendang_nhap, hasspass, img_id])
    const [row2, f2] = await pool.execute('insert into printingshop(ten_cua_hang, sdt, dia_chi, thoi_gian_mo, thoi_gian_dong, mo_ta, user_id) values(?, ?, ?, ?,?,?,?)', [ten_cua_hang, sdt, dia_chi, thoi_gian_mo, thoi_gian_dong, mo_ta, row1.insertId])
    return res.status(200).json({
        "user": row1,
        "cuahang": row2
    })
}

let checkUserName = async (req, res) => {
    let tendang_nhap = req.body.tendang_nhap
    const [row, f] = await pool.execute('select * from users where tendang_nhap=?', [tendang_nhap])
    if (row.length > 0) {
        return res.status(200).json({
            'check': '0'
        })
    } else {
        return res.status(200).json({
            'check': '1'
        })
    }
}

let getInfoShop = async (req, res) => {
    let user_id = req.body.user_id
    console.log("---- user id-----" + user_id)
    const [r, f] = await pool.execute("SELECT ten_cua_hang, dia_chi, email, sdt, thoi_gian_mo,  thoi_gian_dong, mo_ta, url from users, printingShop, images where users.user_id=printingShop.user_id and users.img_id=images.img_id and users.user_id=?", [user_id])
    return res.status(200).json({
        "check": r
    })
}

let getListMessage = async (req, res) => {
    let user_id = req.body.user_id

    let result = []
    let id = []

    const [r, f] = await pool.execute("SELECT DISTINCT tendang_nhap,  receive, send from message, users where users.user_id=message.receive and (send = ? or receive=?) ORDER BY time DESC", [user_id, user_id])
    for (let i = 0; i < r.length; i++) {
        let rec = r[i]['receive']
        let send = r[i]['send']
        if (rec != user_id) {
            const [r1, f1] = await pool.execute('SELECT DISTINCT tendang_nhap, user_id from users where user_id = ?', [rec])
            if (!id.includes(r1[0]['user_id'])) {
                result.push(r1[0])
                id.push(r1[0]['user_id'])
            }

        } else {
            const [r1, f1] = await pool.execute('SELECT DISTINCT tendang_nhap, user_id from users where user_id = ?', [send])
            if (!id.includes(r1[0]['user_id'])) {
                result.push(r1[0])
                id.push(r1[0]['user_id'])
            }

        }

    }
    return res.status(200).json({
        "ds": result,

    })
}

let getListMessageUser = async (req, res) => {
    let user_id = req.body.user_id
    console.log(12312321323)
    let result = []
    let id = []
    let isRead = []
    const [r, f] = await pool.execute("SELECT DISTINCT tendang_nhap,  receive, send from message, users where users.user_id=message.receive and (send = ? or receive=?) and users.isPrinter IS NULL ORDER BY time DESC", [user_id, user_id])
    for (let i = 0; i < r.length; i++) {
        let rec = r[i]['receive']
        let send = r[i]['send']
        if (rec != user_id) {
            const [r1, f1] = await pool.execute('SELECT DISTINCT tendang_nhap, user_id from users where user_id = ? and isPrinter is NULL', [rec])
            if (r1.length > 0) {
                if (!id.includes(r1[0]['user_id'])) {
                    result.push(r1[0])
                    id.push(r1[0]['user_id'])
                    const [r2, f2] = await pool.execute("SELECT * FROM message WHERE ((send = ? and receive=?)) and isRead=0", [rec, user_id])
                    if (r2.length > 0) {
                        isRead.push(0)
                    } else {
                        isRead.push(1)
                    }
                }
            }

        } else {
            const [r1, f1] = await pool.execute('SELECT DISTINCT tendang_nhap, user_id from users where user_id = ? and isPrinter is NULL', [send])
            if (r1.length > 0) {
                if (!id.includes(r1[0]['user_id'])) {
                    result.push(r1[0])
                    id.push(r1[0]['user_id'])
                    const [r2, f2] = await pool.execute("SELECT * FROM message WHERE ((send = ? and receive=?)) and isRead=0", [send, user_id])
                    if (r2.length > 0) {
                        isRead.push(0)
                    } else {
                        isRead.push(1)
                    }
                }
            }


        }

    }
    return res.status(200).json({
        "ds": result,
        "isRead": isRead
    })
}

// let readMes = async (req, res) => {
//     let { user_id, receive } = req.body
//     const [r1, f1] = await pool.execute("UPDATE message set isRead = 1 where (send = ? and receive = ?)", [user_id, receive])
// }

let getListMessageShop = async (req, res) => {
    let id = []
    let isRead = []
    let user_id = req.body.user_id

    let result = []

    const [r, f] = await pool.execute("SELECT DISTINCT receive, send from message, users where users.user_id=message.receive and (send = ? or receive=?) and isPrinter IS NOT NULL ORDER BY time DESC", [user_id, user_id])
    for (let i = 0; i < r.length; i++) {
        let rec = r[i]['receive']
        let send = r[i]['send']
        if (rec != user_id) {
            const [r1, f1] = await pool.execute('SELECT DISTINCT ten_cua_hang, user_id from printingShop  where user_id = ?', [rec])
            if (!id.includes(r1[0]['user_id'])) {
                result.push(r1[0])
                id.push(r1[0]['user_id'])
                const [r2, f2] = await pool.execute("SELECT * FROM message WHERE ((send = ? and receive=?)) and isRead=0", [rec, user_id])
                if (r2.length > 0) {
                    isRead.push(0)
                } else {
                    isRead.push(1)
                }
            }
        } else {
            const [r1, f1] = await pool.execute('SELECT DISTINCT ten_cua_hang, user_id from printingShop  where user_id = ?', [send])
            if (!id.includes(r1[0]['user_id'])) {
                result.push(r1[0])
                id.push(r1[0]['user_id'])
                const [r2, f2] = await pool.execute("SELECT * FROM message WHERE ((send = ? and receive=?)) and isRead=0", [send, user_id])
                if (r2.length > 0) {
                    isRead.push(0)
                } else {
                    isRead.push(1)
                }
            }

        }
    }
    return res.status(200).json({
        "ds": result,
        "isRead": isRead
    })
}


let getListShop = async (req, res) => {
    let user_id = req.body.user_id
    const [r, f] = await pool.execute('select users.user_id, ten_cua_hang from users, printingShop where users.user_id=printingShop.user_id and printingShop.user_id !=?', [user_id])
    return res.status(200).json({
        'data': r
    })
}

let getProductFromAuthor = async (req, res) => {
    let author__name = req.body.author
    const [r, f] = await pool.execute("SELECT * FROM products WHERE author=? ORDER BY product_date DESC", [author__name])
    return res.status(200).json({
        result: r
    }
    )
}

let doiMK = async (req, res) => {
    let { user_id, mk } = req.body
    let mkhash = hashPassword(mk)
    const [r, f] = await pool.execute("UPDATE users set password = ? where users.user_id=?", [mkhash, user_id])
    return res.status(200).json({
        "msg": "ok"
    })
}


let getMaXacNhan = async (req, res) => {
    let email = req.body.email
    let testAccount = await nodemailer.createTestAccount();
    const generateVerificationCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    // Tạo một mã xác nhận mới
    const verificationCode = generateVerificationCode();

    // Tạo một transporter cho dịch vụ email (ví dụ: Gmail)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: "ld7941682@gmail.com",
            pass: "ijippjqyfxuyqgxs",
        },
    });

    const [r1, f1] = await pool.execute("SELECT * FROM users where email = ?", [email])

    if (r1.length == 0) {
        return res.status(200).json({
            check: "0"
        })
    }

    const [r2, f2] = await pool.execute("UPDATE users set maxacnhan=? where email = ?", [verificationCode, email])

    // Cấu hình các thông tin email
    const mailOptions = {
        from: 'ld7941682@gmai.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    // Gửi email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return res.status(200).json({
                check: "0"
            })
        } else {
            return res.status(200).json({
                check: "1",
                code: verificationCode
            })
        }
    });

}

let updateMk = async (req, res) => {
    let { email, mk } = req.body
    let mkHast = hashPassword(mk)
    const [r, f] = await pool.execute("UPDATE users set password = ? where users.email=?", [mkHast, email])
    return res.status(200).json({
        message: "ok"
    })
}

let updateNameProduct = async (req, res) => {
    let { product_id, name } = req.body
    const [r1, f1] = await pool.execute("UPDATE products SET name = ? WHERE product_id = ?", [name, product_id])
    return res.status(200).json({
        message: "ok"
    })
}

let updateDetailProduct = async (req, res) => {
    let { product_id, detail } = req.body
    const [r1, f1] = await pool.execute("UPDATE products SET detail = ? WHERE product_id = ?", [detail, product_id])
    return res.status(200).json({
        message: "ok"
    })
}

let updatePriceProduct = async (req, res) => {
    let { product_id, price } = req.body
    const [r1, f1] = await pool.execute("UPDATE products SET price = ? WHERE product_id = ?", [price, product_id])
    return res.status(200).json({
        message: "ok"
    })
}


let themIuThich = async (req, res) => {
    let { user_id, name, author, subject } = req.body
    // console.log(product_date)

    const [r, f] = await pool.execute("SELECT product_id FROM products where name = ? and subject = ? and author = ?", [name, subject, author])
    const [r1, f1] = await pool.execute("SELECT * FROM favorites WHERE product_id = ? and user_id = ?", [r[0].product_id, user_id])
    if (r1.length === 0) {
        const [r2, f2] = await pool.execute("INSERT INTO favorites(user_id, product_id, fav_date) VALUES(?, ?, NOW())", [user_id, r[0].product_id])
        return res.status(200).json({
            message: "Đã thêm vào mục yêu thích"
        })
    } else {
        const [r2, f2] = await pool.execute("DELETE FROM favorites WHERE user_id=? and product_id=?", [user_id, r[0].product_id])
        return res.status(200).json({
            message: "Đã xoá ra khỏi mục yêu thích"
        })
    }
}

let ktYeuThich = async (req, res) => {
    let { user_id, name, author, subject } = req.body
    // console.log(product_date)

    const [r, f] = await pool.execute("SELECT product_id FROM products where name = ? and subject = ? and author = ?", [name, subject, author])
    // return res.status(200).json({
    //     "mess": r
    // })
    const [r1, f1] = await pool.execute("SELECT * FROM favorites WHERE product_id = ? and user_id = ?", [r[0].product_id, user_id])
    if (r1.length === 0) {
        return res.status(200).json({
            check: "0"
        })
    } else {
        return res.status(200).json({
            check: "1"
        })
    }
}

let layDSYT = async (req, res) => {
    let user_id = req.body.user_id
    const [rows, fields] = await pool.execute('SELECT products.product_id, products.user_id, name, price, subject, detail, img_id, hidden, type, fac_id, product_date, author FROM products,favorites  WHERE products.product_id = favorites.product_id and favorites.user_id = ?', [user_id])
    return res.status(200).json({
        result: rows
    })
}

let searchQuestion = async (req, res) => {
    let searchName = req.body.searchName
    const [rows, fiels] = await pool.execute("SELECT * FROM `questions` WHERE title LIKE '%" + searchName + "%' or detail LIKE '%" + searchName + "%' ORDER BY time DESC")
    return res.status(200).json({
        "result": rows
    })
}

let updateTenCuaHang = async (req, res) => {
    let { user_id, ten_cua_hang } = req.body
    const [r1, f1] = await pool.execute("UPDATE printingshop SET ten_cua_hang = ? WHERE user_id = ?", [ten_cua_hang, user_id])
    return res.status(200).json({
        "message": "ok"
    })
}

let updateDiaChi = async (req, res) => {
    let { user_id, dia_chi } = req.body
    const [r1, f1] = await pool.execute("UPDATE printingshop SET dia_chi = ? WHERE user_id = ?", [dia_chi, user_id])
    return res.status(200).json({
        "message": "ok"
    })
}

let updateSDT = async (req, res) => {
    let { user_id, sdt } = req.body
    const [r1, f1] = await pool.execute("UPDATE printingshop SET sdt = ? WHERE user_id = ?", [sdt, user_id])
    return res.status(200).json({
        "message": "ok"
    })
}

let updateTimeMo = async (req, res) => {
    let { user_id, thoi_gian_mo } = req.body
    const [r1, f1] = await pool.execute("UPDATE printingshop SET thoi_gian_mo = ? WHERE user_id = ?", [thoi_gian_mo, user_id])
    return res.status(200).json({
        "message": "ok"
    })
}

let updateTimeDong = async (req, res) => {
    let { user_id, thoi_gian_dong } = req.body
    const [r1, f1] = await pool.execute("UPDATE printingshop SET thoi_gian_dong = ? WHERE user_id = ?", [thoi_gian_dong, user_id])
    return res.status(200).json({
        "message": "ok"
    })
}

module.exports = {
    getAllUsers, createNewUser, getUser, getRecommendedProducts,
    getImageFromId, uploadProduct, getQuestion, uploadQuestion_1, uploadQuestion_2,
    getQuestionFromId, sendMessage, searchProducts, getInfoUser, getMyProducts, hiddenProduct, unHiddenProduct,
    historyOfChat, comment, getCmt, insertPrinttingShop, checkUserName, getInfoShop, getListMessage,
    getListShop, getListMessageUser, getListMessageShop, doiMK, getProductFromAuthor, getMaXacNhan, updateMk,
    updateNameProduct, updateDetailProduct, updatePriceProduct, themIuThich, ktYeuThich, layDSYT, searchQuestion,
    updateTenCuaHang, updateDiaChi, updateSDT, updateTimeMo, updateTimeDong
}