const express = require("express");
const PORT = 3001;
const app = express();
const usersRoute = require("./routes/usersRoute");

app.use(express.json());
app.use("/api/users/", usersRoute);

app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
