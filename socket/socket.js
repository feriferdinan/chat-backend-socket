exports.EventIo = (io) => {
    console.log("1,EventIo");

    io.on("connection", function (socket) {

        let token = socket.handshake.query.username;
        console.log(token, 'connected.');
        socket.on("join", (room_id) => {
            socket.join(room_id);
            console.log("joining room", room_id);
        });

        socket.on("send message", (data) => {
            io.to(data.room_id).emit("new message", data);
            socket.on("received", (data) => {
                io.to(data.from).emit("received", data);
            });
        });

        socket.on("typing", (data) => {
            io.to(data.room_id).emmit("typing", data);
        });

        socket.on("changeRoom", (data) => {
            socket.leave(data.room_id);
            console.log("leave room");
        });

        socket.on("disconnect", () => {
            console.log(token, "disconect");
        });
    });

    console.log("2,EventIo");



}