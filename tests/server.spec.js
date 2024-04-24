const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obtener status code 200 en ruta Get, recibir Array con almenos 1 objeto", async () =>{
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    const body = response.body;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  })

  it("Obtener status code 404 cuando se intenta eliminar un café con un id que no existe", async () =>{
    const id = 20;
    const jwt = "token"
    const response = await request(server).delete(`/cafes/${id}`).set("Authorization", jwt).send();
    const status = response.statusCode;
    expect(status).toBe(404);
  })

  it("Agregar un café y verificar que si se agrego, recibir un status code 201", async () =>{
    const id = Math.floor(Math.random() * 999);
    const objeto = {id, nombre: "Expreso"};
    const response = await request(server).post("/cafes").send(objeto);
    expect(response.body).toContainEqual(objeto);
    expect(response.statusCode).toBe(201);
  })

  it("Verificar si ruta PUT/Cafes devuelve status code 400 cuando el parametro id que se envia es diferente al id dentro del payload", async () =>{
    const idParams = 1;
    const id = 2;
    const objeto = {id, nombre: "Cortado"};
    const response = await request(server).put(`/cafes/${idParams}`).send(objeto);
    const status = response.statusCode;
    expect(status).toBe(400);
  })
});

