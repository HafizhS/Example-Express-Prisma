const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const port = process.env.PORT;
const prisma = new PrismaClient();

// untuk parse hasil req.body lewat JSON
app.use(express.json());

// untuk parse hasil req.body lewat x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Express + Prisma Server');
});

app.get("/users", async (req, res) => {
    const allUser = await prisma.user.findMany();
    res.send(allUser);
})

app.post('/users', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({ data: { name, email } })
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  })
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  await prisma.user.delete({ where: { id: Number(id) } })
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
