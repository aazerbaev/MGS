const jwt = require('jsonwebtoken');
const User = require('./models/User');

function setupSocket(server) {
    const io = require('socket.io')(server, {
        cors: { origin: 'http://localhost:3000', credentials: true}
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!User) return next(new Error('User not found'));

            socket.user = user;
            next();
        } catch {
            next(new Error('Authentication error'))
        }
    })

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.username} connected`);

        const interval = setInterval(async () => {
            try {
                const updatedUser = await User.findById(socket.user._id);
                socket.emit('heartbeat', { status: 'alive', user: updatedUser });
            }catch{
                socket.emit('heartbeat', { status: 'error' });
            }
        }, 10000);

        socket.on('disconnect', () => {
            console.log(`User ${socket.user.username} disconnected`);
            clearInterval(interval);
        })
    })
}

module.exports = { setupSocket };