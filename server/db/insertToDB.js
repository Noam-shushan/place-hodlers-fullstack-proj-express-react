import pool from './dbPool.js'
import usersdata from './res/users-data.json' assert { type: "json" }

//await insertUsers()
//await insertTodos()
//await insertAlbums()
//await insertPhotos()
//await insertPosts()
//await insertComments()
//await insertCompany()
//await insertAddress()

async function insertUsers() {
    const createUser = async (user) => {
        const { firstName, lastName, username, email, phone, password } = user
        const [result] = await pool.query(`
        INSERT INTO users (firstName, lastName, username, email, phone, password)
        VALUES (?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, username, email, phone, password])
        return result.insertId
    }
    const users = usersdata.splice(0, 500)
    for (const user of usersdata) {
        await createUser(user)
    }
    console.log('users inserted')
}

async function insertTodos() {
    const createTodo = async (todo) => {
        const { userId, title, completed } = todo
        const [result] = await pool.query(`
        INSERT INTO todos (userId, title, completed)
        VALUES (?, ?, ?)`,
            [userId, title, completed])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(async (todos) => {
            for (const todo of todos) {
                await createTodo(todo)
            }
        })
    console.log('todos inserted')
}

async function insertAlbums() {
    const createAlbom = async (albom) => {
        const { userId, title } = albom
        const [result] = await pool.query(`
        INSERT INTO albums (userId, title)
        VALUES (?, ?)`,
            [userId, title])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(async (alboms) => {
            for (const albom of alboms) {
                await createAlbom(albom)
            }
        })
    console.log('alboms inserted')
}

async function insertPhotos() {
    const createPhoto = async (photo) => {
        const { albumId, title, url, thumbnailUrl } = photo
        const [result] = await pool.query(`
        INSERT INTO photos (albumId, title, uri, thumbnailUrl)
        VALUES (?, ?, ?, ?)`,
            [albumId, title, url, thumbnailUrl])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(async (photos) => {
            for (const photo of photos) {
                await createPhoto(photo)
            }
        })
    console.log('photos inserted')
}

async function insertPosts() {
    const createPost = async (post) => {
        const { userId, title, body } = post
        const [result] = await pool.query(`
        INSERT INTO posts (userId, title, body)
        VALUES (?, ?, ?)`,
            [userId, title, body])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(async (posts) => {
            for (const post of posts) {
                await createPost(post)
            }
        })
    console.log('posts inserted')
}

async function insertComments() {
    const createComment = async (comment) => {
        const { postId, name, email, body } = comment
        const [result] = await pool.query(`
        INSERT INTO comments (postId, username, email, body)
        VALUES (?, ?, ?, ?)`,
            [postId, name, email, body])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(async (comments) => {
            for (const comment of comments) {
                await createComment(comment)
            }
        })
    console.log('comments inserted')
}

async function insertCompany() {
    const createCompany = async (company) => {
        const { userId, name, catchPhrase, bs } = company
        const [result] = await pool.query(`
        INSERT INTO company (userId ,companyName, catchPhrase, bs)
        VALUES (?, ?, ?, ?)`,
            [userId, name, catchPhrase, bs])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(async (users) => {
            for (const user of users) {
                if (!user.company) continue
                if (user.id > 500) continue
                await createCompany({ userId: user.id, ...user.company })
            }
        })
    console.log('company inserted')
}

async function insertAddress() {
    const createAddress = async (address) => {
        const { userId, street, suite, city, zipcode, geo } = address
        const [result] = await pool.query(`
        INSERT INTO address (userId, street, suite, city, zipcode, lat, lng)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, street, suite, city, zipcode, geo.lat, geo.lng])
        return result.insertId
    }

    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(async (users) => {
            for (const user of users) {
                if (!user.address) continue
                if (user.id > 500) continue
                await createAddress({ userId: user.id, ...user.address })
            }
        })
    console.log('address inserted')
}










